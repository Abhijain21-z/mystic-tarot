import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQS, BLOG, CITIES } from "@/data/seo";
import { TAROT_DECK } from "@/data/tarot";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/seo/Seo";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = CITIES.find((x) => x.slug === city);
  if (!c) return { title: "City not found" };
  const country = c.region.split(",").pop()?.trim() ?? "";
  const isIndia = country.includes("India");
  const priceLine = isIndia ? "3 free readings daily, then Γé╣90 ($1) per reading or Γé╣4,500 ($50) for 100 credits" : "3 free readings daily, then $1 per reading or $50 for 100 credits";
  return {
    title: { absolute: `Tarot Card Reading in ${c.name} ΓÇö Online, Free to Start, 78-Card Deck` },
    description: `Looking for a tarot card reading in ${c.name}? MysticTarot runs the full 78-card RiderΓÇôWaite deck online ΓÇö no appointment, private, ${priceLine}.`,
    keywords: [`tarot card reading in ${c.name.toLowerCase()}`, `tarot reading ${c.name.toLowerCase()}`, `tarot card reader in ${c.name.toLowerCase()}`, `tarot card reading near me`, `best tarot card reader near me`],
    alternates: { canonical: `/tarot-in/${c.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = CITIES.find((x) => x.slug === city);
  if (!c) notFound();
  const others = CITIES.filter((x) => x.region === c.region && x.slug !== c.slug).slice(0, 8);
  const nearby = others.length ? others : CITIES.filter((x) => x.slug !== c.slug).slice(0, 8);
  const seeded = [...TAROT_DECK.slice(Number(c.name.length) % 22), ...TAROT_DECK].slice(0, 3);
  const faqs: { q: string; a: string }[] = [
    { q: `Is there a tarot reader available in ${c.name} right now?`, a: `Yes ΓÇö MysticTarot is always available in ${c.name} because the reading is online: shuffle the 78-card deck and get your 5-card spread in minutes, at any hour, 3 free readings daily.` },
    { q: `How much does a tarot reading cost in ${c.name}?`, a: `Nothing to start: your 3 free readings every day. After that it's $1 per reading (Γëê Γé╣90 for India) or $50 for 100 credits ΓÇö far less than the Γé╣2,000ΓÇôΓé╣10,000 typical of in-person readers.` },
    { q: `Can I get a same-day tarot reading in ${c.name}?`, a: `Same-minute, actually. No booking, no travel: create a free account, spin the deck, choose 5 cards and the full interpretation appears on screen. Your reading history is saved for you.` },
    { q: `Are online readings real tarot?`, a: "The deck is the full 78-card RiderΓÇôWaite system with upright and reversed orientations, drawn brightly and randomly. What changes vs in-person is only who interprets ΓÇö here it's position-aware interpretation, not cold reading." },
  ];
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tarot Near Me", path: "/tarot-reading-near-me" }, { name: c.name, path: `/tarot-in/${c.slug}` }])} />
      <JsonLd data={faqSchema(faqs)} />
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/50"><Link href="/" className="hover:text-gold">Home</Link> ΓÇ║ <Link href="/tarot-reading-near-me" className="hover:text-gold">Tarot Near Me</Link> ΓÇ║ <span className="text-gold/80">{c.name}</span></nav>
      <h1 className="font-display text-4xl sm:text-5xl text-gold-soft">Tarot Card Reading in {c.name}</h1>
      <p className="mt-3 text-white/70">{c.region} ┬╖ Online ┬╖ 78-card RiderΓÇôWaite deck ┬╖ 3 free readings daily</p>
      <p className="mt-6 text-white/75">If you've been typing "tarot card reading near me" into {c.name} search bars, this is the shortcut: no traffic to sit through in {c.region}'s busiest stretches, no appointment to chase, no fee to preview. Spin the deck right now ΓÇö the shuffle, the 5-card spread and the full interpretation happen in the next few minutes, free three times every day.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/reading" className="btn-glow rounded-full px-8 py-3">Start free reading</Link>
        <Link href="/yes-or-no" className="btn-ghost rounded-full px-8 py-3">Quick yes/no pull</Link>
      </div>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">What a reading covers</h2><p className="mt-2 text-sm text-white/70">Five positions ΓÇö Past, Present, Hidden Influence, Advice, Outcome ΓÇö each randomly drawn from all 78 cards, upright or reversed, interpreted for love, career, money and the spiritual frame.</p></div>
        <div className="glass rounded-3xl p-6"><h2 className="font-display text-2xl text-gold-soft">Pricing for {c.name}</h2><p className="mt-2 text-sm text-white/70">Free twice with a free account, then $1 per reading ΓÇö or $50 for 100 credits at $0.50 each. Paid securely via PayPal. No subscription, no per-minute meter.</p></div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-gold-soft">Popular cards in {c.name} pulls</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {seeded.map((card) => (
            <Link key={card.id} href={`/card/${card.id}`} className="glass rounded-2xl p-3 text-center transition hover:border-gold/50">
              <img src={card.image} alt={card.name} width={80} height={120} loading="lazy" className="mx-auto w-14 rounded-md border border-gold/30" />
              <p className="mt-2 text-sm text-gold-soft">{card.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-gold-soft">{c.name} tarot FAQ</h2>
        {faqs.map((f) => <details key={f.q} className="glass mb-3 rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden"><summary className="cursor-pointer font-display text-lg text-gold-soft">{f.q}</summary><p className="mt-3 text-sm text-white/70">{f.a}</p></details>)}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-gold-soft">Nearby pages</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {nearby.map((n) => <Link key={n.slug} href={`/tarot-in/${n.slug}`} className="glass rounded-full px-4 py-1.5 text-sm text-white/70 hover:text-gold">{n.name}</Link>)}
        </div>
        <p className="mt-6 text-sm text-white/60">Also in this city guide: <Link href="/meanings" className="text-gold hover:underline">all 78 card meanings</Link>, the <Link href="/quiz" className="text-gold hover:underline">birthday card quiz</Link>, and reads on <Link href="/blog" className="text-gold hover:underline">the tarot blog</Link> ΓÇö like {BLOG.slice(0, 2).map((b) => <Link key={b.slug} href={`/blog/${b.slug}`} className="text-gold hover:underline">{b.title}</Link>).reduce((acc, el, i) => (i === 0 ? <>{el}</> : <>{acc} and {el}</>), <></>) }.</p>
      </section>
    </article>
  );
}
