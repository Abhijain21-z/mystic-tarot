import type { Metadata } from "next";
import Link from "next/link";
import { ZODIAC } from "@/data/seo";
import { deckById, cardUrl } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: { absolute: "Tarot Cards by Zodiac Sign — What Card Is Your Sign?" },
  description: "Which tarot card is your zodiac sign? Aries to Pisces mapped to the Major Arcana, with dates, one-line readings and links to every full card meaning.",
  keywords: ["what tarot card is my zodiac sign", "tarot cards by zodiac sign", "aries tarot card", "scorpio tarot card", "zodiac sign tarot list"],
  alternates: { canonical: "/zodiac" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-4xl px-6 pt-28">
      <JsonLd data={faqSchema([{ q: "What tarot card is my zodiac sign?", a: "Aries pairs with The Emperor, Taurus with The Hierophant, Gemini with The Lovers, Cancer with The Chariot, Leo with Strength, Virgo with The Hermit, Libra with Justice, Scorpio with Death, Sagittarius with Temperance, Capricorn with The Devil, Aquarius with The Star and Pisces with The Moon." },
      { q: "Can I pull my zodiac card as a daily draw?", a: "Yes — the sign-card makes a gentle 'birthday energy' pull. Use it as thematic guidance rather than a prediction, and see each card's page for its yes/no and love verdicts." }])} />
      <h1 className="text-center font-display text-5xl">Tarot Cards by <span className="text-gradient-gold">Zodiac Sign</span></h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">The classic correspondence between the 12 signs and the Major Arcana — tap your sign for the full card meaning, yes/no verdict and love reading.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ZODIAC.map((z) => {
          const card = deckById[z.cardId];
          return (
            <Link key={z.sign} href={`/zodiac/${z.sign.toLowerCase()}`} className="glass group flex items-center gap-4 rounded-3xl p-4 transition hover:border-gold/50">
              <img src={card.image} alt={`${z.sign} tarot card`} width={72} height={108} loading="lazy" className="w-16 rounded-lg border border-gold/30" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gold/70">{z.sign} · {z.dates}</p>
                <p className="font-display text-2xl text-gold-soft">{card.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-white/60">{z.line}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-10 text-center text-sm text-white/60">Prefer your own cards over your sign? Try the <Link href="/reading" className="text-gold hover:underline">free 5-card reading</Link> or the <Link href="/quiz" className="text-gold hover:underline">birthday calculator</Link>.</p>
    </article>
  );
}
