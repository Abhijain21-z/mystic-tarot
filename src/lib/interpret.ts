import { TAROT_DECK, POSITIONS, type TarotCard } from "@/data/tarot";
import { randomInt } from "crypto";

export interface ReadingCard {
  cardId: string;
  name: string;
  suit: string;
  image: string;
  reversed: boolean;
  position: string;
  positionTitle: string;
  summary: string;
  detail: string;
  love: string;
  career: string;
  money: string;
  spiritual: string;
  advice: string;
  positives: string;
  caution: string;
  keywords: string[];
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function interpret(card: TarotCard, posIndex: number, reversed: boolean): ReadingCard {
  const pos = POSITIONS[posIndex];
  const core = reversed ? card.reversed : card.upright;
  const orient = reversed ? "reversed" : "upright";
  const tone = reversed
    ? "Reversed, its energy may be turned inward, delayed or asking for gentle attention."
    : "Upright, its energy flows openly and supportively.";
  const posFrame: Record<string, string> = {
    past: `In the Past / Background position, ${card.name} suggests that ${core} may have shaped how you arrived here.`,
    present: `As your Present Situation, ${card.name} reflects ${core} as a live theme in your life right now.`,
    hidden: `In the Hidden Influence position, ${card.name} hints that ${core} could be quietly working behind the scenes.`,
    advice: `As your Advice card, ${card.name} invites you to work consciously with ${core}.`,
    outcome: `As a Possible Outcome, ${card.name} points toward ${core} — one possibility, not a fixed fate.`,
  };
  const rv = (s: string) => (reversed ? `there may be some blocks around ${s}; patience helps these ease` : s);
  return {
    cardId: card.id,
    name: card.name,
    suit: card.suit,
    image: card.image,
    reversed,
    position: pos.key,
    positionTitle: pos.title,
    keywords: card.keywords,
    summary: `${cap(core)} — seen through ${pos.lens}.`,
    detail: `${posFrame[pos.key]} ${tone} Key themes: ${card.keywords.join(", ")}. Consider how these themes appear in your daily choices, and remember that you always hold the power to shape your path.`,
    love: `${cap(rv(card.love))}. ${pos.key === "outcome" ? "Over time, your heart may find more clarity here." : "Notice how this shows up in how you give and receive affection."}`,
    career: `${cap(rv(card.career))}. In the ${pos.title.toLowerCase()} position, this ${reversed ? "asks you to review your approach" : "supports confident steps"}.`,
    money: `${cap(rv(card.money))}. This is reflection, not financial advice — make practical decisions with trusted information.`,
    spiritual: `${cap(rv(card.spiritual))}. The ${orient} ${card.name} encourages gentle self-awareness.`,
    advice: reversed ? `${card.advice} Go slowly and be kind to yourself as you do.` : card.advice,
    positives: `Possibilities of ${card.keywords.slice(0, 2).join(" and ")} opening up, and growth through ${pos.lens}.`,
    caution: reversed
      ? `Watch for ${card.reversed}. Awareness is the first step to shifting it.`
      : `Avoid overdoing the energy of ${card.keywords[0]} — balance keeps it healthy.`,
  };
}

/** Cryptographically random 5 unique cards with random orientation. */
export function drawReading(): ReadingCard[] {
  const pool = [...TAROT_DECK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 5).map((c, i) => interpret(c, i, randomInt(100) < 30));
}
