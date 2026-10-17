import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/data/seo";
import { JsonLd, faqSchema } from "@/components/seo/Seo";

export const metadata: Metadata = {
  title: { absolute: "Tarot Card Reading Near Me — Online: Free & Instant, All Cities" },
  description: "Searching 'tarot card reading near me'? MysticTarot is online-only: pick 5 cards and read instantly from any city — 2 free readings, no appointment, private.",
  keywords: ["tarot card reading near me", "tarot reading near me", "best tarot card reader near me", "tarot card reader online", "online tarot reading near me"],
  alternates: { canonical: "/tarot-reading-near-me" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-4xl px-6 pt-28">
      <JsonLd data={faqSchema([
        { q: "Can I get a tarot reading near me without appointments?", a: "Yes — MysticTarot is online: your reading runs on demand, 24/7, from any city listed here. Nothing to book, nothing to travel for." },
        { q: "Is online tarot reading as good as in person?", a: "For reflection-style readings, yes: the deck and interpretations are identical, there's no cold-reading pressure, and your history stays saved to your account." },
        { q: "How much does a reading cost?", a: "Your first 2 readings are free. After that $1 per reading or $50 for 100 credits ($0.50 each) — paid securely via PayPal." },
      ])} />
      <h1 className="text-center font-display text-5xl">Tarot Card Reading <span className="text-gradient-gold">Near Me</span></h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">You just found the shortest distance between a question and an answer: an online 5-card reading that starts in the next minute — wherever in the world you are. First two readings free.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/reading" className="btn-glow rounded-full px-8 py-3">Start my free reading</Link>
        <Link href="/yes-or-no" className="btn-ghost rounded-full px-8 py-3">Quick yes/no pull</Link>
      </div>
      <section className="mt-12">
        <h2 className="text-center font-display text-3xl text-gold-soft">Reading from your city</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/55">Local pages for the cities we're asked about most — Indian metros first, then global capitals of tarot demand.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["mumbai","delhi","bengaluru","hyderabad","chennai","pune","kolkata","bhopal","ahmedabad","jaipur","lucknow","surat","indore","nagpur","chandigarh","kochi","goa","varanasi","patna","bhubaneswar","dehradun","guwahati","coimbatore","vijayawada","mysuru","vadodara","raipur","jabalpur","jodhpur","vizag","london","new-york","toronto","sydney","dubai","singapore"].map((slug) => (
            <Link key={slug} href={`/tarot-in-${slug}`} className="glass rounded-full px-4 py-1.5 text-sm text-white/70 transition hover:border-gold/50 hover:text-gold">
              {slug === "new-york" ? "New York" : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-center font-display text-3xl text-gold-soft">Why 'near me' beats 'appointments'</h2>
        <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-3 text-sm">
          {[["No travel", "The spread is wherever you are — sofa, bus, lunch break."], ["No pressure", "Free first readings, no upsell, no cold reading."], ["Full deck, full archive", "78 RWS cards; history saved to your account."]].map(([t, d]) => (
            <div key={t} className="glass rounded-2xl p-5"><p className="font-display text-xl text-gold-soft">{t}</p><p className="mt-1 text-white/65">{d}</p></div>
          ))}
        </div>
      </section>
    </article>
  );
}
