"use client";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { CardBack } from "../TarotCardFace";

const SYMBOLS = ["☉", "☽", "✶", "♄", "♀", "☿", "✧", "♃"];

function Deck3D() {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 15 }), sry = useSpring(ry, { stiffness: 80, damping: 15 });
  const n = 7;
  return (
    <div
      className="perspective relative mx-auto h-[380px] w-full max-w-[460px] sm:h-[460px]"
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 30); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 20); }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-gradient-to-tr from-violet/40 via-magenta/30 to-gold/30 blur-3xl animate-pulse-glow" />
      <div className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full border border-gold/20 animate-spin-slow sm:h-[420px] sm:w-[420px]">
        {SYMBOLS.map((s, i) => (
          <span key={i} className="absolute left-1/2 top-1/2 text-gold/70" style={{ transform: `rotate(${i * 45}deg) translateY(-170px) rotate(-${i * 45}deg)` }}>{s}</span>
        ))}
      </div>
      <div className="absolute inset-0 m-auto h-[260px] w-[260px] rounded-full border border-dashed border-violet/30 animate-spin-rev" />
      <motion.div style={{ rotateX: srx, rotateY: sry }} className="preserve-3d absolute inset-0 grid place-items-center">
        {Array.from({ length: n }).map((_, i) => {
          const a = (i - (n - 1) / 2) * 12;
          return (
            <motion.div key={i} className="preserve-3d absolute" initial={{ rotateZ: 0, y: 60, opacity: 0 }}
              animate={{ rotateZ: a, y: 0, opacity: 1, x: a * 4 }} transition={{ delay: 0.3 + i * 0.08, type: "spring", damping: 14 }}
              style={{ transformOrigin: "50% 120%", z: i * 6 }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
                <CardBack className="h-48 w-32 sm:h-60 sm:w-40" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      {SYMBOLS.map((s, i) => (
        <span key={i} aria-hidden className="animate-float absolute font-display text-3xl text-violet/30" style={{ left: `${(i * 13 + 5) % 95}%`, top: `${(i * 23 + 15) % 85}%`, animationDelay: `${i * 0.7}s` }}>{s}</span>
      ))}
      <motion.div style={{ y, opacity: op }} className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-soft">
            <Sparkles className="h-3.5 w-3.5" /> 78-card deck · 3 free readings daily
          </motion.p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">
            {"Discover What the Cards Reveal".split(" ").map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }} className={`mr-3 inline-block ${i >= 3 ? "text-gradient-gold italic" : ""}`}>{w}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mx-auto mt-6 max-w-lg text-lg text-white/70 lg:mx-0">
            Choose five cards. Explore your energy, choices and possibilities.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/reading" className="btn-glow rounded-full px-8 py-4 text-base" aria-label="Check your tarot cards">Check Your Tarot Cards</Link>
            <a href="#how" className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-4">How It Works <ArrowDown className="h-4 w-4" /></a>
          </motion.div>
        </div>
        <Deck3D />
      </motion.div>
    </section>
  );
}
