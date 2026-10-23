"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Briefcase, Flower2, Star, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Layers, Hand, ScrollText, UserRound, Orbit, Brain, LayoutGrid, Lock, ArrowRight } from "lucide-react";
import { TAROT_DECK } from "@/data/tarot";
import { useApp } from "../Providers";

const MAJORS = TAROT_DECK.filter((c) => c.suit === "Major Arcana");
const ORBIT_CARDS = [17, 19, 18, 1, 10, 6, 21, 0, 3, 11].map((i) => MAJORS[i]);
const SYMBOLS = ["☽", "✶", "☉", "✶", "☾", "♃", "✧", "♄"];

function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className={className} />;
}

/* ---------- 3D orbit ring with central sun card on a glowing pedestal ---------- */
function CardOrbit({ fast }: { fast: boolean }) {
  const rot = useMotionValue(0);
  const speed = useRef(18);
  const dragging = useRef(false);
  const lastX = useRef(0);
  useAnimationFrame((_, dt) => {
    speed.current += ((fast ? 520 : 18) - speed.current) * Math.min(1, dt / 350);
    if (!dragging.current) rot.set((rot.get() + (speed.current * dt) / 1000) % 360);
  });
  const n = ORBIT_CARDS.length;
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[520px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[420px]"
      style={{ perspective: 1100, touchAction: "pan-y" }}
      role="application" aria-label="Tarot orbit animation. Drag or swipe to spin it."
      onPointerDown={(e) => { dragging.current = true; lastX.current = e.clientX; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
      onPointerMove={(e) => { if (!dragging.current) return; const dx = e.clientX - lastX.current; lastX.current = e.clientX; rot.set((rot.get() + dx * 0.5) % 360); }}
      onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }} onPointerLeave={() => { dragging.current = false; }}>
      <p className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/45">Swipe to spin ✦</p>
      {/* zodiac arc */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full border border-gold/30 sm:h-[380px] sm:w-[380px]">
        <div className="absolute inset-0 animate-spin-slow">
          {SYMBOLS.map((s, i) => (
            <span key={i} className="absolute left-1/2 top-1/2 -ml-2 -mt-3 text-lg text-gold drop-shadow-[0_0_8px_rgba(232,194,106,0.9)]"
              style={{ transform: `rotate(${i * 45}deg) translateY(-150px) rotate(-${i * 45}deg)` }}>{s}</span>
          ))}
        </div>
      </div>
      {/* pedestal */}
      <div className="absolute bottom-2 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-[50%] border-2 border-gold/60 bg-gradient-to-b from-[#2a1450] to-[#0b0418] shadow-[0_0_60px_rgba(232,194,106,0.55),inset_0_0_30px_rgba(232,194,106,0.35)]" />
      <div className="absolute bottom-8 left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[50%] border border-gold/70 bg-[#1a0b33] shadow-[0_0_40px_rgba(232,194,106,0.6)]" />
      <div className="absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl animate-pulse-glow" />

      {/* rotating ring */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", rotateX: -8 }}>
        <motion.div className="absolute left-1/2 top-[45%]" style={{ transformStyle: "preserve-3d", rotateY: rot }}>
          {/* golden light rings */}
          {[0, 1].map((k) => (
            <div key={k} className="absolute left-1/2 top-1/2 rounded-full border-2 border-gold/70 shadow-[0_0_25px_rgba(232,194,106,0.8)]"
              style={{ width: 400, height: 400, marginLeft: -200, marginTop: -200 + k * 60, transform: "rotateX(90deg)" }} />
          ))}
          {ORBIT_CARDS.map((c, i) => (
            <div key={c.id} className="absolute" style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(clamp(150px, 26vw, 200px))`, transformStyle: "preserve-3d", left: -34, top: -58 }}>
              <div className="h-[116px] w-[68px] overflow-hidden rounded-md border border-gold/70 bg-[#1a0b33] shadow-[0_0_18px_rgba(232,194,106,0.55)] sm:h-[132px] sm:w-[78px]">
                <Img src={c.image} alt={c.name} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* center card */}
      <motion.div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="h-[190px] w-[116px] overflow-hidden rounded-xl border-2 border-gold shadow-[0_0_60px_rgba(232,194,106,0.8)] sm:h-[230px] sm:w-[140px]">
          <Img src="/images/card-sun-back.jpg" alt="Mystic sun tarot card" className="h-full w-full object-cover" />
        </div>
      </motion.div>
      <AnimatePresence>
        {fast && <motion.div key="burst" initial={{ scale: 0.3, opacity: 1 }} animate={{ scale: 2.4, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-[45%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,200,0.8),rgba(224,79,180,0.3)_45%,transparent_70%)]" />}
      </AnimatePresence>
    </div>
  );
}

/* ---------- curved Major Arcana carousel ---------- */
function ArcCarousel() {
  const [off, setOff] = useState(0);
  const { reduced } = useApp();
  const touchX = useRef<number | null>(null);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setOff((o) => o + 1), 3200);
    return () => clearInterval(t);
  }, [reduced]);
  const swipe = (dx: number) => {
    if (dx > 40) setOff((o) => o - 1);
    else if (dx < -40) setOff((o) => o + 1);
  };
  const visible = 9;
  const items = Array.from({ length: visible }, (_, k) => MAJORS[(((off + k) % MAJORS.length) + MAJORS.length) % MAJORS.length]);
  return (
    <div className="relative mt-4" style={{ touchAction: "pan-y" }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touchX.current === null) return; swipe(touchX.current - e.changedTouches[0].clientX); touchX.current = null; }}
      onPointerDown={(e) => { touchX.current = e.clientX; }}
      onPointerUp={(e) => { if (touchX.current === null) return; swipe(touchX.current - e.clientX); touchX.current = null; }}>
      <p className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/45">Swipe to explore ✦</p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-[50%] border-b-2 border-violet/70 shadow-[0_10px_40px_rgba(155,107,255,0.6)]" />
      <div className="flex items-end justify-center gap-2 overflow-hidden px-10 pb-8 sm:gap-3" style={{ perspective: 1000 }}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((c, k) => {
            const d = k - (visible - 1) / 2;
            return (
              <motion.div key={`${c.id}-${off + k}`} layout initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0, rotate: d * 5, y: Math.abs(d) * Math.abs(d) * 3.5 }} exit={{ opacity: 0, x: -60 }}
                transition={{ type: "spring", damping: 20, stiffness: 120 }}
                whileHover={{ y: -18, scale: 1.08, zIndex: 10 }}
                className={`shrink-0 ${Math.abs(d) > 2 ? "hidden md:block" : ""} ${Math.abs(d) > 3 ? "md:hidden xl:block" : ""}`}>
                <Link href="/reading" aria-label={`${c.name} — start a reading`} className="block h-[170px] w-[100px] overflow-hidden rounded-lg border-2 border-gold/70 bg-[#1a0b33] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(232,194,106,0.3)] sm:h-[210px] sm:w-[122px]">
                  <Img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <button aria-label="Previous cards" onClick={() => setOff((o) => o - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 hover:text-gold"><ChevronLeft className="h-9 w-9" /></button>
      <button aria-label="Next cards" onClick={() => setOff((o) => o + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 hover:text-gold"><ChevronRight className="h-9 w-9" /></button>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay }} className={className}>{children}</motion.div>;
}

function Divider({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-40" /><span className="text-gold">✦</span>
      <h2 className="font-display text-3xl text-gold-soft sm:text-4xl">{title}</h2>
      <span className="text-gold">✦</span><span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-40" />
    </div>
  );
}

export default function MysticHome() {
  const router = useRouter();
  const [fast, setFast] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  function spin() {
    if (fast) return;
    setFast(true);
    window.dispatchEvent(new CustomEvent("tarot:sound", { detail: "spin" }));
    setTimeout(() => router.push("/reading"), 1600);
  }

  const areas = [{ I: Heart, l: "Love" }, { I: Briefcase, l: "Career" }, { I: Flower2, l: "Health" }, { I: Star, l: "Spirituality" }];
  const steps = [
    { I: Layers, t: "Spin the Cards", d: "Get 5 random tarot cards" },
    { I: Hand, t: "Select 5 Cards", d: "Choose the cards you feel drawn to" },
    { I: ScrollText, t: "Get Your Reading", d: "Receive detailed predictions" },
    { I: UserRound, t: "Create Account", d: "3 free readings daily, pay beyond that" },
  ];
  const feats = [
    { I: Orbit, t: "Real Tarot Cards", d: "Authentic 78-card deck design" },
    { I: Brain, t: "Traditional Wisdom", d: "Meaningful, position-aware interpretations" },
    { I: LayoutGrid, t: "Multiple Life Areas", d: "Love, Career, Health, Relationships & more" },
    { I: Lock, t: "Secure & Private", d: "Your data is always protected" },
  ];
  const insightCards = [MAJORS[6], MAJORS[10], MAJORS[17], MAJORS[13], MAJORS[19]];
  const insights = [
    { I: Heart, t: "Love & Relationships", d: "Find clarity in your heart." },
    { I: Briefcase, t: "Career & Finance", d: "Make confident decisions." },
    { I: Flower2, t: "Health & Wellbeing", d: "Guidance for a balanced life." },
    { I: Star, t: "Spiritual Growth", d: "Connect with your higher self." },
  ];
  const reviews = [
    { n: "Priya S.", q: "The reading gave me so much clarity and a calm way to think about my choices. Highly recommended!", c: "from-pink-400 to-violet" },
    { n: "Rahul M.", q: "Beautiful experience. The insights about my career gave me a lot to reflect on.", c: "from-azure to-violet" },
    { n: "Neha K.", q: "Simple to use and very meaningful readings. Loved the card animations!", c: "from-gold to-magenta" },
  ];

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative pt-24">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
          <Img src="/images/hero-temple.jpg" alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07040f]/60 via-[#07040f]/30 to-[#07040f]" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 lg:grid-cols-[1fr_1.3fr_0.85fr]">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="font-display text-5xl font-bold leading-[0.95] sm:text-6xl xl:text-7xl">
              Discover<br /><span className="text-gradient-gold">Your Path</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 text-lg text-white/85">
              Let the Cards Reveal Insights for Love, Career, Health and Life.
            </motion.p>
            <div className="mt-6 flex justify-center gap-6 lg:justify-start">
              {areas.map(({ I, l }, i) => (
                <motion.div key={l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex flex-col items-center gap-1.5 text-xs text-white/80">
                  <I className="h-7 w-7 text-gold" strokeWidth={1.4} />{l}
                </motion.div>
              ))}
            </div>
            <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="relative mx-auto mt-7 max-w-sm rounded-xl border border-gold/50 bg-black/40 px-6 py-4 text-center text-sm italic text-white/85 backdrop-blur-sm lg:mx-0">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0d0620] px-2 text-gold">❦</span>
              “The Universe has a message for you. Pick the cards and discover it.”
            </motion.blockquote>
          </div>

          <div className="order-1 lg:order-2">
            <CardOrbit fast={fast} />
            <div className="mt-1 flex flex-col items-center">
              <motion.button onClick={spin} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} aria-label="Check your prediction now"
                className="relative inline-flex items-center gap-2 rounded-full border-2 border-gold/80 bg-gradient-to-b from-[#3b1f78] to-[#1c0c3d] px-8 py-3 font-display text-xl text-white shadow-[0_0_35px_rgba(155,107,255,0.7),inset_0_0_20px_rgba(232,194,106,0.25)]">
                <Sparkles className={`h-5 w-5 text-gold ${fast ? "animate-spin" : ""}`} />{fast ? "Shuffling…" : "Check Prediction For Me"}
                <span className="absolute inset-0 -z-10 rounded-full bg-violet/40 blur-xl animate-pulse-glow" />
              </motion.button>
            </div>
          </div>

          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="order-3 mx-auto w-full max-w-xs rounded-xl border border-gold/60 bg-black/50 p-6 backdrop-blur-md">
            <h2 className="text-center font-display text-2xl leading-tight text-gold-soft">Accurate<br />Tarot Readings</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              {["Get personalized insights", "Simple & easy process", "3 free readings every day", "Complete 78-card deck"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" />{t}</li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <ArcCarousel />

        <div className="flex flex-col items-center pb-14 pt-2">
          <div className="flex items-center gap-5">
            <span className="text-gold">✦</span>
            <motion.button onClick={spin} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} aria-label="Check your prediction now"
              className="relative inline-flex items-center gap-3 rounded-full border-2 border-gold/80 bg-gradient-to-b from-[#3b1f78] to-[#1c0c3d] px-10 py-4 font-display text-2xl text-white shadow-[0_0_35px_rgba(155,107,255,0.7),inset_0_0_20px_rgba(232,194,106,0.25)]">
              <Sparkles className={`h-6 w-6 text-gold ${fast ? "animate-spin" : ""}`} />{fast ? "Shuffling…" : "Check Prediction For Me"}
              <span className="absolute inset-0 -z-10 rounded-full bg-violet/40 blur-xl animate-pulse-glow" />
            </motion.button>
            <span className="text-gold">✦</span>
          </div>
          <p className="mt-3 text-sm text-white/70">Tap to reveal your 5-card prediction</p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14">
        <Reveal className="flex items-center gap-3"><h2 className="font-display text-3xl text-gold-soft sm:text-4xl">How It Works?</h2><span className="text-gold">✦</span><span className="h-px w-32 bg-gradient-to-r from-gold to-transparent" /></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="flex h-full flex-col items-center border-white/10 px-4 py-4 text-center lg:border-r lg:last:border-r-0">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }} className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/5">
                  <I className="h-8 w-8 text-gold" strokeWidth={1.3} />
                </motion.div>
                <div className="mt-4 flex items-start gap-3 text-left">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-b from-gold-soft to-gold font-display text-lg font-bold text-ink">{i + 1}</span>
                  <div><p className="text-lg font-medium">{t}</p><p className="text-sm text-white/65">{d}</p></div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8">
          <div className="relative grid gap-5 overflow-hidden rounded-3xl border border-white/10 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <Img src="/images/insights-bg.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-[#07040f]/55" />
            {feats.map(({ I, t, d }) => (
              <div key={t} className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-violet/60 bg-violet/15 shadow-[0_0_20px_rgba(155,107,255,0.4)]"><I className="h-6 w-6 text-violet-200" strokeWidth={1.4} /></span>
                <div><p className="font-medium text-gold-soft">{t}</p><p className="text-sm text-white/65">{d}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= INSIGHTS ================= */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="absolute -inset-x-4 inset-y-0 -z-20 overflow-hidden rounded-[2.5rem] sm:-inset-x-10">
          <Img src="/images/insights-bg.jpg" alt="" className="h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07040f]/70 via-[#07040f]/35 to-[#07040f]/80" />
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 rounded-t-[50%] bg-gradient-to-b from-[#2b1154]/70 to-transparent blur-2xl" />
        <div className="flex items-end justify-center gap-2 sm:gap-3" style={{ perspective: 900 }}>
          {insightCards.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, rotateY: 180, y: 40 }} whileInView={{ opacity: 1, rotateY: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -16, rotateZ: 0, scale: 1.06 }} style={{ rotateZ: (i - 2) * 3 }}
              className="h-[150px] w-[88px] overflow-hidden rounded-lg border-2 border-gold/70 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(232,194,106,0.3)] sm:h-[230px] sm:w-[134px]">
              <Img src={c.image} alt={c.name} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <Reveal>
          <h2 className="font-display text-4xl text-gold-soft">Get Meaningful Insights</h2>
          <p className="mt-2 text-white/75">Each card has a unique message for you. Discover what the universe wants you to know.</p>
          <ul className="mt-6 space-y-5">
            {insights.map(({ I, t, d }) => (
              <li key={t} className="flex items-start gap-4"><I className="mt-0.5 h-7 w-7 shrink-0 text-gold" strokeWidth={1.3} /><div><p className="text-lg">{t}</p><p className="text-sm text-white/60">{d}</p></div></li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><Divider title="What People Say" /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6 }} className="flex h-full gap-4 rounded-2xl border border-gold/30 bg-black/40 p-5 backdrop-blur-md">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br ${r.c} font-display text-xl font-bold text-white`}>{r.n[0]}</span>
                <div>
                  <p className="text-gold">★★★★★</p>
                  <p className="mt-1 text-sm text-white/85">“{r.q}”</p>
                  <p className="mt-2 text-sm text-gold-soft">{r.n}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative mt-8 overflow-hidden">
        <Img src="/images/cta-night.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#07040f] via-[#07040f]/30 to-[#07040f]/70" />
        <Reveal className="flex flex-col items-center px-5 py-28 text-center">
          <h2 className="font-display text-4xl text-gold-soft sm:text-5xl">Ready to See What&apos;s Next?</h2>
          <p className="mt-3 text-lg text-white/85">Spin the cards and let the universe guide you.</p>
          <Link href="/reading" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-gold-soft to-gold px-8 py-3.5 font-semibold text-ink shadow-[0_0_35px_rgba(232,194,106,0.6)] transition hover:scale-105">
            Start Your Free Reading <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-sm text-white/75">3 Free Readings Every Day</p>
        </Reveal>
      </section>
    </div>
  );
}
