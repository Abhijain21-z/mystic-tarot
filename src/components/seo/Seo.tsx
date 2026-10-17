import type { Faq } from "@/data/seo";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Server-rendered accordion using native <details> — crawlable without JS. */
export function FaqBlock({ faqs, className = "" }: { faqs: readonly Faq[]; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {faqs.map((f) => (
        <details key={f.q} className="group glass rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-gold-soft marker:hidden">
            {f.q}
            <span className="text-gold/70 transition-transform group-open:rotate-45">✦</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(faqs: readonly Faq[], url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    ...(url ? { "@id": url } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `https://tarot-reader-pied.vercel.app${it.path}`,
    })),
  };
}

export function articleSchema(opts: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: `https://tarot-reader-pied.vercel.app${opts.slug}`,
    author: { "@type": "Organization", name: "MysticTarot" },
    publisher: { "@type": "Organization", name: "MysticTarot", url: "https://tarot-reader-pied.vercel.app" },
  };
}
