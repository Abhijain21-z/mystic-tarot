"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useApp } from "@/components/Providers";

function Inner() {
  const sp = useSearchParams();
  const router = useRouter();
  const { refresh } = useApp();
  const [mode, setMode] = useState<"login" | "register">(sp.get("mode") === "register" ? "register" : "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const next = sp.get("next") || "/profile";

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const r = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Something went wrong");
      await refresh();
      router.push(next.startsWith("/") ? next : "/profile");
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  const input = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold/60 focus:bg-white/10";
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8">
      <div className="mb-6 grid grid-cols-2 rounded-full bg-white/5 p-1" role="tablist">
        {(["login", "register"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`rounded-full py-2 text-sm transition ${mode === m ? "bg-gold text-ink" : "text-white/70"}`}>{m === "login" ? "Sign In" : "Create Profile"}</button>
        ))}
      </div>
      <h1 className="font-display text-4xl">{mode === "login" ? "Welcome back" : "Begin your journey"}</h1>
      <p className="mt-1 text-sm text-white/60">{mode === "login" ? "Access your credits and saved readings." : "Every new profile includes 2 free readings."}</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "register" && <label className="block"><span className="mb-1 block text-sm text-white/70">Name</span><input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label>}
        <label className="block"><span className="mb-1 block text-sm text-white/70">Email address</span><input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></label>
        <label className="block"><span className="mb-1 block text-sm text-white/70">Password</span><input required type="password" minLength={mode === "register" ? 8 : 1} className={input} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
        {err && <p role="alert" className="text-sm text-rose-300">{err}</p>}
        <button disabled={busy} className="btn-glow flex w-full items-center justify-center gap-2 rounded-full py-3">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{mode === "login" ? "Sign In" : "Create Profile"}</button>
      </form>
      <p className="mt-5 text-center text-xs text-white/40">Google sign-in and magic links can be enabled by configuring OAuth credentials.</p>
    </motion.div>
  );
}

export default function Page() {
  return <div className="mx-auto max-w-md px-6 pt-32"><Suspense fallback={null}><Inner /></Suspense></div>;
}
