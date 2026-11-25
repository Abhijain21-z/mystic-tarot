import type { Metadata } from "next";
import Link from "next/link";
import MysticHome from "@/components/home/MysticHome";
import { Pricing, Disclaimer } from "@/components/home/Sections";
import MysticPersonaSection from "@/components/MysticPersona";
import { JsonLd, faqSchema } from "@/components/seo/Seo";
import { ZODIAC } from "@/data/seo";

export const metadata: Metadata = {
  title: { absolute: "Free Tarot Card Reading for Love, Career & Money — MysticTarot" },
  description: "Free tarot card reading online for love, career, money, family and emotions. Full 10-card deep spread from the 78-card Rider–Waite deck — no signup, unlimited, every day. Optional $1 PDF report.",
  keywords: ["free tarot card reading", "free tarot reading online", "tarot reading for love", "career tarot reading", "money tarot reading", "yes or no tarot", "3 card tarot spread", "tarot card meanings", "tarot reading no signup", "what is my tarot card"],
  alternates: { canonical: "/" },
};

const HOME_FAQS = [
  { q: "What is the best free tarot card reading online?", a: "MysticTarot gives a full 10-card deep spread — Past, Present, Hidden, Advice, Outcome plus five deep positions — from the complete 78-card Rider–Waite deck, free and unlimited, no card details required." },
  { q: "How accurate is an online tarot card reading?", a: "A reading is accurate when it reflects things you already half-know. Ours grounds every card in position and orientation, so the interpretation stays specific — never just fate theatre." },
  { q: "Can I get a tarot reading near me without visiting a reader?", a: "Yes — MysticTarot is fully online: an instant 10-card reading from any city, on demand, private, cheaper than an in-person session." },
  { q: "Can tarot cards answer yes or no questions?", a: "They can: our free Yes/No tool deals one card with an upright/reversed verdict and the reason behind it." },
  { q: "What tarot card matches my zodiac sign?", a: "Aries pairs with The Emperor through Pisces with The Moon — see the zodiac guide or enter your birthday in the calculator for both your sign card and a personal-year card." },
  { q: "Where can I get a free tarot reading online with no signup?", a: "Right here — guests get the full 10-card deep spread instantly, with every card's upright and reversed meaning, and no registration. An account is only needed to save history or download the $1 PDF report." },
  { q: "What is a love tarot reading?", a: "A love reading puts your relationship question into positions — how each person feels, what sits between you, what to do next and where the bond is heading. It maps the dynamic; it does not name a person or a wedding date." },
  { q: "Can tarot help with a career or job decision?", a: "Yes, as structured reflection. A career spread separates what keeps you in a role, what pulls you away, the hidden factor and your best next move — without pretending to know an employer's private decision." },
  { q: "Can tarot give me guidance about money?", a: "It can reveal patterns in how you earn, spend and avoid money, especially through the Pentacles cards. It cannot predict markets or replace a financial professional." },
  { q: "What is a 3-card tarot spread?", a: "Three cards drawn for Past, Present and Future offer a quick timeline for one question. Future means the path if nothing changes — so the reading is a chance to adjust, not a fixed forecast." },
  { q: "Will my ex come back according to tarot?", a: "Tarot cannot make someone return or name the day they will text. It can show the current momentum, what remains unresolved and what a return would require — so you can decide what is actually worth doing." },
  { q: "What is my tarot card for today?", a: "Your card for today is the single card you draw when you ask 'what deserves my attention today?' It is a daily check-in, not an identity label — use the birthday quiz for your zodiac and numerology cards." },
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
            { href: "/blog", t: "The Tarot Journal", d: "Guides on love, career, money, spreads, faith, cost and more." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="glass group rounded-3xl p-6 transition hover:border-gold/50">
              <p className="font-display text-2xl text-gold-soft group-hover:text-gold">{x.t}</p>
              <p className="mt-2 text-sm text-white/65">{x.d}</p>
            </Link>
          ))}
        </div>
        <h3 className="mt-12 text-center font-display text-2xl text-gold-soft">Popular tarot searches</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/60">Start with the question on your mind — every reading below is free and unlimited, with full card meanings one click away.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {[
            { href: "/reading", t: "Free tarot card reading online" },
            { href: "/blog/free-love-tarot-reading-online", t: "Love tarot reading" },
            { href: "/blog/will-my-ex-come-back-tarot", t: "Will my ex come back" },
            { href: "/blog/free-career-tarot-reading", t: "Career tarot reading" },
            { href: "/blog/tarot-reading-for-money-finance", t: "Money tarot reading" },
            { href: "/blog/3-card-tarot-spread-past-present-future", t: "3-card tarot spread" },
            { href: "/yes-or-no", t: "Yes or no tarot" },
            { href: "/quiz", t: "What tarot card am I" },
            { href: "/meanings", t: "Tarot card meanings" },
            { href: "/blog/tarot-reading-no-signup", t: "Tarot without signup" },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="glass rounded-full px-4 py-1.5 text-sm text-white/70 hover:text-gold">{x.t}</Link>
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
