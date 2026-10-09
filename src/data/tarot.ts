/**
 * TAROT CONTENT DATABASE — admin-friendly.
 * Edit meanings here (or replace with a JSON/DB source) without touching UI code.
 * Images: Rider–Waite–Smith deck (1909, Pamela Colman Smith) — public domain, served via Wikimedia Commons.
 */
export type Suit = "Major Arcana" | "Wands" | "Cups" | "Swords" | "Pentacles";

export interface TarotCard {
  id: string;
  name: string;
  suit: Suit;
  number: number;
  image: string;
  keywords: string[];
  upright: string;
  reversed: string;
  love: string;
  career: string;
  money: string;
  spiritual: string;
  advice: string;
}

const wm = (file: string) => `/cards/${file}`;

type MajorRow = [string, string, string[], string, string, string, string, string, string, string];
// [name, file, keywords, upright, reversed, love, career, money, spiritual, advice]
const MAJORS: MajorRow[] = [
  ["The Fool", "RWS_Tarot_00_Fool.jpg", ["beginnings", "spontaneity", "trust"], "a fresh start and the courage to step into the unknown with an open heart", "hesitation, or a leap taken without looking where you land", "new romance or a playful renewal of an existing bond", "a new path, role or venture that invites curiosity", "be open to fresh opportunities while keeping a simple budget", "your spirit is ready to explore beyond familiar walls", "Take one brave, light-hearted step and trust the journey."],
  ["The Magician", "RWS_Tarot_01_Magician.jpg", ["willpower", "skill", "manifestation"], "all the tools you need are already in your hands", "scattered focus or talents held back by doubt", "clear communication brings attraction and connection", "your skills are ready to be shown and used with confidence", "resourcefulness can turn ideas into income", "you are a channel between intention and action", "Focus your intention and act on it today."],
  ["The High Priestess", "RWS_Tarot_02_High_Priestess.jpg", ["intuition", "mystery", "inner voice"], "quiet wisdom and intuition guiding you from within", "ignoring your inner voice or hidden information surfacing", "unspoken feelings deserve patience and gentle attention", "listen more than you speak; insight arrives quietly", "not everything is visible yet — review details before committing", "deep intuitive knowing is awakening", "Pause, get quiet, and trust what you already sense."],
  ["The Empress", "RWS_Tarot_03_Empress.jpg", ["abundance", "nurture", "creativity"], "growth, comfort and creative abundance", "creative block or giving too much of yourself away", "warmth, affection and nurturing love", "creative projects flourish with care and patience", "steady growth and appreciation of what you have", "connection to nature and self-care restores you", "Nurture yourself as generously as you nurture others."],
  ["The Emperor", "RWS_Tarot_04_Emperor.jpg", ["structure", "authority", "stability"], "structure, leadership and firm foundations", "rigidity or struggles with control", "stability and commitment create security", "leadership, organization and long-term plans", "discipline and structure protect your resources", "grounding your ideals in real-world action", "Create a clear plan and hold steady to it."],
  ["The Hierophant", "RWS_Tarot_05_Hierophant.jpg", ["tradition", "learning", "guidance"], "wisdom from tradition, mentors and shared values", "questioning rules and seeking your own path", "shared values and meaningful commitment", "learning from mentors or established institutions", "conventional, time-tested financial choices serve you", "rituals and teachings deepen your practice", "Seek a trusted guide, then make the wisdom your own."],
  ["The Lovers", "RWS_Tarot_06_Lovers.jpg", ["union", "choice", "alignment"], "harmony, heartfelt connection and values-based choices", "imbalance or a choice made against your values", "deep connection and honest partnership", "choose work that aligns with your values", "partnerships and shared decisions around money", "aligning heart and mind", "Choose what truly reflects who you are."],
  ["The Chariot", "RWS_Tarot_07_Chariot.jpg", ["drive", "victory", "determination"], "momentum, determination and forward motion", "loss of direction or pulling in two directions", "moving forward together with shared purpose", "progress through focus and self-discipline", "determined effort can move goals forward", "mastering opposing inner forces", "Hold the reins firmly and keep moving."],
  ["Strength", "RWS_Tarot_08_Strength.jpg", ["courage", "compassion", "patience"], "gentle courage and quiet inner strength", "self-doubt or energy running low", "patience and compassion strengthen bonds", "calm confidence wins respect", "patient choices over impulsive ones", "your gentleness is a form of power", "Lead with kindness — toward yourself too."],
  ["The Hermit", "RWS_Tarot_09_Hermit.jpg", ["reflection", "solitude", "wisdom"], "a period of reflection and seeking inner truth", "isolation or avoiding needed introspection", "time alone may clarify what you truly want", "step back to see the bigger picture", "review spending thoughtfully and simply", "inner light guides your path", "Carve out quiet time to hear yourself."],
  ["Wheel of Fortune", "RWS_Tarot_10_Wheel_of_Fortune.jpg", ["cycles", "change", "destiny"], "a turning point and cycles moving in your favor", "resistance to change or a temporary low point", "a fateful shift in your romantic life", "change brings new openings", "fortunes shift — stay flexible", "life moves in cycles; trust the turning", "Flow with change rather than fighting it."],
  ["Justice", "RWS_Tarot_11_Justice.jpg", ["fairness", "truth", "balance"], "fairness, clarity and honest choices", "imbalance or avoiding accountability", "honesty and balance in relationships", "fair outcomes and clear agreements", "careful, fair financial decisions and documents", "cause and effect guide your growth", "Act with integrity and weigh things fairly."],
  ["The Hanged Man", "RWS_Tarot_12_Hanged_Man.jpg", ["pause", "surrender", "new perspective"], "a meaningful pause and a fresh perspective", "stalling or resisting a necessary pause", "seeing your relationship from a new angle", "a pause before the next move is wise", "wait before making big purchases", "surrender brings insight", "Look at the situation upside-down — new answers appear."],
  ["Death", "RWS_Tarot_13_Death.jpg", ["transformation", "endings", "renewal"], "transformation — one chapter gently closing so another can open", "clinging to what has already run its course", "a relationship evolving into a new form", "career transition and reinvention", "letting go of old financial habits", "a spiritual rebirth", "Release what is finished to make room for renewal."],
  ["Temperance", "RWS_Tarot_14_Temperance.jpg", ["balance", "moderation", "harmony"], "balance, patience and blending of opposites", "excess or feeling out of sync", "harmony and compromise in love", "steady, collaborative progress", "moderation brings stability", "inner alchemy and calm", "Find the middle path."],
  ["The Devil", "RWS_Tarot_15_Devil.jpg", ["attachment", "temptation", "shadow"], "awareness of attachments or habits that hold you", "breaking free and reclaiming your power", "notice patterns of dependency and choose freedom", "avoid feeling trapped — you have options", "be mindful of impulse spending", "facing your shadow with compassion", "Name what binds you — awareness loosens the chain."],
  ["The Tower", "RWS_Tarot_16_Tower.jpg", ["sudden change", "revelation", "awakening"], "sudden clarity that clears away false structures", "avoiding needed change or fearing disruption", "truth revealed can lead to more authentic love", "unexpected shifts may open better paths", "keep a safety net and stay adaptable", "an awakening that frees you", "Let what isn't solid fall; rebuild on truth."],
  ["The Star", "RWS_Tarot_17_Star.jpg", ["hope", "healing", "inspiration"], "hope, healing and renewed faith", "discouragement or disconnection from hope", "healing love and gentle optimism", "inspiration and recognition of your gifts", "gradual financial recovery", "divine guidance and serenity", "Keep your hope alive — you are being guided."],
  ["The Moon", "RWS_Tarot_18_Moon.jpg", ["intuition", "illusion", "dreams"], "a dreamy, uncertain phase where intuition matters most", "confusion lifting and truths coming to light", "clarify feelings before assuming", "gather facts before deciding", "double-check details and avoid risky moves", "dreams and symbols carry messages", "Trust intuition, but verify with facts."],
  ["The Sun", "RWS_Tarot_19_Sun.jpg", ["joy", "success", "vitality"], "joy, success and warm positivity", "temporary clouds over a bright outlook", "happiness and open-hearted connection", "success and visibility", "a positive outlook for resources", "radiant vitality and self-expression", "Let yourself shine and enjoy the moment."],
  ["Judgement", "RWS_Tarot_20_Judgement.jpg", ["awakening", "reckoning", "calling"], "an awakening and a call to rise into your next level", "self-criticism or ignoring a calling", "renewal through forgiveness", "answer your true calling", "review past decisions and learn", "a spiritual awakening", "Answer the call — you are ready."],
  ["The World", "RWS_Tarot_21_World.jpg", ["completion", "wholeness", "achievement"], "completion, fulfilment and a sense of wholeness", "unfinished business asking for closure", "wholeness and fulfilment in love", "achievement and completing a major goal", "reaching a financial milestone", "unity with the greater whole", "Celebrate how far you've come."],
];

