"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TAROT_DECK } from "@/data/tarot";
import { yesNo, cardUrl, cardImage } from "@/lib/seo";

type Verdict = "yes" | "no" | "maybe";
const COLORS: Record<Verdict, string> = { yes: "text-emerald-400", no: "text-rose-400", maybe: "text-gold-soft" };
const WORDS: Record<Verdict, string> = { yes: "YES", no: "NO", maybe: "MAYBE / NOT YET" };

export default function YesNoTool() {
  const [draw, setDraw] = useState<(typeof TAROT_DECK)[number] | null>(null);
  const [reversed, setReversed] = useState(false);
  const [question, setQuestion] = useState("");
  function pull() { setReversed(Math.random() < 0.35); setDraw(TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)]); }
  const verdict: Verdict | null = draw ? yesNo(draw, reversed) : null;

  return (
    <div className="mx-auto max-w-2xl px-6">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Hold one question in mind (optional)…"
        className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center text-white placeholder-white/35 focus:border-gold/60 focus:outline-none"
      />
      <div className="flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {verdict && draw ? (
            <motion.div key={draw.id + String(reversed)} initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-center">
              <img src={cardImage(draw.id)} alt={`${draw.name} tarot card ${reversed ? "reversed" : "upright"}`} width={120} height={180} loading="lazy" className={`mx-auto w-32 rounded-xl border-2 border-gold/60 ${reversed ? "rotate-180" : ""}`} />
              <p className={`mt-4 font-display text-5xl ${COLORS[verdict]}`}>{WORDS[verdict]}</p>
              <p className="mt-1 text-white/70">{draw.name}{reversed ? " (reversed)" : " (upright)"}</p>
              <a href={cardUrl(draw.id)} className="mt-3 inline-block text-sm text-gold underline decoration-gold/40 underline-offset-4">Meaning of {draw.name.replace(/^The /, "")} →</a>
            </motion.div>
          ) : (
            <motion.p key="idle" className="font-display text-2xl text-gold-soft">Ask, then draw one card ✦</motion.p>
          )}
        </AnimatePresence>
        <button onClick={pull} className="btn-glow rounded-full px-8 py-3">{verdict ? "Draw again" : "Draw my card"}</button>
        <p className="text-center text-xs text-white/50">Single-card pull for binary questions. Verdicts compress nuance — always read the card's own page too.</p>
      </div>
    </div>
  );
}
