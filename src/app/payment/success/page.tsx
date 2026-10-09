"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useApp } from "@/components/Providers";

function Inner() {
  const sp = useSearchParams();
  const { refresh } = useApp();
  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "failed">("loading");
  const once = useRef(false);
  useEffect(() => {
    if (once.current) return; once.current = true;
    const finish = async () => {
      // PayPal returns ?token=ORDERID (and PayerID) on approval.
      const orderId = sp.get("token");
      // Legacy Stripe return (kept for old links).
      const sessionId = sp.get("session_id");
      try {
        if (orderId) {
          const r = await fetch("/api/paypal/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId }) });
          const d = await r.json();
          setStatus(d.status === "paid" ? "paid" : d.status === "pending" ? "pending" : "failed");
        } else if (sessionId) {
          const r = await fetch("/api/checkout/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: sessionId }) });
          const d = await r.json();
          setStatus(d.status === "paid" ? "paid" : d.status === "pending" ? "pending" : "failed");
        } else {
          setStatus("failed"); return;
        }
        refresh();
      } catch { setStatus("failed"); }
    };
    finish();
  }, [sp, refresh]);
  return (
    <div className="glass rounded-3xl p-10">
      {status === "loading" && <><Loader2 className="mx-auto h-14 w-14 animate-spin text-gold" /><h1 className="mt-4 font-display text-3xl">Confirming your payment…</h1></>}
      {status === "paid" && <><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" /><h1 className="mt-4 font-display text-4xl">Payment Successful</h1><p className="mt-2 text-white/70">Your credits have been added. Thank you!</p></>}
      {status === "pending" && <><Loader2 className="mx-auto h-14 w-14 text-gold" /><h1 className="mt-4 font-display text-3xl">Payment Processing</h1><p className="mt-2 text-white/70">Your credits will appear once PayPal confirms the payment.</p></>}
      {status === "failed" && <><AlertCircle className="mx-auto h-14 w-14 text-rose-300" /><h1 className="mt-4 font-display text-4xl">Payment Failed</h1><p className="mt-2 text-white/70">We couldn&apos;t confirm this payment. You have not been charged twice — please try again or contact us.</p></>}
      <div className="mt-6 flex justify-center gap-3"><Link href="/reading" className="btn-glow rounded-full px-6 py-3">Start a Reading</Link><Link href="/profile" className="btn-ghost rounded-full px-6 py-3">Profile</Link></div>
    </div>
  );
}
export default function Page() {
  return <div className="mx-auto max-w-lg px-6 pt-40 text-center"><Suspense fallback={null}><Inner /></Suspense></div>;
}
