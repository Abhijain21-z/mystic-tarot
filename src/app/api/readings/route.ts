import { NextResponse } from "next/server";
import { db } from "@/db";
import { readings } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function GET() {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const rows = await db.select().from(readings).where(eq(readings.userId, u.id)).orderBy(desc(readings.createdAt)).limit(100);
  return NextResponse.json({ readings: rows });
}
export async function DELETE(req: Request) {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const id = Number(new URL(req.url).searchParams.get("id"));
  await db.delete(readings).where(and(eq(readings.id, id), eq(readings.userId, u.id)));
  return NextResponse.json({ ok: true });
}
