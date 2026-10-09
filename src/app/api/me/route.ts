import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { guests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUser, publicUser, GUEST_COOKIE, FREE_READINGS } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function GET() {
  const u = await getUser();
  if (u) return NextResponse.json({ user: publicUser(u) });
  const gid = (await cookies()).get(GUEST_COOKIE)?.value;
  let used = 0;
  if (gid) used = (await db.select().from(guests).where(eq(guests.id, gid)))[0]?.readingsUsed ?? 0;
  return NextResponse.json({ user: null, guestFreeRemaining: Math.max(0, FREE_READINGS - used) });
}
