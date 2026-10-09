"use client";
import { useEffect, useRef } from "react";
import { useApp } from "./Providers";

/** Canvas parallax starfield with drifting glowing particles (60fps, pauses when hidden). */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { reduced } = useApp();
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, scrollY = window.scrollY, mx = 0, my = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["255,244,210", "200,160,255", "150,190,255", "240,140,210"];
    type S = { x: number; y: number; z: number; r: number; c: string; tw: number };
    let stars: S[] = [];
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(260, Math.floor((w * h) / 6000));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1, r: Math.random() * 1.4 + 0.2, c: colors[(Math.random() * colors.length) | 0], tw: Math.random() * 6.28 }));
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e: PointerEvent) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; };
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const px = (s.x + mx * 30 * s.z + t * 4 * s.z) % w;
        let py = (s.y - scrollY * 0.15 * s.z + my * 30 * s.z) % h; if (py < 0) py += h;
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.tw + t * (0.6 + s.z)));
        ctx.beginPath(); ctx.fillStyle = `rgba(${s.c},${a * s.z})`;
        ctx.arc(px, py, s.r * (0.6 + s.z), 0, 6.283); ctx.fill();
        if (s.r > 1.3) { ctx.fillStyle = `rgba(${s.c},${a * 0.12})`; ctx.beginPath(); ctx.arc(px, py, s.r * 5, 0, 6.283); ctx.fill(); }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onMove); };
  }, [reduced]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
