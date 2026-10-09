"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Trash2, Sparkles, Coins, Gift } from "lucide-react";
import { useApp } from "@/components/Providers";
import BuyButton from "@/components/BuyButton";

export default function Page() {
  const { user, loaded, refresh } = useApp();
  const router = useRouter();
  const [count, setCount] = useState<number | null>(null);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { if (loaded && !user) router.replace("/login?next=/profile"); }, [loaded, user, router]);
  useEffect(() => { if (user) fetch("/api/readings").then((r) => r.json()).then((d) => setCount(d.readings?.length ?? 0)); }, [user]);
  if (!loaded || !user) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>;

  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); await refresh(); router.push("/"); }
  async function del() { await fetch("/api/account", { method: "DELETE" }); await refresh(); router.push("/"); }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">Dashboard</p>
      <h1 className="mt-2 font-display text-5xl">Hello, {user.name}</h1>
      <p className="text-white/60">{user.email}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[{ I: Gift, l: "Free readings remaining", v: user.freeRemaining }, { I: Coins, l: "Credit balance", v: user.credits }, { I: Sparkles, l: "Saved readings", v: count ?? "…" }].map(({ I, l, v }) => (
          <div key={l} className="glass rounded-3xl p-6"><I className="h-6 w-6 text-gold" /><p className="mt-3 font-display text-5xl">{v}</p><p className="text-sm text-white/60">{l}</p></div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-2xl">Add credits</h2>
          <p className="mb-4 text-sm text-white/60">1 reading = 1 credit · USD</p>
          <div className="grid gap-3 sm:grid-cols-2"><BuyButton pack="single" className="btn-ghost">1 Credit — $1</BuyButton><BuyButton pack="pack500" className="btn-glow">500 Credits — $50</BuyButton></div>
        </div>
        <div className="glass flex flex-col gap-3 rounded-3xl p-6">
          <Link href="/reading" className="btn-glow rounded-full py-3 text-center">Start a Reading</Link>
          <Link href="/history" className="btn-ghost rounded-full py-3 text-center">Reading History</Link>
          <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full py-2 text-white/70 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-rose-400/20 bg-rose-500/5 p-6">
        <h2 className="font-display text-2xl text-rose-200">Delete account</h2>
        <p className="text-sm text-white/60">Permanently removes your profile, credits, readings and payment records.</p>
        {!confirm ? <button onClick={() => setConfirm(true)} className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-300/40 px-5 py-2 text-rose-200"><Trash2 className="h-4 w-4" />Delete my account</button>
          : <div className="mt-3 flex gap-3"><button onClick={del} className="rounded-full bg-rose-500 px-5 py-2 text-white">Yes, delete permanently</button><button onClick={() => setConfirm(false)} className="btn-ghost rounded-full px-5 py-2">Cancel</button></div>}
      </div>
    </div>
  );
}
