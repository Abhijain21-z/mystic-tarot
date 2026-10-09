import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUser, destroySession } from "@/lib/auth";

export async function DELETE() {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  await destroySession();
  await db.delete(users).where(eq(users.id, u.id));
  return NextResponse.json({ ok: true });
}
