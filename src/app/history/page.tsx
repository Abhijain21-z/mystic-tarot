"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Trash2, Moon } from "lucide-react";
import { useApp } from "@/components/Providers";
import ReadingResult from "@/components/reading/ReadingResult";
import { TarotImage } from "@/components/TarotCardFace";
import type { ReadingCard } from "@/lib/interpret";

interface Row { id: number; paidWith: string; cards: ReadingCard[]; createdAt: string }

export default function Page() {
  const { user, loaded } = useApp();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (!user) return;
    fetch("/api/readings").then((r) => r.json()).then((d) => { if (d.error) setErr(d.error); else setRows(d.readings); }).catch(() => setErr("Could not load history."));
  }, [user]);
  async function remove(id: number) {
    await fetch(`/api/readings?id=${id}`, { method: "DELETE" });
    setRows((r) => r?.filter((x) => x.id !== id) ?? null);
  }
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">Your Archive</p>
      <h1 className="mt-2 font-display text-5xl">Reading History</h1>
      {!loaded ? <Loader2 className="mt-10 h-8 w-8 animate-spin text-gold" /> : !user ? (
        <div className="glass mt-8 rounded-3xl p-10 text-center"><Moon className="mx-auto h-10 w-10 text-gold" /><p className="mt-3 text-white/70">Sign in to see your saved readings.</p><Link href="/login?next=/history" className="btn-glow mt-5 inline-block rounded-full px-6 py-3">Login / Create Profile</Link></div>
      ) : err ? <p role="alert" className="mt-8 text-rose-300">{err}</p> : !rows ? <Loader2 className="mt-10 h-8 w-8 animate-spin text-gold" /> : rows.length === 0 ? (
        <div className="glass mt-8 rounded-3xl p-10 text-center"><p className="text-white/70">No readings yet. The cards are waiting.</p><Link href="/reading" className="btn-glow mt-5 inline-block rounded-full px-6 py-3">Start Your First Reading</Link></div>
      ) : (
        <div className="mt-8 space-y-4">
          {rows.map((r) => (
            <div key={r.id} className="glass rounded-3xl p-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-6">{r.cards.map((c) => <TarotImage key={c.cardId} src={c.image} name={c.name} reversed={c.reversed} className="h-20 w-12 border border-gold/40" />)}</div>
                <div className="flex-1">
                  <p className="font-display text-xl">{r.cards.map((c) => c.name).join(" · ")}</p>
                  <p className="text-xs text-white/50">{new Date(r.createdAt).toLocaleString()} · {r.paidWith === "free" ? "Free reading" : "1 credit"}</p>
                </div>
                <button onClick={() => setOpen(open === r.id ? null : r.id)} className="btn-ghost rounded-full px-4 py-2 text-sm" aria-expanded={open === r.id}>{open === r.id ? "Hide" : "View"}</button>
                <button onClick={() => remove(r.id)} aria-label="Delete reading" className="rounded-full p-2 text-white/50 hover:text-rose-300"><Trash2 className="h-4 w-4" /></button>
              </div>
              {open === r.id && <div className="mt-5"><ReadingResult cards={r.cards} defaultOpen={null} /></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
