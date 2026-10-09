import { NextResponse } from "next/server";
import { captureAndFulfil } from "@/lib/paypal";

export async function POST(req: Request) {
  const { orderId } = await req.json().catch(() => ({}));
  if (!orderId) return NextResponse.json({ status: "failed" }, { status: 400 });
  try {
    return NextResponse.json(await captureAndFulfil(String(orderId)));
  } catch {
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
}
