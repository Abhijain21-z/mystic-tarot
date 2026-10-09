import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const [u] = await db.select().from(users).where(eq(users.email, String(email).toLowerCase().trim()));
  if (!u || !(await bcrypt.compare(password, u.passwordHash))) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  await createSession(u.id);
  return NextResponse.json({ ok: true });
}
