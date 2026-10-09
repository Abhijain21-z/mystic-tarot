import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "@/db";
import { guests, readings, users } from "@/db/schema";
import { and, eq, gt, lt, sql } from "drizzle-orm";
import { getUser, GUEST_COOKIE, FREE_READINGS } from "@/lib/auth";
import { drawReading } from "@/lib/interpret";

export async function POST() {
  try {
    const u = await getUser();
    const cards = drawReading();
    if (u) {
      let paidWith: "free" | "credit" | null = null;
      const free = await db.update(users).set({ freeReadingsUsed: sql`${users.freeReadingsUsed} + 1` })
        .where(and(eq(users.id, u.id), lt(users.freeReadingsUsed, FREE_READINGS))).returning({ id: users.id });
      if (free.length) paidWith = "free";
      else {
        const cr = await db.update(users).set({ credits: sql`${users.credits} - 1` })
          .where(and(eq(users.id, u.id), gt(users.credits, 0))).returning({ id: users.id });
        if (cr.length) paidWith = "credit";
      }
      if (!paidWith) return NextResponse.json({ error: "payment_required", message: "You've used your free readings. Add credits to continue." }, { status: 402 });
      const [r] = await db.insert(readings).values({ userId: u.id, paidWith, cards }).returning({ id: readings.id, createdAt: readings.createdAt });
      return NextResponse.json({ id: r.id, createdAt: r.createdAt, cards, paidWith, saved: true });
    }
    const jar = await cookies();
    let gid = jar.get(GUEST_COOKIE)?.value;
    if (!gid) {
      gid = randomBytes(24).toString("hex");
      jar.set(GUEST_COOKIE, gid, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365 });
    }
    await db.insert(guests).values({ id: gid }).onConflictDoNothing();
    const ok = await db.update(guests).set({ readingsUsed: sql`${guests.readingsUsed} + 1` })
      .where(and(eq(guests.id, gid), lt(guests.readingsUsed, FREE_READINGS))).returning({ id: guests.id });
    if (!ok.length) return NextResponse.json({ error: "login_required", message: "Create a free profile to continue and purchase credits." }, { status: 401 });
    const [r] = await db.insert(readings).values({ guestId: gid, paidWith: "free", cards }).returning({ id: readings.id, createdAt: readings.createdAt });
    return NextResponse.json({ id: r.id, createdAt: r.createdAt, cards, paidWith: "free", saved: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server", message: "The cards could not be drawn. Please try again." }, { status: 500 });
  }
}
