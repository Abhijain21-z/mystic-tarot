import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";

export const SESSION_COOKIE = "tarot_session";
export const GUEST_COOKIE = "tarot_guest";
export const FREE_READINGS = 2;

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await db.insert(sessions).values({ token, userId, expiresAt });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires: expiresAt });
}

export async function destroySession() {
  const jar = await cookies();
  const t = jar.get(SESSION_COOKIE)?.value;
  if (t) await db.delete(sessions).where(eq(sessions.token, t));
  jar.delete(SESSION_COOKIE);
}

export async function getUser() {
  const jar = await cookies();
  const t = jar.get(SESSION_COOKIE)?.value;
  if (!t) return null;
  const rows = await db
    .select({ id: users.id, name: users.name, email: users.email, freeReadingsUsed: users.freeReadingsUsed, credits: users.credits, createdAt: users.createdAt })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.token, t), gt(sessions.expiresAt, new Date())))
    .limit(1);
  return rows[0] ?? null;
}

export type SessionUser = NonNullable<Awaited<ReturnType<typeof getUser>>>;

export function publicUser(u: SessionUser | null) {
  if (!u) return null;
  return { id: u.id, name: u.name, email: u.email, credits: u.credits, freeRemaining: Math.max(0, FREE_READINGS - u.freeReadingsUsed) };
}
