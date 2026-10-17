import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ZODIAC } from "@/data/seo";
import { deckById, cardUrl, yesNo } from "@/lib/seo";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/seo/Seo";

export function generateStaticParams() {
  return ZODIAC.map((z) => ({ sign: z.sign.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }): Promise<Metadata> {
  const { sign } = await params;
  const z = ZODIAC.find((x) => x.sign.toLowerCase() === sign.toLowerCase());
  if (!z) return { title: "Sign not found" };
  const card = deckById[z.cardId];
  return {
    title: { absolute: `What Tarot Card Is ${z.sign}? ${card.name} — Meaning & Yes/No` },
    description: `${z.sign} dates ${z.dates}: your tarot card is ${card.name}. Meaning, love reading and yes-or-no energy of the ${card.name.replace(/^The /, "")} for ${z.sign}.`,
    keywords: [`what tarot card is ${z.sign.toLowerCase()}`, `${z.sign.toLowerCase()} tarot card`, `${z.sign.toLowerCase()} tarot card meaning`],
    alternates: { canonical: `/zodiac/${sign.toLowerCase()}` },
  };
}

export default async function ZodiacPage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const z = ZODIAC.find((x) => x.sign.toLowerCase() === sign.toLowerCase());
  if (!z) notFound();
  const card = deckById[z.cardId];
  const spoken = card.name.replace(/^The /, "");
  const faqs: { q: string; a: string }[] = [
    { q: `What is the ${z.sign} tarot card?`, a: `The ${z.sign} tarot card is the ${card.name} — ${z.dates}. ${z.line}` },
    { q: `${card.name} yes or no as ${z.sign} energy?`, a: `Upright, the ${spoken} reads ${yesNo(card, false).toUpperCase()} for yes/no pulls, and ${yesNo(card, true).toUpperCase()} reversed. ${card.advice}` },
    { q: `Which element rules ${z.sign}?`, a: `${card.suit === "Major Arcana" ? "It is a Major Arcana card — a life-theme card" : card.suit}, and the sign's dates are ${z.dates}.` },
  ];
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Zodiac Tarot Cards", path: "/zodiac" }, { name: z.sign, path: `/zodiac/${z.sign.toLowerCase()}` }])} />
      <JsonLd data={faqSchema(faqs)} />
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/50"><Link href="/" className="hover:text-gold">Home</Link> › <Link href="/zodiac" className="hover:text-gold">Zodiac</Link> › <span className="text-gold/80">{z.sign}</span></nav>
      <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <img src={card.image} alt={`${z.sign} tarot card — ${card.name}`} width={140} height={210} loading="lazy" className="w-28 rounded-xl border-2 border-gold/50" />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl text-gold-soft">What Tarot Card Is {z.sign}?</h1>
          <p className="mt-1 text-white/60">{z.dates} · Major arcana correspondence</p>
          <p className="mt-3 max-w-xl text-white/75">{z.line}</p>
        </div>
      </header>
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">{spoken} upright for {z.sign}</h2><p className="mt-2 text-sm text-white/70">Drawn upright, {card.name} says: {card.upright}. {card.advice}</p></div>
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">{spoken} reversed for {z.sign}</h2><p className="mt-2 text-sm text-white/70">Reversed, the energy turns to {card.reversed} — a nudge to adjust rather than a verdict.</p></div>
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">Love & relationships</h2><p className="mt-2 text-sm text-white/70">{card.love}.</p></div>
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">Career & money</h2><p className="mt-2 text-sm text-white/70">{card.career}. Money-wise: {card.money}.</p></div>
      </section>
      <section className="mt-10"><h2 className="mb-4 font-display text-3xl text-gold-soft">FAQ — {z.sign} tarot questions</h2>
        {faqs.map((f) => <details key={f.q} className="glass mb-3 rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden"><summary className="cursor-pointer font-display text-lg text-gold-soft">{f.q}</summary><p className="mt-3 text-sm text-white/70">{f.a}</p></details>)}
      </section>
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
        <Link href={cardUrl(z.cardId)} className="btn-glow rounded-full px-6 py-2.5">Full {spoken} page →</Link>
        <Link href="/reading" className="btn-ghost rounded-full px-6 py-2.5">Free 5-card reading</Link>
      </div>
      <nav className="mt-8 flex justify-between text-sm text-white/60">
        <Link href="/zodiac" className="hover:text-gold">← All zodiac cards</Link>
        <Link href="/quiz" className="hover:text-gold">Birthday calculator →</Link>
      </nav>
    </article>
  );
}
