"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, animate } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { TAROT_DECK } from "@/data/tarot";
import { CARD_BACK_SRC } from "../TarotCardFace";

const N = TAROT_DECK.length; // 78
const STEP = 360 / N;
const mod = (n: number, m: number) => ((n % m) + m) % m;
const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

/**
 * Premium interactive 3D tarot carousel.
 * Drag / swipe / mouse-wheel to rotate the wheel of 78 face-down cards.
 * Inertia + snap-to-card. Active card glows; selected cards get gold glow + lift.
 */
export default function CardWheel({ picked, onPick, revealMode, revealed, faces }: {
  picked: number[];
  onPick: (i: number) => void;
  /** when true, picked cards flip to reveal their real artwork */
  revealMode?: boolean;
  /** how many picked cards have flipped so far */
  revealed?: number;
  /** real card images keyed by wheel index (for the reveal flip) */
  faces?: Record<number, { image: string; name: string }>;
}) {
  const rot = useMotionValue(0);
  const vel = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const activeRef = useRef(0);
  const snapAnim = useRef<ReturnType<typeof animate> | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [geom, setGeom] = useState({ radius: 560, cw: 110, ch: 184 });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 480) setGeom({ radius: 300, cw: 66, ch: 110 });
      else if (w < 768) setGeom({ radius: 400, cw: 84, ch: 140 });
      else if (w < 1280) setGeom({ radius: 520, cw: 100, ch: 167 });
      else setGeom({ radius: 620, cw: 112, ch: 187 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stopSnap = () => { snapAnim.current?.stop(); snapAnim.current = null; };
  const snap = () => {
    stopSnap();
    const target = Math.round(rot.get() / STEP) * STEP;
    snapAnim.current = animate(rot, target, { type: "spring", stiffness: 55, damping: 15 });
  };
  const nudge = (dir: 1 | -1) => {
    stopSnap(); vel.current = 0;
    const target = (Math.round(rot.get() / STEP) + dir) * STEP;
    snapAnim.current = animate(rot, target, { type: "spring", stiffness: 55, damping: 15 });
  };

  /* inertia + active-card tracking */
  useAnimationFrame(() => {
    if (!dragging.current && Math.abs(vel.current) > 0.03) {
      rot.set(rot.get() + vel.current);
      vel.current *= 0.94;
      if (Math.abs(vel.current) <= 0.03) { vel.current = 0; snap(); }
    }
    const a = mod(Math.round(-rot.get() / STEP), N);
    if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
  });

  /* non-passive wheel listener so page doesn't scroll while rotating */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopSnap(); vel.current = 0;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      rot.set(rot.get() - d * 0.08);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(snap, 220);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true; stopSnap(); vel.current = 0;
    lastX.current = e.clientX; lastT.current = performance.now();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = Math.max(now - lastT.current, 1);
    const delta = dx * 0.22;
    rot.set(rot.get() + delta);
    vel.current = (delta / dt) * 14;
    lastX.current = e.clientX; lastT.current = now;
  };
  const endDrag = () => { dragging.current = false; if (Math.abs(vel.current) <= 0.03) snap(); };

  const { radius, cw, ch } = geom;

  return (
    <div className="relative w-full select-none">
      {/* side arrows */}
      <button onClick={() => nudge(1)} aria-label="Rotate wheel left"
        className="absolute left-1 top-[42%] z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-black/50 text-gold backdrop-blur-sm transition hover:scale-110 hover:bg-gold hover:text-ink sm:left-4 sm:h-14 sm:w-14">
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button onClick={() => nudge(-1)} aria-label="Rotate wheel right"
        className="absolute right-1 top-[42%] z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-black/50 text-gold backdrop-blur-sm transition hover:scale-110 hover:bg-gold hover:text-ink sm:right-4 sm:h-14 sm:w-14">
        <ChevronRight className="h-7 w-7" />
      </button>

      <div ref={wrapRef} role="application" aria-label="Tarot card wheel. Drag, swipe or use mouse wheel to rotate."
        className="relative mx-auto h-[340px] w-full cursor-grab active:cursor-grabbing sm:h-[420px] lg:h-[460px]"
        style={{ perspective: 1500, touchAction: "pan-y" }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}>

        {/* mystical glowing center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(155,107,255,0.4),rgba(224,79,180,0.12)_45%,transparent_70%)] blur-xl animate-pulse-glow sm:h-[380px] sm:w-[380px]" />
          {/* concentric astrological rings */}
          <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25 animate-spin-slow sm:h-[320px] sm:w-[320px]">
            {ZODIAC.map((z, i) => (
              <span key={z} className="absolute left-1/2 top-1/2 -ml-2 -mt-3 text-sm text-gold/60 sm:text-base"
                style={{ transform: `rotate(${i * 30}deg) translateY(-160px) rotate(-${i * 30}deg)` }}>{z}</span>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet/40 animate-spin-rev sm:h-[220px] sm:w-[220px]" />
          {/* sun-moon emblem core */}
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-gold/70 shadow-[0_0_60px_rgba(232,194,106,0.8),inset_0_0_25px_rgba(232,194,106,0.5)] sm:h-48 sm:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/wheel-center-sunmoon.jpg" alt="" draggable={false} className="h-full w-full scale-110 object-cover" />
          </div>
        </div>

        {/* center scroll / swipe hint pill */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-center" aria-hidden>
          <div className="mx-auto flex w-32 flex-col items-center gap-1 rounded-2xl border border-gold/40 bg-black/55 px-3 py-2.5 backdrop-blur-sm sm:w-40">
            <span className="flex items-center gap-2 text-lg text-gold">←<Hand className="h-6 w-6 animate-float" />→</span>
            <p className="text-xs font-semibold text-white/90 sm:text-sm">Scroll or Swipe</p>
            <p className="text-[10px] text-white/60 sm:text-xs">to rotate the cards</p>
          </div>
        </div>

        {/* the 3D ring of cards */}
        <motion.div className="absolute inset-0" style={{ rotateY: rot, transformStyle: "preserve-3d" }}>
          {TAROT_DECK.map((c, i) => {
            const selIdx = picked.indexOf(i);
            const isSel = selIdx !== -1;
            const isActive = i === active;
            const flip = revealMode && isSel && (revealed ?? 0) > selIdx;
            const face = faces?.[i];
            return (
              <button key={c.id} type="button" onClick={() => onPick(i)} aria-pressed={isSel}
                aria-label={isSel ? `Card ${i + 1}, selected` : `Select card ${i + 1}`}
                className="absolute left-1/2 top-1/2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                style={{
                  width: cw, height: ch, marginLeft: -cw / 2, marginTop: -ch / 2,
                  transform: `rotateY(${i * STEP}deg) translateZ(${radius + (isSel ? 46 : 0)}px)${isSel ? " scale(1.06)" : ""}`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.35s ease",
                  zIndex: isActive ? 30 : isSel ? 20 : 1,
                }}>
                <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.8s cubic-bezier(0.3,0.7,0.2,1)", transform: flip ? "rotateY(180deg)" : "none" }}>
                  {/* card back */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CARD_BACK_SRC} alt="" draggable={false}
                    className={`absolute inset-0 h-full w-full rounded-lg border object-cover transition-shadow duration-300 ${
                      isSel
                        ? "border-gold shadow-[0_0_35px_rgba(232,194,106,0.95),0_0_70px_rgba(155,107,255,0.5)]"
                        : isActive
                          ? "border-gold/80 shadow-[0_0_25px_rgba(155,107,255,0.8)]"
                          : "border-gold/30 shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
                    }`}
                    style={{ backfaceVisibility: "hidden" }} />
                  {/* revealed face */}
                  {face && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={face.image} alt={face.name} draggable={false}
                      className="absolute inset-0 h-full w-full rounded-lg border-2 border-gold object-cover shadow-[0_0_40px_rgba(232,194,106,0.9)]"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} />
                  )}
                  {isSel && (
                    <span className="absolute -right-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-b from-gold-soft to-gold text-ink shadow-[0_0_15px_rgba(232,194,106,0.9)]">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* hint */}
        <p className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs text-white/50 sm:text-sm">
          <Hand className="h-4 w-4 text-gold" /> Drag, swipe or scroll to rotate the wheel
        </p>
      </div>
    </div>
  );
}