const SUIT_INFO: Record<Exclude<Suit, "Major Arcana">, { element: string; theme: string; file: string; love: string; career: string; money: string; spirit: string }> = {
  Wands: { element: "Fire", theme: "passion, ambition and creative energy", file: "Wands", love: "passion and attraction", career: "ambition and bold projects", money: "entrepreneurial energy", spirit: "creative fire" },
  Cups: { element: "Water", theme: "emotions, relationships and intuition", file: "Cups", love: "emotional connection", career: "fulfilling, heart-led work", money: "emotional attitudes toward money", spirit: "intuitive flow" },
  Swords: { element: "Air", theme: "thoughts, communication and truth", file: "Swords", love: "honest communication", career: "strategy and decisions", money: "clear-headed planning", spirit: "mental clarity" },
  Pentacles: { element: "Earth", theme: "resources, body and material stability", file: "Pents", love: "loyalty and steady devotion", career: "craft and practical progress", money: "financial foundations", spirit: "grounded presence" },
};

type RankRow = [string, string[], string, string, string];
// [rankName, keywords, upright, reversed, advice]
const RANKS: RankRow[] = [
  ["Ace", ["potential", "seed", "gift"], "a pure new beginning in", "a delayed or blocked start in", "Welcome the new opportunity and plant the seed."],
  ["Two", ["choice", "balance", "partnership"], "balance and meaningful choices around", "indecision or imbalance around", "Weigh your options, then choose with care."],
  ["Three", ["growth", "collaboration", "expansion"], "early growth and collaboration in", "delays or misalignment in teamwork around", "Share your vision with others."],
  ["Four", ["stability", "rest", "foundation"], "stability and a pause to consolidate", "restlessness or over-holding in", "Rest and secure your foundation."],
  ["Five", ["challenge", "conflict", "change"], "a challenge that tests your", "recovery and moving past difficulty in", "Meet the challenge with patience — it will pass."],
  ["Six", ["harmony", "support", "progress"], "harmony, support and progress in", "imbalance of give-and-take in", "Accept help and offer it freely."],
  ["Seven", ["assessment", "perseverance", "strategy"], "perseverance and reflection on", "impatience or scattered efforts in", "Stay the course and reassess strategy."],
  ["Eight", ["movement", "mastery", "effort"], "focused movement and dedication in", "stuck energy or burnout in", "Put steady effort in one direction."],
  ["Nine", ["fulfilment", "resilience", "near-completion"], "near-fulfilment and resilience in", "worry or self-doubt about", "You're almost there — trust your resilience."],
  ["Ten", ["completion", "culmination", "legacy"], "a full cycle of completion in", "heaviness or a cycle needing release in", "Honor the ending and prepare for renewal."],
  ["Page", ["curiosity", "message", "study"], "curious new messages and learning in", "immaturity or unclear news around", "Stay curious and open to learning."],
  ["Knight", ["action", "pursuit", "adventure"], "energetic pursuit and action in", "rushing or stalling in", "Move forward, but mind your pace."],
  ["Queen", ["nurture", "mastery", "intuition"], "mature, nurturing mastery of", "insecurity or neglect of self in", "Lead with warmth and inner confidence."],
  ["King", ["leadership", "authority", "control"], "confident leadership and mastery of", "control issues or misuse of power in", "Lead wisely and responsibly."],
];

