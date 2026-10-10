"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { RefreshCw, Hand, Eye, Shuffle, ScrollText, Heart, History, ShieldCheck, Check, AlertTriangle } from "lucide-react";
import BuyButton from "../BuyButton";
import { DISCLAIMER } from "../Footer";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 15 }), sy = useSpring(ry, { stiffness: 150, damping: 15 });
  return (
    <motion.div style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 14); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14); }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }} className={className}>
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-white/65">{sub}</p>}
    </Reveal>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: RefreshCw, t: "Spin the mystical deck", d: "Set your intention and set the 78-card deck spinning around its glowing orbit.", c: "from-violet to-azure" },
    { icon: Hand, t: "Choose any 5 cards", d: "Follow your intuition. Pick exactly five face-down cards from the spread.", c: "from-magenta to-violet" },
    { icon: Eye, t: "Reveal your personalized reading", d: "Watch each card flip to reveal its position, orientation and meaning for you.", c: "from-gold to-magenta" },
  ];
  return (
    <section id="how" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Heading eyebrow="The Ritual" title={<>How It <span className="text-gradient-gold italic">Works</span></>} sub="Three simple steps between you and your five-card spread." />
      <div className="relative grid gap-6 md:grid-cols-3">
        <div aria-hidden className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <Tilt className="glass relative h-full rounded-3xl p-8">
              <span className="absolute right-6 top-4 font-display text-7xl text-white/5">0{i + 1}</span>
              <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.c} shadow-lg shadow-violet/30`}><s.icon className="h-6 w-6 text-ink" /></div>
              <p className="text-xs uppercase tracking-widest text-gold/70">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm text-white/65">{s.d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const f = [
    { icon: Shuffle, t: "Random tarot card selection", d: "Cryptographically random, 5 unique cards per reading, upright or reversed." },
    { icon: ScrollText, t: "Detailed card predictions", d: "Summary, deep interpretation, advice, possibilities and cautions for every card." },
    { icon: Heart, t: "Love, career, money & spirit", d: "Four life lenses tailored to each card's position and orientation." },
    { icon: History, t: "Reading history in your profile", d: "Every reading saved with date and time, ready to revisit anytime." },
    { icon: ShieldCheck, t: "Secure payments & token credits", d: "PayPal-powered checkout. 1 credit = 1 reading. No duplicate charges." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <Heading eyebrow="Inside the Temple" title={<>Crafted for <span className="text-gradient-gold italic">Reflection</span></>} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {f.map((x, i) => (
          <Reveal key={i} delay={i * 0.08} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
            <Tilt className="glass group h-full overflow-hidden rounded-3xl p-7">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/20 blur-3xl transition group-hover:bg-magenta/30" />
              <x.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 font-display text-2xl">{x.t}</h3>
              <p className="mt-2 text-sm text-white/65">{x.d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Heading eyebrow="Energy Exchange" title={<>Simple, Honest <span className="text-gradient-gold italic">Pricing</span></>} sub="1 tarot reading = 1 credit. Your first 2 readings are always free." />
      <div className="grid gap-6 md:grid-cols-3">
        <Reveal><div className="glass flex h-full flex-col rounded-3xl p-8">
          <p className="text-sm uppercase tracking-widest text-azure">Welcome Gift</p>
          <p className="mt-4 font-display text-6xl">Free</p>
          <p className="text-white/60">First 2 readings for every new user</p>
          <ul className="my-6 space-y-2 text-sm text-white/75">{["Full 5-card spread", "All life-area insights", "No card required"].map((t) => <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{t}</li>)}</ul>
          <Link href="/reading" className="btn-ghost mt-auto rounded-full px-6 py-3 text-center">Start Free Reading</Link>
        </div></Reveal>
        <Reveal delay={0.1}><div className="glass flex h-full flex-col rounded-3xl p-8">
          <p className="text-sm uppercase tracking-widest text-magenta">Pay As You Go</p>
          <p className="mt-4 font-display text-6xl">$1 <span className="text-lg text-white/50">USD</span></p>
          <p className="text-white/60">per reading, from the 3rd reading onward</p>
          <ul className="my-6 space-y-2 text-sm text-white/75">{["1 credit = 1 reading", "Secure PayPal checkout", "Saved to your history"].map((t) => <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{t}</li>)}</ul>
          <div className="mt-auto"><BuyButton pack="single" className="btn-ghost">Buy 1 Credit — $1</BuyButton></div>
        </div></Reveal>
        <Reveal delay={0.2}><div className="relative flex h-full flex-col rounded-3xl bg-gradient-to-b from-gold/60 via-violet/50 to-magenta/50 p-px">
          <div className="flex h-full flex-col rounded-3xl bg-[#140a26]/95 p-8">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">Best Value · $0.50/reading</span>
            <p className="text-sm uppercase tracking-widest text-gold">Seer&apos;s Package</p>
            <p className="mt-4 font-display text-6xl">$50 <span className="text-lg text-white/50">USD</span></p>
            <p className="text-white/60">100 credits = 100 readings</p>
            <ul className="my-6 space-y-2 text-sm text-white/75">{["Credits never expire", "50% savings vs single", "Priority new features"].map((t) => <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{t}</li>)}</ul>
            <div className="mt-auto"><BuyButton pack="pack500" className="btn-glow">Buy 100 Credits</BuyButton></div>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}

export function Disclaimer() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <Reveal><div className="glass flex gap-4 rounded-2xl p-6">
        <AlertTriangle className="h-6 w-6 shrink-0 text-gold" />
        <p className="text-sm text-white/75"><strong className="text-gold-soft">Disclaimer: </strong>{DISCLAIMER}</p>
      </div></Reveal>
    </section>
  );
}

export function Marquee() {
  const words = ["The Star", "✦", "Wheel of Fortune", "✦", "The Moon", "✦", "Ace of Cups", "✦", "The Empress", "✦", "Queen of Wands", "✦", "The Sun", "✦"];
  return (
    <div className="relative overflow-hidden border-y border-gold/10 py-5" aria-hidden>
      <div className="animate-marquee-l flex w-max gap-10 whitespace-nowrap font-display text-3xl italic text-white/25">
        {[...words, ...words].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}
