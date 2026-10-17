import { TAROT_DECK, type Suit, type TarotCard } from "@/data/tarot";
import { SITE, FAQS, type Faq } from "@/data/seo";

export const deckById: Record<string, TarotCard> = Object.fromEntries(TAROT_DECK.map((c) => [c.id, c]));

export const cardUrl = (id: string) => `/card/${id}`;
export const cardImage = (id: string) => deckById[id]?.image ?? "/images/card-sun-back.jpg";
export const cardName = (id: string) => deckById[id]?.name ?? id;
export const cardSpoken = (id: string) => cardName(id).replace(/^The /, "");
export const DECK = TAROT_DECK;

export function suitSlug(suit: Suit) { return suit.toLowerCase() === "major arcana" ? "major-arcana" : suit.toLowerCase(); }

/* ---------- YES / NO ---------- */
export type Verdict = "yes" | "no" | "maybe";
const MAJOR_VERDICTS: Record<string, { up: Verdict; rev: Verdict }> = {
  "the-fool": { up: "yes", rev: "no" },
  "the-magician": { up: "yes", rev: "no" },
  "the-high-priestess": { up: "maybe", rev: "maybe" },
  "the-empress": { up: "yes", rev: "no" },
  "the-emperor": { up: "maybe", rev: "maybe" },
  "the-hierophant": { up: "yes", rev: "no" },
  "the-lovers": { up: "yes", rev: "no" },
  "the-chariot": { up: "yes", rev: "no" },
  strength: { up: "yes", rev: "no" },
  "the-hermit": { up: "maybe", rev: "no" },
  "wheel-of-fortune": { up: "yes", rev: "no" },
  justice: { up: "yes", rev: "no" },
  "the-hanged-man": { up: "maybe", rev: "no" },
  death: { up: "maybe", rev: "no" },
  temperance: { up: "yes", rev: "no" },
  "the-devil": { up: "no", rev: "yes" },
  "the-tower": { up: "no", rev: "no" },
  "the-star": { up: "yes", rev: "no" },
  "the-moon": { up: "maybe", rev: "maybe" },
  "the-sun": { up: "yes", rev: "no" },
  judgement: { up: "yes", rev: "no" },
  "the-world": { up: "yes", rev: "no" },
};
const RANK_VERDICTS: Record<string, Verdict> = {
  ace: "yes", two: "maybe", three: "yes", four: "no", five: "no", six: "yes", seven: "maybe", eight: "yes", nine: "yes", ten: "yes",
  page: "maybe", knight: "maybe", queen: "yes", king: "yes",
};
const SUIT_VERDICTS: Record<Exclude<Suit, "Major Arcana">, Verdict> = { Wands: "yes", Cups: "yes", Swords: "no", Pentacles: "maybe" };
const SWORD_HARD: Set<string> = new Set(["four", "five", "nine", "ten"]);

export function yesNo(card: TarotCard, reversed = false): Verdict {
  if (card.suit === "Major Arcana") { const v = MAJOR_VERDICTS[card.id]; return reversed ? v.rev : v.up; }
  const flip: Record<Verdict, Verdict> = { yes: "no", no: "maybe", maybe: "yes" };
  const rank = card.name.split(" ")[0].toLowerCase();
  let base = SUIT_VERDICTS[card.suit as Exclude<Suit, "Major Arcana">];
  if (card.suit === "Swords" && SWORD_HARD.has(rank)) base = "no";
  else if (RANK_VERDICTS[rank]) { const r = RANK_VERDICTS[rank]; base = r === "yes" ? "yes" : r === "no" ? "no" : base === "no" ? "no" : "maybe"; }
  if (RANK_VERDICTS[rank] === "maybe") base = "maybe";
  return reversed ? flip[base] : base;
}

export function yesNoList(): { card: TarotCard; up: Verdict; rev: Verdict }[] {
  return TAROT_DECK.map((card) => ({ card, up: yesNo(card, false), rev: yesNo(card, true) }));
}

export type { Faq };
export { SITE };
export const FAQ_DATA: readonly Faq[] = FAQS;
