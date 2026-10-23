import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QA_ALL, getQA, CAT_LABELS, CAT_ORDER } from "@/data/qa";
import { ZODIAC } from "@/data/seo";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/seo/Seo";
import { deckById, cardUrl } from "@/lib/seo";
import { SITE } from "@/data/seo-data";

export function generateStaticParams() {
  return QA_ALL.map((e) => ({ slug: e.slug }));
}

function buildLinks(q: string) {
  const links: { label: string; href: string; note: string }[] = [
    { label: "Try the free 5-card reading", href: "/reading", note: "Pick your life stream — love, career, money & more." },
    { label: "Yes / No tarot", href: "/yes-or-no", note: "One card, one verdict, free." },
    { label: "All 78 card meanings", href: "/meanings", note: "A–Z upright & reversed." },
  ];
  const lower = q.toLowerCase();
  for (const z of ZODIAC) {
    if (lower.includes(z.sign.toLowerCase())) {
      const card = deckById[z.cardId];
      links.unshift({ label: `${z.sign} tarot card — ${card.name}`, href: `/zodiac/${z.sign.toLowerCase()}`, note: `${z.dates} · "${z.line}"` });
      links.unshift({ label: `Read ${card.name} meanings`, href: cardUrl(card.id), note: "Upright, reversed, love, career, money." });
      break;
    }
  }
  return links;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getQA(slug);
  if (!e) return { title: "Question not found" };
  return {
    title: { absolute: `${e.q} — Tarot Q&A` },
    description: e.a.slice(0, 155).replace(/<[^>]*>/g, ""),
    alternates: { canonical: `${SITE.url}/tarot-qa/${e.slug}` },
  };
}

export default async function QAPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getQA(slug);
  if (!e) notFound();
  const flat = QA_ALL;
  const idx = flat.findIndex((x) => x.slug === e.slug);
  const sameCat = flat.filter((x) => x.cat === e.cat && x.slug !== e.slug);
  const prev = idx > 0 ? flat[idx - 1] : flat[flat.length - 1];
  const next = idx < flat.length - 1 ? flat[idx + 1] : flat[0];
  const related = buildLinks(e.q);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tarot Q&A", path: "/tarot-qa" },
        { name: e.q, path: `/tarot-qa/${e.slug}` },
      ])} />
      <JsonLd data={faqSchema([{ q: e.q, a: e.a }], `${SITE.url}/tarot-qa/${e.slug}`)} />
      <nav aria-label="Breadcrumb" className="mb-4 pt-28 text-xs text-white/50">
        <Link href="/" className="hover:text-gold">Home</Link> › <Link href="/tarot-qa" className="hover:text-gold">Tarot Q&amp;A</Link> › <span className="text-gold/80">{e.q}</span>
      </nav>

      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">{CAT_LABELS[e.cat] ?? e.cat}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-gold-soft sm:text-5xl">{e.q}</h1>
      </header>

      <section className="glass mt-8 rounded-3xl border border-gold/20 p-6">
        <p className="text-lg leading-relaxed text-white/85">{e.a}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-gold-soft">Put it to the cards — free</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map(({ label, href, note }) => (
            <Link key={href} href={href} className="glass group rounded-2xl p-5 transition hover:border-gold/50">
              <p className="font-display text-lg text-gold-soft group-hover:text-gold">{label}</p>
              <p className="mt-1.5 text-sm text-white/60">{note}</p>
            </Link>
          ))}
        </div>
      </section>

      {sameCat.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-gold-soft">More in this topic</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {sameCat.slice(0, 14).map((s) => (
              <Link key={s.slug} href={`/tarot-qa/${s.slug}`} className="glass rounded-full px-4 py-1.5 text-sm text-white/70 hover:text-gold">{s.q}</Link>
            ))}
          </div>
        </section>
      )}

      <nav aria-label="Prev and next question" className="mt-12 flex justify-between gap-4 text-sm">
        <Link href={`/tarot-qa/${prev.slug}`} className="glass rounded-full px-4 py-2 text-white/70 hover:text-gold">← {prev.q}</Link>
        <Link href={`/tarot-qa/${next.slug}`} className="glass rounded-full px-4 py-2 text-white/70 hover:text-gold">{next.q} →</Link>
      </nav>
    </article>
  );
}
