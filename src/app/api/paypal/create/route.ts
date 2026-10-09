import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { getUser } from "@/lib/auth";
import { createOrder, paypalConfigured, PACKS, type PackKey } from "@/lib/paypal";

export async function POST(req: Request) {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "Please sign in to purchase credits." }, { status: 401 });
  const { pack } = await req.json().catch(() => ({}));
  if (!(pack in PACKS)) return NextResponse.json({ error: "Unknown package." }, { status: 400 });
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "Payments are not configured yet (missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)." }, { status: 503 });
  }
  const p = PACKS[pack as PackKey];
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  try {
    const order = await createOrder(pack as PackKey, u.id, origin);
    await db.insert(payments).values({
      userId: u.id, provider: "paypal", paypalOrderId: order.id,
      pack, amountCents: p.amountCents, credits: p.credits,
    }).onConflictDoNothing();
    return NextResponse.json({ url: order.approveUrl, orderId: order.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not start PayPal checkout. Please try again." }, { status: 500 });
  }
}
