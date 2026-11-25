import type { Metadata } from "next";
import Link from "next/link";
import { BLOG } from "@/data/seo";
import { JsonLd } from "@/components/seo/Seo";
import { SITE } from "@/data/seo-data";

export const metadata: Metadata = {
  title: { absolute: "Tarot Blog — Guides on Faith, Accuracy, Money, Zodiac & Comparisons" },
  description: "Free tarot guides for love, career, money and spreads, plus honest answers on faith, accuracy, yes/no readings, costs, comparisons and zodiac pairings.",
  keywords: ["tarot blog", "free tarot reading online", "love tarot reading", "career tarot reading", "money tarot reading", "tarot spreads for beginners", "how to read tarot", "tarot vs astrology"],
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const clusters = [...new Set(BLOG.map((b) => b.cluster))];
  return (
    <article className="mx-auto max-w-4xl px-6 pt-28">
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Blog",
        name: "MysticTarot Journal", url: `${SITE.url}/blog`,
        blogPost: BLOG.map((b) => ({ "@type": "BlogPosting", headline: b.title, url: `${SITE.url}/blog/${b.slug}` })),
      }} />
      <h1 className="text-center font-display text-5xl">The Tarot <span className="text-gradient-gold">Journal</span></h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">Plain-spoken guides on love, career, money and spreads — plus faith, accuracy, comparisons, cost and craft.</p>
      {clusters.map((cluster) => (
        <section key={cluster} className="mt-12">
          <h2 className="mb-4 font-display text-3xl text-gold-soft">{cluster}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {BLOG.filter((b) => b.cluster === cluster).map((b) => (
              <Link key={b.slug} href={`/blog/${b.slug}`} className="glass group flex flex-col rounded-3xl p-6 transition hover:border-gold/50">
                <h3 className="font-display text-xl text-gold-soft group-hover:text-gold">{b.title}</h3>
                <p className="mt-2 text-sm text-white/65">{b.desc}</p>
                <p className="mt-auto pt-3 text-xs text-white/40">{b.keywords.slice(0, 2).join(" · ")}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
