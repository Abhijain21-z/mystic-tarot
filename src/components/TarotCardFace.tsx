"use client";
import { useState } from "react";

/** Public-domain RWS image with lazy loading and an original fallback face if the image fails. */
export function TarotImage({ src, name, reversed, className = "" }: { src: string; name: string; reversed?: boolean; className?: string }) {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-[#2a1450] to-[#0e0520] ${className}`}>
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${name}${reversed ? " (reversed)" : ""} tarot card`} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={() => setErr(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${reversed ? "rotate-180" : ""}`} />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-gold/50 p-3 text-center">
          <span className="text-3xl text-gold">✦</span>
          <span className="font-display text-lg leading-tight text-gold-soft">{name}</span>
        </div>
      )}
      {!loaded && !err && <div className="absolute inset-0 animate-pulse bg-violet/10" />}
    </div>
  );
}

export const CARD_BACK_SRC = "/images/card-mystic-back.jpg";

export function CardBack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-gold/60 bg-[#150826] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CARD_BACK_SRC} alt="" aria-hidden draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <div className="animate-card-shimmer pointer-events-none absolute inset-0" />
    </div>
  );
}
