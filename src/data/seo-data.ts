/** FAQS + site config. Feed /faq and per-page JSON-LD. */
export const SITE = { name: "MysticTarot", url: "https://tarot-reader-pied.vercel.app" };

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "Are tarot cards evil?", a: "No. Tarot cards are a deck of printed symbols — paper and ink. Cards feel dark only in movies. A reading is simply a guided reflection; you decide what to do with it." },
  { q: "Are tarot cards against Christianity or a sin?", a: "There is a wide range of views among Christians. Many treat tarot as reflective storytelling rather than divination, while some traditions discourage it. Read your own conscience — the cards don't demand anything of you." },
  { q: "How do tarot cards work?", a: "A shuffle is random, so the 'power' is in interpretation: archetypal images (Fool, Tower, Star) act like mirrors that help you see your situation from a new angle." },
  { q: "Are tarot readings accurate?", a: "Readings are accurate when they describe things you already half-know but haven't named. They read possibilities, not certainties — never make medical, legal or financial decisions based on them." },
  { q: "Can tarot cards predict the future?", a: "Not literally. Tarot shows the probable path if your current energy continues. Your choices can change the outcome immediately." },
  { q: "Can tarot cards be wrong?", a: "Yes. A misread card, vague question or forced interpretation can miss. That is why every MysticTarot reading shows each card upright or reversed with position-aware context." },
  { q: "Is tarot black magic or witchcraft?", a: "No. Tarot has no spells, rituals or spirits involved — it is a psychological and symbolic tool popularized by the Rider–Waite–Smith deck in 1909." },
  { q: "Are tarot cards haram?", a: "In many Islamic teachings divination is discouraged, so this is a personal faith decision. Tarot itself is just imagery and reflection; whether you use it is between you and your beliefs." },
  { q: "What are tarot cards used for?", a: "For self-reflection, creativity, journaling, decision framing and entertainment. Many writers and therapists use tarot imagery as a structured way to talk through a situation." },
  { q: "How many cards are in a tarot deck?", a: "78: 22 Major Arcana (life themes) and 56 Minor Arcana across Wands, Cups, Swords and Pentacles." },
  { q: "What does upright and reversed mean?", a: "Upright is the card's flowing energy; reversed is the same energy blocked, delayed or turned inward. Reversed isn't bad — it often asks you to look at the inner block." },
  { q: "How should I store tarot cards?", a: "Keep the deck in its box or wrapped in a cloth you like. Storage is about respect and routine, not energy rules." },
  { q: "Should tarot cards be gifted?", a: "Nice tradition, no obligation. Beginners often start with a self-bought Rider–Waite deck and learn from a meanings guide." },
  { q: "How much does a tarot reading cost?", a: "Anywhere from free apps to $100+ for live readers. MysticTarot is free for your first two readings, then $1 per reading or $50 for 100 credits." },
  { q: "Can I pull tarot cards for myself?", a: "Absolutely. Self-readings work well when you write the question down first and accept the answer before you see it." },
  { q: "What questions should I ask tarot cards?", a: "Open questions: 'What should I know about…', 'What is blocking…', 'Where is this heading?' Yes-or-no questions suit quick single-card pulls." },
  { q: "How long does a tarot reading take?", a: "A single card takes a minute; a 5-card spread with full interpretations takes 10–15 minutes to sit with properly." },
  { q: "What tarot cards are yes or no?", a: "Suns, Aces, Nines and Tens lean to clear 'yes'; most Swords lean 'no'; Twos, Sevens and court cards suggest 'maybe/information needed'. See our yes-or-no tool for the full list." },
  { q: "Do tarot cards need cleansing?", a: "Optional ritual: shuffling with intention or resting the deck in moonlight is enough. There is no maintenance requirement." },
  { q: "Which tarot cards mean new beginnings?", a: "The Fool (leap of faith), Ace of Wands (spark), Ace of Cups (heart) and Death (an ending that becomes a beginning)." },
  { q: "Where are tarot cards from?", a: "Europe, 15th century — first as playing cards for Italian nobility, then as divination tools in 18th-century France. The famous Rider–Waite–Smith deck was illustrated in London, 1909." },
  { q: "Where are tarot cards illegal?", a: "Nowhere blanket bans tarot decks, but some countries restrict fortune-telling businesses. Buying a deck with a credit card in the US, EU or India is legal and unregulated." },
  { q: "Can tarot cards ruin your life or invite spirits?", a: "Cards can't act on their own. What damages people is surrendering personal agency — that is why MysticTarot always ends a reading with advice you act on yourself." },
  { q: "How does MysticTarot pick my cards?", a: "A cryptographically random selection of 5 unique cards from the full 78, each randomly upright or reversed, matched to the Past, Present, Hidden, Advice and Outcome positions." },
];
