import type { Metadata } from "next";
import Link from "next/link";
import { QA_ALL, CAT_LABELS, CAT_ORDER } from "@/data/qa";
import { SITE } from "@/data/seo-data";
import { JsonLd, breadcrumbSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: "Tarot Q&A — Every Tarot Question Answered",
  description: `Every tarot question answered in plain English: ${QA_ALL.length} questions on whether tarot is real, evil, accurate, how it works, your zodiac card, buying, gifting and more.`,
  alternates: { canonical: `${SITE.url}/tarot-qa` },
};

export default function QAHub() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tarot Q&A", path: "/tarot-qa" },
      ])} />
      <header className="pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Every question, one honest page each</p>
        <h1 className="mt-2 font-display text-4xl text-gold-soft sm:text-5xl">Tarot <span className="text-gradient-gold italic">Q&amp;A</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          {QA_ALL.length} real search questions answered — faith and fear questions included, no dodging. Each opens its own page with a straight answer and a free way to test the cards yourself.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/reading" className="btn-glow rounded-full px-6 py-3">Start a Free Reading</Link>
          <Link href="/faq" className="btn-ghost rounded-full px-6 py-3">Hand-written FAQ</Link>
        </div>
      </header>

      {CAT_ORDER.map((cat) => {
        const items = QA_ALL.filter((e) => e.cat === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="mt-10">
            <h2 className="font-display text-2xl text-gold-soft">{CAT_LABELS[cat]}</h2>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {items.map((e) => (
                <Link key={e.slug} href={`/tarot-qa/${e.slug}`} className="glass rounded-xl px-4 py-2.5 text-sm text-white/75 transition hover:text-gold hover:border-gold/40">
                  {e.q}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
