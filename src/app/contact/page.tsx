"use client";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function Page() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setState("busy");
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    setState(r.ok ? "ok" : "err"); if (r.ok) setF({ name: "", email: "", message: "" });
  }
  const input = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-gold/60";
  return (
    <div className="mx-auto max-w-xl px-6 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">Reach Out</p>
      <h1 className="mt-2 font-display text-5xl">Contact Us</h1>
      <form onSubmit={submit} className="glass mt-8 space-y-4 rounded-3xl p-8">
        <label className="block"><span className="mb-1 block text-sm text-white/70">Name</span><input required className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label className="block"><span className="mb-1 block text-sm text-white/70">Email</span><input required type="email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
        <label className="block"><span className="mb-1 block text-sm text-white/70">Message</span><textarea required rows={5} className={input} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
        {state === "ok" && <p role="status" className="text-emerald-300">Thank you — your message has been received.</p>}
        {state === "err" && <p role="alert" className="text-rose-300">Something went wrong. Please try again.</p>}
        <button disabled={state === "busy"} className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full py-3">{state === "busy" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Send Message</button>
      </form>
    </div>
  );
}
