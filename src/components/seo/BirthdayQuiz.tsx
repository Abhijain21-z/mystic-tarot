"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC, zodiacByDate } from "@/data/seo";
import { deckById, cardUrl } from "@/lib/seo";

/** Birthday calculator: sign card + personal-year Major card ("what tarot card am I"). */
function personalCard(month: number, day: number) {
  const sum = (month * 100 + day).toString().split("").reduce((a, ch) => a + Number(ch), 0);
  let n = sum;
  while (n > 9) n = n.toString().split("").reduce((a, ch) => a + Number(ch), 0);
  const map = ["the-magician", "the-high-priestess", "the-empress", "the-emperor", "the-hierophant", "the-lovers", "the-chariot", "strength", "the-hermit"];
  return map[n - 1];
}

export default function QuizCalculator() {
  const [dob, setDob] = useState("");
  const [shown, setShown] = useState(false);
  const m = dob ? Number(dob.split("-")[1]) : 0;
  const d = dob ? Number(dob.split("-")[2]) : 0;
  const z = m ? zodiacByDate(m, d) : null;
  const pc = m ? personalCard(m, d) : null;
  const valid = m && d;

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass rounded-3xl p-6">
        <label htmlFor="dob" className="block text-sm text-white/70">Your birthday</label>
        <input id="dob" type="date" value={dob} onChange={(e) => { setDob(e.target.value); setShown(false); }}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-gold/60 focus:outline-none" />
        <button onClick={() => setShown(true)} disabled={!valid}
          className="btn-glow mt-4 w-full rounded-full px-6 py-3 disabled:opacity-40">Reveal my card ✦</button>
      </div>
      <AnimatePresence>
        {shown && valid && z && pc && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
            <div className="glass flex items-center gap-4 rounded-3xl p-4">
              <img src={deckById[z.cardId].image} alt={`${z.sign} tarot card`} width={72} height={108} loading="lazy" className="w-16 rounded-lg border border-gold/40" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gold/70">{z.sign} · {z.dates}</p>
                <p className="font-display text-2xl text-gold-soft">{deckById[z.cardId].name}</p>
                <p className="mt-1 text-sm text-white/60">{z.line}</p>
                <Link href={cardUrl(z.cardId)} className="mt-2 inline-block text-sm text-gold underline decoration-gold/50 underline-offset-4">Full {deckById[z.cardId].name.replace(/^The /, "")} meaning →</Link>
              </div>
            </div>
            {pc !== z.cardId && deckById[pc] && (
              <div className="glass flex items-center gap-4 rounded-3xl p-4">
                <img src={deckById[pc].image} alt="Personal year tarot card" width={72} height={108} loading="lazy" className="w-16 rounded-lg border border-violet/50" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-violet/80">Birthday calculator</p>
                  <p className="font-display text-2xl text-gold-soft">{deckById[pc].name}</p>
                  <p className="mt-1 text-sm text-white/60">Your personal-year card: {deckById[pc].upright}.</p>
                  <Link href={cardUrl(pc)} className="mt-2 inline-block text-sm text-gold underline decoration-gold/50 underline-offset-4">Full meaning →</Link>
                </div>
              </div>
            )}
            <p className="text-center text-sm"><Link href="/reading" className="text-gold hover:underline">Pull a free 5-card reading →</Link></p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {ZODIAC.map((zz) => (
                <Link key={zz.sign} href={`/zodiac/${zz.sign.toLowerCase()}`} className="glass rounded-xl p-2 text-center text-xs text-white/70 hover:text-gold">{zz.sign}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
