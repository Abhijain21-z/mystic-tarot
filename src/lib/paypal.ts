import { db } from "@/db";
import { payments, users } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const PACKS = {
  single: { label: "1 Reading Credit", credits: 1, amountCents: 100 },
  pack500: { label: "100 Reading Credits", credits: 100, amountCents: 5000 },
} as const;
export type PackKey = keyof typeof PACKS;

function baseUrl() {
  return process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function paypalConfigured() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

/** OAuth2 client-credentials access token (cached in memory until expiry). */
let cached: { token: string; exp: number } | null = null;
export async function getAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.exp) return cached.token;
  const id = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const r = await fetch(`${baseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!r.ok) throw new Error(`PayPal auth failed (${r.status})`);
  const d = await r.json();
  cached = { token: d.access_token as string, exp: Date.now() + (d.expires_in as number) * 1000 - 60_000 };
  return cached.token;
}

export interface CreatedOrder {
  id: string;
  approveUrl: string;
}

/** Create a PayPal order and return the buyer approval URL. */
export async function createOrder(pack: PackKey, userId: number, origin: string): Promise<CreatedOrder> {
  const p = PACKS[pack];
  const token = await getAccessToken();
  const r = await fetch(`${baseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        custom_id: String(userId),
        description: `MysticTarot — ${p.label}`,
        amount: { currency_code: "USD", value: (p.amountCents / 100).toFixed(2) },
      }],
      application_context: {
        brand_name: "MysticTarot",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${origin}/payment/success?provider=paypal`,
        cancel_url: `${origin}/payment/cancelled`,
      },
    }),
  });
  if (!r.ok) throw new Error(`PayPal order failed (${r.status})`);
  const d = await r.json();
  const approveUrl = (d.links as { rel: string; href: string }[] | undefined)?.find((l) => l.rel === "approve")?.href;
  if (!d.id || !approveUrl) throw new Error("PayPal did not return an approval URL.");
  return { id: d.id as string, approveUrl };
}

/**
 * Capture a PayPal order and fulfil credits idempotently.
 * Safe to call multiple times (e.g. double return visits).
 */
export async function captureAndFulfil(orderId: string) {
  const row = await db.select().from(payments).where(eq(payments.paypalOrderId, orderId)).then((r) => r[0]);
  if (!row) return { ok: false, status: "failed" as const };
  if (row.status === "paid") return { ok: true, status: "paid" as const };

  const token = await getAccessToken();
  const r = await fetch(`${baseUrl()}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!r.ok) {
    const already = r.status === 422;
    if (!already) return { ok: false, status: "pending" as const };
  }
  // Re-fetch order to confirm capture state + amount (covers 422 already-captured case too).
  const o = await fetch(`${baseUrl()}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!o.ok) return { ok: false, status: "pending" as const };
  const d = await o.json();
  if (d.status !== "COMPLETED") return { ok: false, status: "pending" as const };
  const capturedCents = Math.round(
    Number(d.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? "0") * 100
  );
  if (capturedCents !== row.amountCents) return { ok: false, status: "failed" as const };

  const updated = await db
    .update(payments)
    .set({ status: "paid" })
    .where(and(eq(payments.paypalOrderId, orderId), eq(payments.status, "pending")))
    .returning();
  if (updated[0]) {
    await db.update(users).set({ credits: sql`${users.credits} + ${updated[0].credits}` }).where(eq(users.id, updated[0].userId));
  }
  return { ok: true, status: "paid" as const };
}
