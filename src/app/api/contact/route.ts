import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message || String(message).length > 5000) return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  await db.insert(contactMessages).values({ name: String(name).slice(0, 100), email: String(email).slice(0, 200), message: String(message) });
  return NextResponse.json({ ok: true });
}
