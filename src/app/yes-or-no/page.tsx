import type { Metadata } from "next";
import Link from "next/link";
import YesNoTool from "@/components/seo/YesNoTool";
import { yesNoList, yesNo, cardUrl, deckById } from "@/lib/seo";
import { ZODIAC } from "@/data/seo";
import { FaqBlock, JsonLd, faqSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: { absolute: "Tarot Yes or No — Free Online Yes/No Reading & Full 78-Card List" },
  description: "Free yes or no tarot reading: draw one card from the full 78-card deck for a quick verdict, plus the complete yes/no list for every tarot card, upright and reversed.",
  keywords: ["tarot yes or no", "yes or no tarot", "tarot yes or no list", "free yes no tarot reading", "which tarot cards are yes or no"],
  alternates: { canonical: "/yes-or-no" },
};

const ZODIAC_FAQ_LINKS = ZODIAC.slice(0, 2);
const TOOL_FAQS: { q: string; a: string }[] = [
  { q: "Is a yes/no tarot reading free here?", a: "Yes — the single-card yes/no tool is completely free with no account required. Full 5-card readings are free 3 times a day, then $1 each." },
  { q: "How is the verdict calculated?", a: "Each card has an upright and reversed verdict from position-aware reading practice — Sun and Aces lean clear yes; most Swords lean no; Twos, Pages and the Moon say 'information needed first'." },
  { q: "Can I trust a one-card answer for big decisions?", a: "For big, layered decisions, a one-card verdict is a prompt, not a plan. Pair it with the 5-card reading (free twice, then $1) which shows Past, Present, Hidden, Advice and Outcome." },
  { q: "What should I ask yes/no tarot?", a: "One decision in one timeframe: 'Should I take Thursday's offer?' works. If the card feels contradictory, your question usually smuggled two questions — rewrite it and draw again after a pause." },
];

export default function Page() {
  const list = yesNoList();
  return (
    <article className="mx-auto max-w-4xl px-6 pt-28">
      <JsonLd data={faqSchema(TOOL_FAQS)} />
      <h1 className="text-center font-display text-5xl">Tarot Card <span className="text-gradient-gold">Yes or No</span></h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">One question, one card, one verdict. Upright and reversed meanings included — the honest answer behind the badge.</p>
      <div className="mt-10"><YesNoTool /></div>

      <section className="mx-auto mt-10 max-w-2xl">
        <FaqBlock faqs={TOOL_FAQS} />
      </section>

      <section className="mt-14">
        <h2 className="text-center font-display text-3xl text-gold-soft">The Full Yes/No List — All 78 Cards</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/55">Swords lean to honest 'no', Suns and Aces to yes, Pages and the Moon to 'maybe'. Tap a card for its full meaning.</p>
        <div className="mt-6 overflow-hidden rounded-2xl glass">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/40 text-xs uppercase tracking-wider text-gold/70"><tr><th className="px-4 py-2">Card</th><th>Upright</th><th>Reversed</th></tr></thead>
            <tbody>
              {list.map(({ card, up, rev }) => (
                <tr key={card.id} className="border-t border-white/5">
                  <td className="px-4 py-2"><Link href={cardUrl(card.id)} className="text-gold-soft hover:text-gold">{card.name}</Link></td>
                  <td className={`py-2 ${up === "yes" ? "text-emerald-400" : up === "no" ? "text-rose-400" : "text-gold-soft"}`}>{up}</td>
                  <td className={`py-2 ${rev === "yes" ? "text-emerald-400" : rev === "no" ? "text-rose-400" : "text-gold-soft"}`}>{rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-2xl text-sm text-white/60">
        <p>More tools: the <Link href="/quiz" className="text-gold hover:underline">"What tarot card am I" quiz</Link>, the full <Link href="/meanings" className="text-gold hover:underline">78-card meanings hub</Link>, or <Link href="/reading" className="text-gold hover:underline">a free 5-card reading</Link>.</p>
        <p className="mt-2">Zodiac curiosity: {ZODIAC_FAQ_LINKS.map((z, i) => <span key={z.sign}>{i > 0 ? " · " : ""}<Link href={`/zodiac/${z.sign.toLowerCase()}`} className="text-gold hover:underline">{z.sign} → {deckById[z.cardId].name}</Link></span>)}</p>
      </section>
    </article>
  );
}
