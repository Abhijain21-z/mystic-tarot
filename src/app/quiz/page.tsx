import type { Metadata } from "next";
import Link from "next/link";
import BirthdayQuiz from "@/components/seo/BirthdayQuiz";
import { JsonLd, faqSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: { absolute: "What Tarot Card Am I? — Free Birthday Quiz & Zodiac Finder" },
  description: "What tarot card represents you? Enter your birthday to get your zodiac sign's tarot card plus your personal-year Major card — free, instant, no signup.",
  keywords: ["what tarot card am i", "what tarot card am i quiz", "tarot card birthday calculator", "tarot card represents me", "what tarot card is my zodiac sign"],
  alternates: { canonical: "/quiz" },
};

const QUIZ_FAQS: { q: string; a: string }[] = [
  { q: "How does the birthday quiz work?", a: "It pairs a classic 12-sign zodiac correspondence (Aries→Emperor, Pisces→Moon) with a personal-year card derived from your birthday digits — two lenses, one scary-accurate mirror." },
  { q: "Is this the same as astrology?", a: "Not quite — it borrows the calendar, not your chart. The card describes symbolic energy, not planetary positions." },
  { q: "What tarot card represents me?", a: "Most traditions pair your sun sign with a Major Arcana card; your personal-year card rotates the emphasis yearly. Both shown here, free." },
];

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={faqSchema(QUIZ_FAQS)} />
      <h1 className="text-center font-display text-5xl">What Tarot Card <span className="text-gradient-gold">Am I?</span></h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">Your birthday maps to your zodiac sign's Major Arcana card — and a personal-year card. Free, instant, nothing to sign up for.</p>
      <div className="mt-10"><BirthdayQuiz /></div>
      <section className="mx-auto mt-10 max-w-2xl">
        <h2 className="mb-4 font-display text-3xl text-gold-soft">Quick answers</h2>
        <div className="space-y-3">
          {QUIZ_FAQS.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer font-display text-lg text-gold-soft">{f.q}</summary>
              <p className="mt-3 text-sm text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-white/60">Explore all 12 sign pages in the <Link href="/zodiac" className="text-gold hover:underline">zodiac → card guide</Link>, or jump into a <Link href="/reading" className="text-gold hover:underline">free reading</Link>.</p>
      </section>
    </article>
  );
}
