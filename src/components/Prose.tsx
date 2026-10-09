import type { ReactNode } from "react";
export default function Prose({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl">{title}</h1>
      <div className="glass mt-8 space-y-4 rounded-3xl p-8 leading-relaxed text-white/75 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-gold-soft">{children}</div>
    </div>
  );
}
