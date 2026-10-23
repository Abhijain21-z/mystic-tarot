import { Moon } from "lucide-react";

const BLURB =
  "Mystic Aarya is MysticTarot's virtual reader — a devoted guide of the cards who has spent years studying the Rider–Waite symbol language. Aarya walks with you through every spread, reading each position with patience, honesty and a little cosmic mischief.";

/** Stylized mystic avatar — pure CSS, no fake photo. */
function Avatar({ size = "md" }: { size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-24 w-24 text-4xl" : "h-16 w-16 text-2xl";
  return (
    <div className={`${dim} relative grid shrink-0 place-items-center rounded-full
      bg-[radial-gradient(circle_at_35%_30%,#a78bfa_0%,#7c3aed_35%,#2e1065_70%,#12032e_100%)]
      ring-2 ring-gold/70 shadow-[0_0_50px_-6px_rgba(232,194,106,0.75)]`}>
      <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_75%,rgba(224,79,180,0.55),transparent_55%)]" />
      <span className="relative font-display text-gold-soft drop-shadow-[0_0_8px_rgba(232,194,106,0.9)]">MA</span>
      <span aria-hidden className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-ink ring-1 ring-gold/60">
        <Moon className="h-3.5 w-3.5 text-gold" />
      </span>
      <span aria-hidden className="absolute -left-2 bottom-1 animate-pulse text-sm text-gold">✦</span>
    </div>
  );
}

/** Persona card for the reading result screen (compact, row layout). */
export function MysticReader({ atTop = false }: { atTop?: boolean }) {
  return (
    <div className={`glass mx-auto flex max-w-2xl items-center gap-4 rounded-3xl p-4 ${atTop ? "" : "mt-8"}`}>
      <Avatar />
      <div className="min-w-0">
        <p className="font-display text-xl leading-tight text-gold-soft">Mystic Aarya</p>
        <p className="text-xs uppercase tracking-widest text-white/45">Virtual Tarot Reader</p>
        <p className="mt-1.5 text-sm text-white/70">
          &ldquo;I read your cards the old way — position by position, symbol by symbol. Whatever you find here, carry it as reflection, not fate.&rdquo;
        </p>
      </div>
    </div>
  );
}

/** Full persona section for the homepage. */
export default function MysticPersonaSection() {
  return (
    <div className="glass rounded-3xl p-7 sm:p-9">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Avatar size="lg" />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Meet Your Reader</p>
          <h3 className="mt-1 font-display text-4xl text-gold-soft">Mystic <span className="text-gradient-gold italic">Aarya</span></h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{BLURB}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs sm:justify-start">
        {["Rider–Waite scholar", "Hand-reads every position", "Myths, moods & meaning", "Zero judgement"].map((t) => (
          <span key={t} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-gold-soft">{t}</span>
        ))}
      </div>
    </div>
  );
}
