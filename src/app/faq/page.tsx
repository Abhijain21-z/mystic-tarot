import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/data/seo";
import { JsonLd, faqSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: { absolute: "Tarot FAQ — Are Tarot Cards Evil, Real, Accurate? All Questions Answered" },
  description: "Every tarot question answered honestly: are tarot cards evil or against the Bible, can they predict the future, how much readings cost, storage, cleanse, gifting — with a free yes/no tool.",
  keywords: ["tarot questions and answers", "are tarot cards evil", "are tarot cards real", "tarot faq", "can tarot predict the future"],
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={faqSchema(FAQS)} />
      <h1 className="text-center font-display text-5xl">Tarot <span className="text-gradient-gold">Questions</span>, Answered</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">The 24 questions people ask before their first spread — belief, accuracy, money, storage, gifting — answered plainly and honestly.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/reading" className="btn-glow rounded-full px-6 py-2.5">Free 5-card reading</Link>
        <Link href="/yes-or-no" className="btn-ghost rounded-full px-6 py-2.5">Yes/No pull</Link>
        <Link href="/quiz" className="btn-ghost rounded-full px-6 py-2.5">Birthday quiz</Link>
      </div>
      <section className="glass mt-8 rounded-3xl border border-gold/30 p-6 text-center">
        <p className="font-display text-2xl text-gold-soft">150+ more questions, one page each</p>
        <p className="mt-2 text-sm text-white/65">Every search question people ask — &ldquo;are tarot cards demonic&rdquo;, &ldquo;what tarot card is a Scorpio&rdquo;, &ldquo;where to buy tarot cards&rdquo;, &ldquo;should I shuffle&rdquo; — has its own straight answer page now.</p>
        <Link href="/tarot-qa" className="btn-glow mt-4 inline-block rounded-full px-6 py-2.5">Open the full Tarot Q&amp;A</Link>
      </section>
      <section className="mt-10">
        {FAQS.map((f) => (
          <details key={f.q} className="glass mb-3 rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer font-display text-xl text-gold-soft">{f.q}</summary>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
          </details>
        ))}
      </section>
      <p className="mt-8 text-center text-sm text-white/60">Deep dives on every card live in the <Link href="/meanings" className="text-gold hover:underline">78-card meanings hub</Link>; longer reads on the <Link href="/blog" className="text-gold hover:underline">blog</Link>.</p>
    </article>
  );
}
