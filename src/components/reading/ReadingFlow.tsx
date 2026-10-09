"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { RotateCcw, Loader2, Sparkles, UserPlus } from "lucide-react";
import { CardBack, TarotImage, CARD_BACK_SRC } from "../TarotCardFace";
import CardWheel from "./CardWheel";
import ReadingResult from "./ReadingResult";
import { useApp } from "../Providers";
import { readingFromPicks } from "@/lib/reading-local";
import type { ReadingCard } from "@/lib/interpret";

type Stage = "spin" | "select" | "reveal" | "result";

/** Sound-ready hook: dispatches events that an audio layer can subscribe to. */
function emitSound(name: "spin" | "burst" | "select" | "flip" | "reveal") {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("tarot:sound", { detail: name }));
}

function Orbit({ spinning }: { spinning: boolean }) {
  const rot = useMotionValue(0);
  const tilt = useMotionValue(-18);
  const speed = useRef(12);
  const dragging = useRef(false);
  const lastX = useRef(0);
  useAnimationFrame((_, dt) => {
    const target = spinning ? 720 : 14;
    speed.current += (target - speed.current) * Math.min(1, dt / 400);
    if (!dragging.current) rot.set(rot.get() + (speed.current * dt) / 1000);
    tilt.set(-18 + Math.sin(rot.get() / 60) * 6);
  });
  const n = 12;
  return (
    <div className="perspective relative mx-auto aspect-square w-[min(88vw,440px)] cursor-grab touch-pan-y active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      role="application" aria-label="Mystic deck globe. Drag or swipe to spin it."
      onPointerDown={(e) => { dragging.current = true; lastX.current = e.clientX; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
      onPointerMove={(e) => { if (!dragging.current) return; const dx = e.clientX - lastX.current; lastX.current = e.clientX; rot.set(rot.get() + dx * 0.6); }}
      onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }} onPointerLeave={() => { dragging.current = false; }}>
      <p className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/45">Swipe to spin ✦</p>
      {/* dark mystic globe */}
      <div className="absolute inset-[10%] rounded-full border border-violet/40 bg-[radial-gradient(circle_at_50%_35%,#2c1454_0%,#150a2e_45%,#07040f_75%)] shadow-[0_0_100px_-10px_rgba(155,107,255,0.8),inset_0_0_80px_-10px_rgba(232,194,106,0.35)]" />
      <div className="absolute inset-[10%] overflow-hidden rounded-full" aria-hidden>
        <div className="animate-card-shimmer absolute inset-0" />
      </div>
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-violet/40 via-magenta/30 to-azure/30 blur-2xl animate-pulse-glow" />
      <motion.div style={{ rotate: rot, rotateX: tilt }} className="preserve-3d absolute inset-0">
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${(i * 360) / n}deg) translateY(calc(min(88vw,440px) * -0.36)) rotateX(18deg)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CARD_BACK_SRC} alt="" aria-hidden draggable={false}
              className="-ml-[18px] -mt-[28px] h-14 w-9 rounded-md border border-gold/60 object-cover shadow-[0_0_18px_rgba(232,194,106,0.55)] animate-float sm:-ml-[22px] sm:-mt-[34px] sm:h-[68px] sm:w-11"
              style={{ animationDelay: `${(i % 6) * 0.5}s` }} />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div animate={{ rotateY: spinning ? 360 : 0, scale: spinning ? [1, 1.12, 1] : 1 }} transition={{ duration: spinning ? 0.8 : 0, repeat: spinning ? Infinity : 0, ease: "linear" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CARD_BACK_SRC} alt="Mystic tarot card back" draggable={false}
            className="h-32 w-20 rounded-xl border-2 border-gold object-cover shadow-[0_0_60px_rgba(232,194,106,0.6)] animate-float" />
        </motion.div>
      </div>
      <AnimatePresence>
        {spinning && (
          <motion.div initial={{ scale: 0.2, opacity: 0.9 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} className="pointer-events-none absolute inset-[25%] rounded-full bg-[radial-gradient(circle,rgba(255,240,200,0.8),rgba(224,79,180,0.3)_40%,transparent_70%)]" />
        )}
      </AnimatePresence>
      {spinning && Array.from({ length: 24 }).map((_, i) => (
        <motion.span key={i} className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(232,194,106,0.8)]"
          initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(i * 0.26) * 240, y: Math.sin(i * 0.26) * 240, opacity: 0 }} transition={{ duration: 1.4, delay: (i % 6) * 0.15, repeat: Infinity }} />
      ))}
    </div>
  );
}

