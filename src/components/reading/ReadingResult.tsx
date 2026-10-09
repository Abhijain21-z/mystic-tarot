"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Briefcase, Coins, Sparkles, Compass, Sun, ShieldAlert } from "lucide-react";
import type { ReadingCard } from "@/lib/interpret";
import { TarotImage } from "../TarotCardFace";

export default function ReadingResult({ cards, defaultOpen = 0 }: { cards: ReadingCard[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="space-y-4">
      {cards.map((c, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={c.cardId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`glass overflow-hidden rounded-3xl ${isOpen ? "ring-1 ring-gold/40" : ""}`}>
            <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`card-panel-${i}`} className="flex w-full items-center gap-4 p-4 text-left sm:p-5">
              <TarotImage src={c.image} name={c.name} reversed={c.reversed} className="h-24 w-14 shrink-0 sm:h-28 sm:w-16" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-widest text-gold/80">{i + 1}. {c.positionTitle}</p>
                <h3 className="font-display text-2xl leading-tight">{c.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded-full px-2 py-0.5 ${c.reversed ? "bg-magenta/20 text-pink-200" : "bg-azure/20 text-sky-200"}`}>{c.reversed ? "Reversed" : "Upright"}</span>
                  <span className="text-white/50">{c.suit}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-white/65 sm:line-clamp-1">{c.summary}</p>
              </div>
              <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`card-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="grid gap-6 border-t border-white/5 p-5 md:grid-cols-[220px_1fr]">
                    <TarotImage src={c.image} name={c.name} reversed={c.reversed} className="mx-auto aspect-[11/19] w-44 md:w-full shadow-[0_0_60px_-10px_rgba(155,107,255,0.7)]" />
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-xl text-gold-soft">Interpretation</h4>
                        <p className="mt-1 text-white/80">{c.detail}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { I: Heart, t: "Love", v: c.love, col: "text-pink-300" },
                          { I: Briefcase, t: "Career", v: c.career, col: "text-sky-300" },
                          { I: Coins, t: "Money", v: c.money, col: "text-gold" },
                          { I: Sparkles, t: "Emotional / Spiritual", v: c.spiritual, col: "text-violet-300" },
                        ].map(({ I, t, v, col }) => (
                          <div key={t} className="rounded-2xl bg-white/[0.03] p-4">
                            <p className={`flex items-center gap-2 text-sm font-medium ${col}`}><I className="h-4 w-4" />{t}</p>
                            <p className="mt-1 text-sm text-white/75">{v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-gold"><Compass className="h-4 w-4" />Advice</p>
                        <p className="mt-1 text-white/85">{c.advice}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-emerald-400/5 p-4"><p className="flex items-center gap-2 text-sm font-medium text-emerald-300"><Sun className="h-4 w-4" />Positive possibilities</p><p className="mt-1 text-sm text-white/75">{c.positives}</p></div>
                        <div className="rounded-2xl bg-amber-400/5 p-4"><p className="flex items-center gap-2 text-sm font-medium text-amber-300"><ShieldAlert className="h-4 w-4" />Things to be careful about</p><p className="mt-1 text-sm text-white/75">{c.caution}</p></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
