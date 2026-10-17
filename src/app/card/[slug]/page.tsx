import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TAROT_DECK, type TarotCard } from "@/data/tarot";
import { deckById, cardUrl, yesNo } from "@/lib/seo";
import { SITE, FAQS } from "@/data/seo";
import { JsonLd, FaqBlock, faqSchema, breadcrumbSchema } from "@/components/seo/Seo";

export function generateStaticParams() {
  return TAROT_DECK.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = deckById[slug];
  if (!card) return { title: "Card not found" };
  const spoken = card.name.replace(/^The /, "");
  return {
    title: { absolute: `${card.name} Tarot Card Meaning — Upright & Reversed (${card.suit})` },
    description: `${card.name} upright means ${card.upright}. Reversed: ${card.reversed}. Love, career & money meanings, plus yes-or-no guidance for the ${spoken}.`,
    keywords: [`${card.name.toLowerCase()} meaning`, `${card.name.toLowerCase()} tarot card`, `${spoken.toLowerCase()} upright`, `${spoken.toLowerCase()} reversed`],
    alternates: { canonical: cardUrl(card.id) },
  };
}

const VERDICT_STYLE: Record<string, string> = { yes: "text-emerald-400", no: "text-rose-400", maybe: "text-gold-soft" };

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = deckById[slug];
  if (!card) notFound();
  const spoken = card.name.replace(/^The /, "");
  const idx = TAROT_DECK.findIndex((c) => c.id === card.id);
  const prev = TAROT_DECK[(idx - 1 + TAROT_DECK.length) % TAROT_DECK.length];
  const next = TAROT_DECK[(idx + 1) % TAROT_DECK.length];
  const sameRank = TAROT_DECK.filter((c) => c.name.split(" ")[0] === card.name.split(" ")[0] && c.id !== card.id).slice(0, 3);
  const relatedFaqs = FAQS.slice(0, 4);
  const cardFaqs: { q: string; a: string }[] = [
    { q: `What does the ${spoken} mean upright?`, a: `The ${spoken} upright points to ${card.upright}. Keywords: ${card.keywords.join(", ")}.` },
    { q: `What does the ${spoken} reversed mean?`, a: `Reversed, the ${spoken} suggests ${card.reversed} — often a prompt to revisit the block rather than fear the card.` },
    { q: `${spoken} yes or no?`, a: verdictAnswer(card) },
  ];
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Card Meanings", path: "/meanings" },
        { name: card.name, path: cardUrl(card.id) },
      ])} />
      <JsonLd data={faqSchema([...cardFaqs, ...relatedFaqs], `${SITE.url}${cardUrl(card.id)}`)} />
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/50">
        <Link href="/" className="hover:text-gold">Home</Link> › <Link href="/meanings" className="hover:text-gold">Card Meanings</Link> › <span className="text-gold/80">{card.name}</span>
      </nav>
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <img src={card.image} alt={`${card.name} tarot card`} width={220} height={330} loading="lazy" className="w-40 shrink-0 rounded-xl border-2 border-gold/50 shadow-glow" />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl text-gold-soft">{card.name} Tarot Card Meaning</h1>
          <p className="mt-2 text-white/60">{card.suit === "Major Arcana" ? "Major Arcana" : `${card.suit} · ${card.name.split(" ")[0]}`} · numerically {card.number}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {card.keywords.map((k) => <span key={k} className="rounded-full bg-violet/20 px-3 py-1 text-xs text-violet-100">{k}</span>)}
          </div>
          <p className="mt-4 text-lg">Upright, the {spoken} signifies <b className="text-gold-soft">{card.upright}</b>.</p>
        </div>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <MeaningTile title="Upright meaning" body={`When the ${spoken} appears upright, it carries the message of ${card.upright}. This is the card flowing in its native direction — open the door it implies, and move with the energy rather than against it.`} icon="↑" />
        <MeaningTile title="Reversed meaning" body={`Reversed, the ${spoken} reads ${card.reversed}. A reversal is not a punishment: it usually marks the same energy turned inward or blocked, asking for adjustment before motion.`} icon="↓" />
        <MeaningTile title={`${spoken} in love`} body={`In love readings, the ${spoken} speaks to ${card.love}. ${card.advice.split(".")[0]}.`} icon="♥" />
        <MeaningTile title={`${spoken} in career`} body={`At work, the ${spoken} suggests ${card.career}. ${card.advice.split(".")[0]}.`} icon="▣" />
        <MeaningTile title={`${spoken} and money`} body={`Financially, the ${spoken} points to ${card.money}. Treat it as guidance about flow, not a forecast of figures.`} icon="$" />
        <MeaningTile title={`${spoken} spiritual meaning`} body={`On the inner journey, the ${spoken} reflects ${card.spiritual}. ${card.advice.split(".")[0]}.`} icon="✦" />
      </section>

      <section className="glass mt-10 rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-gold-soft">{spoken} — Yes or No?</h2>
            <p className="mt-1 text-sm text-white/60">Single-pull verdicts from position-aware readings, not blind optimism.</p>
          </div>
          <span className={`font-display text-3xl ${VERDICT_STYLE[yesNo(card, false)]}`}>{yesNo(card, false).toUpperCase()}</span>
        </div>
        <p className="mt-3 text-sm text-white/70">{verdictAnswer(card)}</p>
        <Link href="/quiz" className="btn-glow mt-4 inline-flex rounded-full px-6 py-2.5 text-sm">Try the Yes/No tool</Link>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-3xl text-gold-soft">Advice from the {spoken}</h2>
        <p className="text-white/75">{card.advice} In a 5-card MysticTarot reading, the {spoken} typically lands as one of Past, Present, Hidden, Advice or Outcome — decoding <a className="text-gold underline decoration-gold/40 underline-offset-4" href="/reading">with a free reading</a> shows exactly which role it plays for you.</p>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-3xl text-gold-soft">Cards related to the {spoken}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[prev, next, ...sameRank].filter((c) => c.id !== card.id).map((c) => (
            <Link key={c.id} href={cardUrl(c.id)} className="glass flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:border-gold/50">
              <img src={c.image} alt={c.name} width={96} height={144} loading="lazy" className="w-16 rounded-md border border-gold/30" />
              <span className="text-center text-sm text-gold-soft">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-3xl text-gold-soft">Frequently asked</h2>
        <FaqBlock faqs={cardFaqs} />
      </section>

      <nav className="mt-12 flex justify-between gap-4 text-sm">
        <Link href={cardUrl(prev.id)} className="text-white/60 hover:text-gold">← {prev.name}</Link>
        <Link href={cardUrl(next.id)} className="text-white/60 hover:text-gold">{next.name} →</Link>
      </nav>
    </article>
  );
}

function verdictAnswer(card: TarotCard): string {
  const v = yesNo(card, false);
  if (v === "yes") return `Drawn upright for a yes/no question, the ${card.name.replace(/^The /, "")} leans YES — its imagery of ${card.upright} supports forward motion.`;
  if (v === "no") return `Upright in a yes/no pull, the ${card.name.replace(/^The /, "")} tends to NO — not a door slammed, usually a signal to rethink what you are actually asking for.`;
  return `Upright, the ${card.name.replace(/^The /, "")} reads MAYBE — more information or timing will flip it, so treat the hesitation as data.`;
}

function MeaningTile({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="glass rounded-3xl p-6">
      <p className="mb-2 text-2xl text-gold">{icon}</p>
      <h3 className="font-display text-xl text-gold-soft">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  );
}
