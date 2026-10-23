/**
 * Life-stream tarot readings. Each stream re-labels the 5 positions and picks a
 * leading interpretation lens, so every reading feels written for that field —
 * love readings talk about the heart, money readings about wealth, and so on.
 *
 * All copy targets US users in plain English.
 */
export type LensKey = "love" | "career" | "money" | "spiritual";

export interface Stream {
  id: string;
  label: string; // short name shown everywhere
  short: string; // ultra-short label for chips on the card-picker
  tileTitle: string; // dashboard tile heading
  tileDesc: string; // dashboard tile description
  accent: string; // tailwind classes for the icon chip
  glow: string; // tailwind classes for the hover glow
  questionHint: string; // placeholder for the optional question input
  lensPhrase: string; // replaces "seen through ..." in summaries
  primaryLens: LensKey | null; // which interpretation field leads (null = general)
  positions: [string, string, string, string, string]; // 5 stream-specific position titles
}

export const STREAMS: Stream[] = [
  {
    id: "love",
    label: "Love & Romance",
    short: "Love",
    tileTitle: "Tarot for Your Love Life",
    tileDesc: "What their heart is doing, where it's heading, what to do next.",
    accent: "bg-pink-500/15 text-pink-200 border border-pink-400/30",
    glow: "hover:border-pink-400/60 hover:shadow-[0_0_40px_-8px_rgba(244,114,182,0.45)]",
    questionHint: "Ask about your love life — a person, a spark, a second chance…",
    lensPhrase: "the story between two hearts",
    primaryLens: "love",
    positions: ["How They Feel", "The Present Spark", "The Hidden Truth", "What To Do Now", "Where It's Heading"],
  },
  {
    id: "career",
    label: "Career & Job",
    short: "Career",
    tileTitle: "Tarot for Your Career",
    tileDesc: "Job changes, growth, the boss's mind, your best move.",
    accent: "bg-sky-500/15 text-sky-200 border border-sky-400/30",
    glow: "hover:border-sky-400/60 hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.45)]",
    questionHint: "Ask about your career — a switch, an offer, a promotion…",
    lensPhrase: "your professional climb",
    primaryLens: "career",
    positions: ["Your Path So Far", "Where You Stand Now", "The Hidden Factor", "Your Best Move", "Where Your Career Leads"],
  },
  {
    id: "money",
    label: "Money & Wealth",
    short: "Money",
    tileTitle: "Tarot for Your Money",
    tileDesc: "Cash flow, hidden leaks, investments and where abundance flows.",
    accent: "bg-amber-500/15 text-amber-200 border border-amber-400/30",
    glow: "hover:border-amber-400/60 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.45)]",
    questionHint: "Ask about money — savings, a deal, a windfall, a worry…",
    lensPhrase: "the flow of your wealth",
    primaryLens: "money",
    positions: ["Past Money Patterns", "Your Current Standing", "The Hidden Leak", "The Smart Move", "Where Wealth Flows"],
  },
  {
    id: "family",
    label: "Family & Home",
    short: "Family",
    tileTitle: "Tarot for Your Family",
    tileDesc: "Home, parents, kids and the peace the household is seeking.",
    accent: "bg-orange-500/15 text-orange-200 border border-orange-400/30",
    glow: "hover:border-orange-400/60 hover:shadow-[0_0_40px_-8px_rgba(251,146,60,0.45)]",
    questionHint: "Ask about family — a rift, a home shift, a parent, a child…",
    lensPhrase: "the hearth your family gathers around",
    primaryLens: "spiritual",
    positions: ["Roots & History", "The Home Right Now", "The Unspoken", "How To Heal It", "Where The Family Goes"],
  },
  {
    id: "business",
    label: "Business & Ambition",
    short: "Business",
    tileTitle: "Tarot for Your Business",
    tileDesc: "Ventures, partners, scale, risk — the founder spread.",
    accent: "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30",
    glow: "hover:border-emerald-400/60 hover:shadow-[0_0_40px_-8px_rgba(52,211,153,0.45)]",
    questionHint: "Ask about your business — a launch, a partner, a pivot…",
    lensPhrase: "the boardroom of your ambition",
    primaryLens: "career",
    positions: ["The Foundation", "The Venture Right Now", "The Blind Spot", "The Founder's Move", "Where The Empire Leads"],
  },
  {
    id: "emotions",
    label: "Emotions & Healing",
    short: "Emotions",
    tileTitle: "Tarot for Your Inner Self",
    tileDesc: "Stress, healing, closure, the weight you silently carry.",
    accent: "bg-violet-500/15 text-violet-200 border border-violet-400/30",
    glow: "hover:border-violet-400/60 hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.45)]",
    questionHint: "Ask about your inner self — a wound, a worry, a closure…",
    lensPhrase: "the quiet weather of your soul",
    primaryLens: "spiritual",
    positions: ["What You Carry", "What You Feel Now", "The Hidden Weight", "How To Heal", "Where Peace Finds You"],
  },
  {
    id: "relationship",
    label: "Relationship & Marriage",
    short: "Relationship",
    tileTitle: "Tarot for Your Relationship",
    tileDesc: "Commitment, marriage, repair — the bond's whole journey.",
    accent: "bg-rose-500/15 text-rose-200 border border-rose-400/30",
    glow: "hover:border-rose-400/60 hover:shadow-[0_0_40px_-8px_rgba(251,113,133,0.45)]",
    questionHint: "Ask about your bond — marriage, trust, repair, forever…",
    lensPhrase: "the long road two people share",
    primaryLens: "love",
    positions: ["How It Began", "The Bond Today", "The Hidden Dynamic", "The Repair Point", "Where The Bond Leads"],
  },
  {
    id: "final",
    label: "All-Around Destiny",
    short: "All",
    tileTitle: "Tarot for Everything",
    tileDesc: "The classic full spread — past, present, hidden, advice, outcome.",
    accent: "bg-gold/15 text-gold-soft border border-gold/30",
    glow: "hover:border-gold/70 hover:shadow-[0_0_40px_-8px_rgba(232,194,106,0.5)]",
    questionHint: "Whatever you dare to ask — destiny answers…",
    lensPhrase: "the roots of your current situation",
    primaryLens: null,
    positions: ["Past / Background", "Present Situation", "Hidden Influence", "Advice", "Possible Outcome"],
  },
];

export const DEFAULT_STREAM_ID = "final";

export function getStream(id: string | null | undefined): Stream {
  return STREAMS.find((s) => s.id === id) ?? STREAMS.find((s) => s.id === DEFAULT_STREAM_ID)!;
}
