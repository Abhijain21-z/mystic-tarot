"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useApp } from "./Providers";

export default function BuyButton({ pack, children, className = "" }: { pack: "single" | "pack500"; children: React.ReactNode; className?: string }) {
  const { user } = useApp();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function buy() {
    if (busy) return; // prevent double-clicks
    if (!user) { router.push(`/login?next=/profile&buy=${pack}`); return; }
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/paypal/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pack }) });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || "PayPal checkout failed");
      window.location.href = d.url;
    } catch (e) {
      setErr((e as Error).message); setBusy(false);
    }
  }
  return (
    <div className="w-full">
      <button onClick={buy} disabled={busy} aria-label={typeof children === "string" ? children : "Buy credits"} className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 ${className}`}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}{children}
      </button>
      {err && <p role="alert" className="mt-2 text-center text-sm text-rose-300">{err}</p>}
    </div>
  );
}
