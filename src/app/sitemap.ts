import type { MetadataRoute } from "next";
import { TAROT_DECK } from "@/data/tarot";
import { ZODIAC, CITIES, BLOG } from "@/data/seo";

const BASE = "https://tarot-reader-pied.vercel.app";

type Row = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: Row[] = ([
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/reading`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/meanings`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/yes-or-no`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/quiz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/zodiac`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tarot-reading-near-me`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/how-it-works`, changeFrequency: "yearly", priority: 0.6 },
  ] as Row[]).map((e) => ({ ...e, lastModified: now }));

  const cards: Row[] = TAROT_DECK.map((c) => ({ url: `${BASE}/card/${c.id}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const zodiac: Row[] = ZODIAC.map((z) => ({ url: `${BASE}/zodiac/${z.sign.toLowerCase()}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const cities: Row[] = CITIES.map((c) => ({ url: `${BASE}/tarot-in/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const posts: Row[] = BLOG.map((b) => ({ url: `${BASE}/blog/${b.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));

  return [...statics, ...cards, ...zodiac, ...cities, ...posts];
}