const NUM_WORDS = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const TAROT_DECK: TarotCard[] = [
  ...MAJORS.map(([name, file, keywords, up, rev, love, career, money, spiritual, advice], i) => ({
    id: slug(name), name, suit: "Major Arcana" as Suit, number: i, image: wm(file), keywords,
    upright: up, reversed: rev, love, career, money, spiritual, advice,
  })),
  ...(Object.keys(SUIT_INFO) as (keyof typeof SUIT_INFO)[]).flatMap((suit) => {
    const s = SUIT_INFO[suit];
    return RANKS.map(([rank, keywords, up, rev, advice], i) => {
      const name = `${NUM_WORDS[i]} of ${suit}`;
      return {
        id: slug(name), name, suit, number: i + 1,
        image: wm(`${s.file}${String(i + 1).padStart(2, "0")}.jpg`),
        keywords: [...keywords, s.element.toLowerCase()],
        upright: `${up} ${s.theme}`,
        reversed: `${rev} ${s.theme}`,
        love: `${keywords[0]} shaping ${s.love}`,
        career: `${keywords[1]} influencing ${s.career}`,
        money: `${keywords[2]} around ${s.money}`,
        spiritual: `${keywords[0]} awakening your ${s.spirit}`,
        advice,
      } satisfies TarotCard;
    });
  }),
];

export const POSITIONS = [
  { key: "past", title: "Past / Background", lens: "the roots of your current situation" },
  { key: "present", title: "Present Situation", lens: "where your energy is right now" },
  { key: "hidden", title: "Hidden Influence", lens: "a subtle force working beneath the surface" },
  { key: "advice", title: "Advice", lens: "the approach the cards suggest" },
  { key: "outcome", title: "Possible Outcome", lens: "where things may lead if the current path continues" },
] as const;
