import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { guests, readings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, GUEST_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json().catch(() => ({}));
  if (!name || typeof name !== "string" || name.length > 80) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!password || password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  const e = email.toLowerCase().trim();
  const exists = await db.select({ id: users.id }).from(users).where(eq(users.email, e));
  if (exists.length) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const jar = await cookies();
  const gid = jar.get(GUEST_COOKIE)?.value;
  let used = 0;
  if (gid) {
    const g = await db.select().from(guests).where(eq(guests.id, gid));
    used = Math.min(2, g[0]?.readingsUsed ?? 0);
  }
  const [u] = await db.insert(users).values({ name: name.trim(), email: e, passwordHash: await bcrypt.hash(password, 10), freeReadingsUsed: used }).returning();
  if (gid) {
    await db.update(readings).set({ userId: u.id }).where(eq(readings.guestId, gid));
    jar.delete(GUEST_COOKIE);
  }
  await createSession(u.id);
  return NextResponse.json({ ok: true });
}