function FlipCard({ card, index, show }: { card: ReadingCard; index: number; show: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 h-8 text-center text-[11px] uppercase leading-tight tracking-widest text-gold/80">{index + 1}. {card.positionTitle}</p>
      <div className="perspective relative">
        {show && <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-violet/50 via-magenta/30 to-gold/40 blur-2xl animate-pulse-glow" />}
        <motion.div className="preserve-3d relative h-44 w-[100px] sm:h-60 sm:w-[138px]" animate={{ rotateY: show ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.3, 0.7, 0.2, 1] }}>
          <div className="backface-hidden absolute inset-0"><CardBack className="h-full w-full" /></div>
          <div className="backface-hidden absolute inset-0 [transform:rotateY(180deg)]">
            <TarotImage src={card.image} name={card.name} reversed={card.reversed} className="h-full w-full border border-gold/60" />
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} className="mt-3 text-center">
        <p className="font-display text-lg leading-tight">{card.name}</p>
        <p className={`text-xs ${card.reversed ? "text-pink-300" : "text-sky-300"}`}>{card.reversed ? "Reversed" : "Upright"}</p>
      </motion.div>
    </div>
  );
}

export default function ReadingFlow() {
  const { user, guestFreeRemaining, refresh, loaded } = useApp();
  const [stage, setStage] = useState<Stage>("spin");
  const [spinning, setSpinning] = useState(false);
  const [deckKey, setDeckKey] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ReadingCard[]>([]);
  const [saved, setSaved] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [flipMode, setFlipMode] = useState(false);
  const [wheelRevealed, setWheelRevealed] = useState(0);
  const [faces, setFaces] = useState<Record<number, { image: string; name: string }>>({});
  const topRef = useRef<HTMLDivElement>(null);

  const remaining = user ? user.freeRemaining + user.credits : guestFreeRemaining;

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [stage]);

  function spin() {
    setSpinning(true); emitSound("spin");
    setTimeout(() => emitSound("burst"), 1800);
    setTimeout(() => {
      setSpinning(false);
      setDeckKey((k) => k + 1); setPicked([]); setStage("select");
    }, 2400);
  }

  function togglePick(i: number) {
    if (flipMode || loading) return;
    if (picked.includes(i)) { setPicked((p) => p.filter((x) => x !== i)); return; }
    if (picked.length >= 5) return;
    emitSound("select");
    setPicked((p) => [...p, i]);
  }

  function reveal() {
    if (picked.length !== 5 || loading) return;
    setLoading(true);
    // No server needed: build the reading instantly from the user's 5 picks.
    window.setTimeout(() => {
      try {
        const drawn = readingFromPicks(picked);
        const f: Record<number, { image: string; name: string }> = {};
        picked.forEach((pi, k) => { f[pi] = { image: drawn[k].image, name: drawn[k].name }; });
        setFaces(f);
        setCards(drawn); setSaved(false);
        setWheelRevealed(0); setFlipMode(true);
        refresh();
      } finally { setLoading(false); }
    }, 700);
  }

  /* stagger the in-wheel 3D flips, then move into the reading layout */
  useEffect(() => {
    if (!flipMode) return;
    if (wheelRevealed >= 5) {
      const t = setTimeout(() => { setRevealed(5); setStage("reveal"); }, 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setWheelRevealed((n) => n + 1); emitSound("flip"); }, wheelRevealed === 0 ? 500 : 450);
    return () => clearTimeout(t);
  }, [flipMode, wheelRevealed]);

  useEffect(() => {
    if (stage !== "reveal" || revealed >= 5) return;
    const t = setTimeout(() => { setRevealed((n) => n + 1); emitSound("flip"); }, revealed === 0 ? 600 : 1100);
    return () => clearTimeout(t);
  }, [stage, revealed]);

  function restart() { setPicked([]); setCards([]); setRevealed(0); setFlipMode(false); setWheelRevealed(0); setFaces({}); setStage("spin"); }

  return (
    <div ref={topRef} className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-10 pt-28 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs">
        {(["spin", "select", "reveal", "result"] as Stage[]).map((s, i) => (
          <span key={s} className={`rounded-full px-3 py-1 capitalize ${stage === s ? "bg-gold text-ink" : "glass text-white/60"}`}>{i + 1}. {s}</span>
        ))}
      </div>
      {loaded && stage !== "result" && (
        <p className="mb-4 text-center text-sm text-white/60" aria-live="polite">
          {user ? <>Free readings left: <b className="text-gold">{user.freeRemaining}</b> · Credits: <b className="text-gold">{user.credits}</b></> : <>Guest free readings left: <b className="text-gold">{guestFreeRemaining}</b></>}
        </p>
      )}

      <AnimatePresence mode="wait">
        {stage === "spin" && (
          <motion.section key="spin" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center gap-6">
            <h2 className="text-center font-display text-4xl">Spin the Mystical Deck</h2>
            <Orbit spinning={spinning} />
            <button onClick={spin} disabled={spinning} className="btn-glow inline-flex items-center gap-2 rounded-full px-10 py-4">
              {spinning ? <><Loader2 className="h-4 w-4 animate-spin" />Shuffling the cosmos…</> : <><Sparkles className="h-4 w-4" />Spin the Tarot Deck</>}
            </button>
            <p className="text-sm text-white/55">Choose exactly 5 cards from the deck after the spin.</p>
          </motion.section>
        )}

        {stage === "select" && (
          <motion.section key={`select-${deckKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <h2 className="text-center font-display text-4xl sm:text-5xl"><span className="text-gradient-gold">Choose Your Tarot Cards</span></h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-white/70">Scroll or swipe the wheel to explore all 78 cards and select 5 cards that feel right for you.</p>

            <div className="relative mt-2 w-full">
              {/* left info panel */}
              <div className="glass pointer-events-none absolute left-2 top-8 z-30 hidden w-48 rounded-2xl border border-gold/30 p-5 lg:block">
                <p className="font-display text-xl text-gold-soft">Select 5 Cards</p>
                <p className="mt-2 text-lg" aria-live="polite"><b className="text-gold">{picked.length}</b> <span className="text-white/60">/ 5 Selected</span></p>
                <div className="mt-3 flex gap-2">
                  {Array.from({ length: 5 }).map((_, d) => (
                    <span key={d} className={`h-3.5 w-3.5 rounded-full border transition-all duration-300 ${d < picked.length ? "border-gold bg-gold shadow-[0_0_10px_rgba(232,194,106,0.9)]" : "border-white/30"}`} />
                  ))}
                </div>
              </div>
              {/* right info panel */}
              <div className="glass pointer-events-none absolute right-2 top-8 z-30 hidden w-48 rounded-2xl border border-gold/30 p-5 text-center lg:block">
                <p className="font-display text-xl text-gold-soft">Scroll or Swipe</p>
                <p className="mt-1 text-2xl tracking-[0.3em] text-gold">← →</p>
                <p className="mt-1 text-xs text-white/60">Rotate the wheel to explore cards</p>
              </div>

              <CardWheel picked={picked} onPick={togglePick} revealMode={flipMode} revealed={wheelRevealed} faces={faces} />
            </div>

            {/* mobile counter */}
            <p className="text-white/70 lg:hidden" aria-live="polite">Selected: <b className="text-gold">{picked.length} / 5</b></p>

            <div className="mt-3 flex min-h-[60px] flex-col items-center justify-center gap-3">
              <AnimatePresence mode="wait">
                {picked.length === 5 ? (
                  <motion.button key="reveal" initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    onClick={reveal} disabled={loading}
                    className="btn-glow inline-flex items-center gap-3 rounded-full border-2 border-gold/80 px-12 py-4 font-display text-2xl shadow-[0_0_45px_rgba(232,194,106,0.6)]">
                    {loading ? <><Loader2 className="h-5 w-5 animate-spin" />Consulting the cosmos…</> : <><Sparkles className="h-5 w-5 text-gold" />Reveal My 5 Cards</>}
                  </motion.button>
                ) : (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-white/50">
                    Tap a card to choose it — <b className="text-gold">{5 - picked.length}</b> more to go
                  </motion.p>
                )}
              </AnimatePresence>
              {picked.length > 0 && !flipMode && (
                <button onClick={() => setPicked([])} disabled={loading} className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm"><RotateCcw className="h-4 w-4" />Choose Again</button>
              )}
              {remaining <= 0 && loaded && <p className="text-center text-xs text-white/50">No free readings left — you&apos;ll be asked to add credits.</p>}
            </div>
          </motion.section>
        )}

        {stage === "reveal" && (
          <motion.section key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
            <h2 className="text-center font-display text-4xl">The Cards Reveal…</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {cards.map((c, i) => <FlipCard key={c.cardId} card={c} index={i} show={revealed > i} />)}
            </div>
            <AnimatePresence>
              {revealed >= 5 && (
                <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={() => { emitSound("reveal"); setStage("result"); }} className="btn-glow mt-12 rounded-full px-10 py-4">
                  Read My Full Prediction
                </motion.button>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {stage === "result" && (
          <motion.section key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-center font-display text-4xl sm:text-5xl">Your <span className="text-gradient-gold italic">Personalized</span> Reading</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/60">These insights are for reflection — possibilities, not certainties. Tap any card to expand.</p>
            {!saved && (
              <div className="glass mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3 rounded-2xl p-4 text-center sm:flex-row sm:text-left">
                <UserPlus className="h-6 w-6 shrink-0 text-gold" />
                <p className="flex-1 text-sm text-white/75">Create a free profile to save this reading to your history.</p>
                <Link href="/login?mode=register&next=/history" className="btn-glow rounded-full px-5 py-2 text-sm">Save Reading</Link>
              </div>
            )}
            <div className="mt-8"><ReadingResult cards={cards} /></div>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button onClick={restart} className="btn-glow rounded-full px-8 py-3">New Reading</button>
              {user && <Link href="/history" className="btn-ghost rounded-full px-8 py-3">View History</Link>}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {loading && (
        <div className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-black/40 backdrop-blur-[2px]" role="status" aria-label="Randomizing cards">
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
            <p className="font-display text-xl text-gold-soft">Shuffling 78 cards…</p>
          </div>
        </div>
      )}
    </div>
  );
}
