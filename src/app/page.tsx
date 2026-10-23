import type { Metadata } from "next";
import Link from "next/link";
import MysticHome from "@/components/home/MysticHome";
import { Pricing, Disclaimer } from "@/components/home/Sections";
import MysticPersonaSection from "@/components/MysticPersona";
import { JsonLd, faqSchema } from "@/components/seo/Seo";
import { ZODIAC } from "@/data/seo";

export const metadata: Metadata = {
  title: { absolute: "MysticTarot — Free Tarot Card Reading | Discover What the Cards Reveal" },
  description: "Best online tarot card reading: pick 5 cards from the full 78-card Rider–Waite deck and get love, career & money insights. 3 free readings every day.",
  alternates: { canonical: "/" },
};

const HOME_FAQS = [
  { q: "What is the best free tarot card reading online?", a: "MysticTarot gives a full 5-card spread — Past, Present, Hidden, Advice, Outcome — from the complete 78-card Rider–Waite deck, free 3 times every day, no card details required." },
  { q: "How accurate is an online tarot card reading?", a: "A reading is accurate when it reflects things you already half-know. Ours grounds every card in position and orientation, so the interpretation stays specific — never just fate theatre." },
  { q: "Can I get a tarot reading near me without visiting a reader?", a: "Yes — MysticTarot is fully online: an instant 5-card reading from any city, on demand, private, cheaper than an in-person session." },
  { q: "Can tarot cards answer yes or no questions?", a: "They can: our free Yes/No tool deals one card with an upright/reversed verdict and the reason behind it." },
  { q: "What tarot card matches my zodiac sign?", a: "Aries pairs with The Emperor through Pisces with The Moon — see the zodiac guide or enter your birthday in the calculator for both your sign card and a personal-year card." },
];

export default function Home() {
  return (
    <>
      <MysticHome />
      <Pricing />
      <section className="relative mx-auto max-w-4xl px-6 py-16" id="reader">
        <h2 className="mb-8 text-center font-display text-3xl text-gold-soft sm:text-4xl">Meet the <span className="text-gradient-gold italic">Reader</span></h2>
        <MysticPersonaSection />
      </section>
      <section className="relative mx-auto max-w-4xl px-6 pb-8" id="explore">
        <JsonLd data={faqSchema(HOME_FAQS)} />
        <h2 className="text-center font-display text-4xl sm:text-5xl text-gold-soft">Explore the <span className="text-gradient-gold italic">Tarot Temple</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/yes-or-no", t: "Yes / No Tarot", d: "One card, one verdict, free forever." },
            { href: "/quiz", t: "What Tarot Card Am I?", d: "Birthday → your zodiac & personal-year card." },
            { href: "/meanings", t: "All 78 Card Meanings A–Z", d: "Upright, reversed, love, career, money." },
            { href: "/tarot-reading-near-me", t: "Reading Near Me", d: "35 cities, online in the same minute." },
            { href: "/faq", t: "Tarot Questions & Answers", d: "Evil? Real? Accurate? All asked, answered." },
            { href: "/blog", t: "The Tarot Journal", d: `Guides from ${["faith", "cost", "comparisons", "how-to"].join(", ")} and beyond.` },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="glass group rounded-3xl p-6 transition hover:border-gold/50">
              <p className="font-display text-2xl text-gold-soft group-hover:text-gold">{x.t}</p>
              <p className="mt-2 text-sm text-white/65">{x.d}</p>
            </Link>
          ))}
        </div>
        <h3 className="mt-12 text-center font-display text-2xl text-gold-soft">Arriving at the temple soon</h3>
        <p className="mt-2 text-center text-sm text-white/50">The locked decks reveal themselves soon — only the patient feel the pull first.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Osho Zen Tarot", d: "Present-moment cards drawn from the Zen tradition.", e: "🌿" },
            { t: "Angel Tarot", d: "Gentle, guardian-guided spreads for the heart.", e: "👼" },
            { t: "Egyptian Tarot", d: "Ancient Nile symbolism meets the 78-card deck.", e: "𓂀" },
          ].map((x) => (
            <div key={x.t} className="glass relative rounded-3xl p-6 text-center opacity-80 transition hover:border-gold/40">
              <span aria-hidden className="absolute right-4 top-4 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold-soft">🔒 Coming soon</span>
              <p aria-hidden className="text-3xl">{x.e}</p>
              <p className="mt-2 font-display text-xl text-gold-soft">{x.t}</p>
              <p className="mt-1.5 text-sm text-white/55">{x.d}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-12 text-center font-display text-2xl text-gold-soft">Tarot by zodiac sign</h3>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {ZODIAC.map((z) => <Link key={z.sign} href={`/zodiac/${z.sign.toLowerCase()}`} className="glass rounded-full px-4 py-1.5 text-sm text-white/70 hover:text-gold">{z.sign}</Link>)}
        </div>
      </section>
      <section className="relative mx-auto max-w-3xl px-6 pb-8">
        <h2 className="text-center font-display text-3xl text-gold-soft">People also ask</h2>
        <div className="mt-6 space-y-3">
          {HOME_FAQS.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer font-display text-lg text-gold-soft">{f.q}</summary>
              <p className="mt-3 text-sm text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
