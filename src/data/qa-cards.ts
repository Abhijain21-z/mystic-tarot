/**
 * Programmatic Q&A entries generated from the deck (src/data/tarot.ts) and zodiac map.
 * Covers card-keyword searches: "tarot card king of cups", "what tarot card is 10",
 * "tarot card VIII", "tarot card for Scorpio", etc. One page per entry via /tarot-qa/[slug].
 */
import { TAROT_DECK, type TarotCard } from "./tarot";
import { ZODIAC } from "./seo";
import type { QAEntry } from "./qa";

const cardPage = (c: TarotCard) => `/card/${c.id}`;

function cardAnswer(c: TarotCard): string {
  const kws = c.keywords.slice(0, 3).join(", ");
  return `${c.name} upright signals ${c.upright}. Reversed, it points to ${c.reversed}. Its core symbols — ${kws} — make it one of the most recognizable cards in the 78-card Rider–Waite deck. Practical edge: ${c.advice} For love, career and money readings plus the yes/no verdict, see the full ${c.name} meaning page.`;
}

/* ── 1. Every card in the deck: "{Name} tarot card meaning" ── */
export const QA_CARDS: QAEntry[] = TAROT_DECK.map((c) => ({
  cat: "card-meanings",
  q: `${c.name} tarot card meaning`,
  a: cardAnswer(c),
}));

/* ── 2. "What tarot card is number N?" — majors in Rider–Waite order (Fool = 0) ── */
const majorsInOrder: TarotCard[] = TAROT_DECK.filter((c) => c.suit === "Major Arcana").sort((a, b) => a.number - b.number);

export const QA_NUMBERS: QAEntry[] = majorsInOrder.map((c) => {
  const n = c.number;
  const title = n === 0 ? "What tarot card is number 0?" : `What tarot card is number ${n}?`;
  const body =
    n === 0
      ? `Number 0 belongs to ${c.name} — the card that stands outside the sequence, a beginning before the counting starts. Upright it promises ${c.upright}. Explore the full ${c.name} meaning page.`
      : `In the standard Rider–Waite order, major arcana number ${n} is ${c.name} — upright it means ${c.upright}, and reversed ${c.reversed}. The majors are the deck's big life-theme cards; number ${n} sits between ${majorsInOrder[n - 1]?.name ?? "The Fool"} and ${majorsInOrder[n + 1]?.name ?? "the end of the deck"}. Full breakdown on our ${c.name} page.`;
  return { cat: "numbers", q: title, a: body };
});

/* The classic trick searches: no card 25 / no 29th card */
export const QA_NUMBER_TRICKS: QAEntry[] = [
  {
    cat: "numbers",
    q: "What tarot card is 25?",
    a: "There is no card 25 in tarot — the deck has 78 cards: 22 Major Arcana numbered 0–21 and 56 Minor Arcana across four suits. If you saw 'card 25' in an app or game, it was that product's own numbering, not the traditional deck. The majors end at 21, The World; The Fool sits at 0 as the unnumbered beginning.",
  },
  {
    cat: "numbers",
    q: "What is the 29th tarot card?",
    a: "In the 22 Major Arcana there is no 29th card — the sequence runs 0 (The Fool) to 21 (The World). If you count all 78 cards in a physical deck, the 29th card depends on the deck's sort order. Most people asking this mean majors, and the honest answer is: majors stop at 21.",
  },
  {
    cat: "numbers",
    q: "What are the 21 tarot cards?",
    a: "You're likely thinking of the 22 Major Arcana (0–21): The Fool, Magician, High Priestess, Empress, Emperor, Hierophant, Lovers, Chariot, Strength, Hermit, Wheel of Fortune, Justice, Hanged Man, Death, Temperance, Devil, Tower, Star, Moon, Sun, Judgement and The World. The other 56 cards are the Minor Arcana — four suits (Wands, Cups, Swords, Pentacles) with 14 cards each.",
  },
];

/* ── 3. Roman numerals: I–XXI ── */
const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

export const QA_ROMAN: QAEntry[] = ROMAN.slice(1).map((r) => {
  const n = ROMAN.indexOf(r);
  const c = majorsInOrder.find((m) => m.number === n);
  if (!c) return { cat: "numbers", q: `What is tarot card ${r}?`, a: "Not part of the standard numbering." };
  return {
    cat: "numbers",
    q: `What is tarot card ${r}?`,
    a: `Roman numeral ${r} is card ${n} in the Rider–Waite majors: ${c.name} — upright ${c.upright}, reversed ${c.reversed}. Old decks print the numeral at the top of each major arcana card, which is why searches like 'tarot card ${r}' still point here. Symbols and full meanings on our ${c.name} meaning page.`,
  };
});

/* ── 4. Zodiac: "Tarot card for {sign}" ── */
export const QA_ZODIAC_FOR: QAEntry[] = ZODIAC.map((z) => {
  const card = TAROT_DECK.find((c) => c.id === z.cardId);
  if (!card) return { cat: "zodiac-for", q: `Tarot card for ${z.sign}`, a: "" };
  return {
    cat: "zodiac-for",
    q: `Tarot card for ${z.sign}`,
    a: `${z.sign} (${z.dates}) pairs with ${card.name} by the Golden Dawn correspondence — upright it speaks of ${card.upright}, reversed of ${card.reversed}. The fit is real: ${z.line} Read the full ${card.name} meaning page, or start a free reading and see whether ${card.name} shows up for you today.`,
  };
});

/* Compiled export */
export const QA_GENERATED: QAEntry[] = [
  ...QA_CARDS,
  ...QA_NUMBERS,
  ...QA_NUMBER_TRICKS,
  ...QA_ROMAN,
  ...QA_ZODIAC_FOR,
];
