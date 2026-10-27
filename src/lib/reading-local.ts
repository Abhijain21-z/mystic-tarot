import { TAROT_DECK, POSITIONS, DEEP_POSITIONS, type TarotCard } from "@/data/tarot";
import { getStream } from "./streams";
import type { ReadingCard } from "./interpret";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Generic per-position framing, parameterized by the stream's position title. */
const posFrameVerbs: Record<string, (title: string, name: string, core: string) => string> = {
  past: (t, n, c) => `In the ${t} position, ${n} suggests that ${c} may have shaped how you arrived here.`,
  present: (t, n, c) => `As your ${t}, ${n} reflects ${c} as a live theme in your life right now.`,
  hidden: (t, n, c) => `In the ${t} position, ${n} hints that ${c} could be quietly working behind the scenes.`,
  advice: (t, n, c) => `As your ${t} card, ${n} invites you to work consciously with ${c}.`,
  outcome: (t, n, c) => `As a ${t}, ${n} points toward ${c} — one possibility, not a fixed fate.`,
  support: (t, n, c) => `In the ${t} position, ${n} shows that ${c} is already on your side.`,
  challenge: (t, n, c) => `Sitting as the ${t}, ${n} names ${c} as the knot your next move must untie.`,
  external: (t, n, c) => `As the ${t}, ${n} suggests ${c} — outside forces you can prepare for.`,
  next: (t, n, c) => `Your ${t} card, ${n}, urges you toward ${c} this week — small, concrete, doable.`,
  verdict: (t, n, c) => `And the deck's word: as the ${t}, ${n} leaves you with ${c} — carry it when the page closes.`,
};

function interpretLocal(card: TarotCard, posIndex: number, reversed: boolean, streamId: string): ReadingCard {
  const stream = getStream(streamId);
  const deep = posIndex >= 5;
  const deepPos = deep ? DEEP_POSITIONS[posIndex - 5] : undefined;
  const basePos = POSITIONS[posIndex];
  const title = deep ? (deepPos?.title ?? stream.positions[posIndex]) : stream.positions[posIndex];
  const key = deep ? (deepPos?.key ?? "next") : (basePos?.key ?? "present");
  const core = reversed ? card.reversed : card.upright;
  const orient = reversed ? "reversed" : "upright";
  const tone = reversed
    ? "Reversed, its energy may be turned inward, delayed or asking for gentle attention."
    : "Upright, its energy flows openly and supportively.";
  const frame = posFrameVerbs[key]?.(title, card.name, core) ?? `For ${title}, ${card.name} speaks of ${core}.`;
  const rv = (s: string) => (reversed ? `there may be some blocks around ${s}; patience helps these ease` : s);
  return {
    cardId: card.id,
    name: card.name,
    suit: card.suit,
    image: card.image,
    reversed,
    position: key,
    positionTitle: title,
    keywords: card.keywords,
    summary: `${cap(core)} — seen through ${stream.lensPhrase}.`,
    detail: `${frame} ${tone} Key themes: ${card.keywords.join(", ")}. Consider how these themes appear in your daily choices, and remember that you always hold the power to shape your path.`,
    love: `${cap(rv(card.love))}. ${key === "outcome" ? "Over time, your heart may find more clarity here." : "Notice how this shows up in how you give and receive affection."}`,
    career: `${cap(rv(card.career))}. In the ${title.toLowerCase()} position, this ${reversed ? "asks you to review your approach" : "supports confident steps"}.`,
    money: `${cap(rv(card.money))}. This is reflection, not financial advice — make practical decisions with trusted information.`,
    spiritual: `${cap(rv(card.spiritual))}. The ${orient} ${card.name} encourages gentle self-awareness.`,
    advice: reversed ? `${card.advice} Go slowly and be kind to yourself as you do.` : card.advice,
    positives: `Possibilities of ${card.keywords.slice(0, 2).join(" and ")} opening up, and growth through ${stream.lensPhrase}.`,
    caution: reversed
      ? `Watch for ${card.reversed}. Awareness is the first step to shifting it.`
      : `Avoid overdoing the energy of ${card.keywords[0]} — balance keeps it healthy.`,
  };
}

/**
 * Build a stream-aware reading from the user's 5 picked wheel indices
 * (client-safe, no server needed).
 */
export function readingFromPicks(picked: number[], streamId: string = "final"): ReadingCard[] {
  // Standard spread = 5 cards; Pro deep spread = up to 10 cards.
  return picked.slice(0, 10).map((wheelIdx, pos) => {
    const card = TAROT_DECK[((wheelIdx % TAROT_DECK.length) + TAROT_DECK.length) % TAROT_DECK.length];
    const reversed = Math.random() < 0.3;
    return interpretLocal(card, pos, reversed, streamId);
  });
}

/** Fallback: 5 random cards (used if picks are missing). */
export function randomReading(streamId?: string): ReadingCard[] {
  const idx = new Set<number>();
  while (idx.size < 5) idx.add(Math.floor(Math.random() * TAROT_DECK.length));
  return readingFromPicks([...idx], streamId);
}
