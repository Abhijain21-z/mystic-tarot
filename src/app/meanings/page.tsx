"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, BookOpen, Sparkles } from "lucide-react";
import { TAROT_DECK, POSITIONS, type TarotCard, type Suit } from "@/data/tarot";
import { CARD_BACK_SRC } from "@/components/TarotCardFace";
import { useApp } from "@/components/Providers";

const SUITS: Suit[] = ["Major Arcana", "Wands", "Cups", "Swords", "Pentacles"];
const SUIT_ICONS: Record<Suit, string> = {
  "Major Arcana": "✦",
  Wands: "🔥",
  Cups: "💧",
  Swords: "⚔️",
  Pentacles: "💎",
};
const SUIT_COLORS: Record<Suit, string> = {
  "Major Arcana": "from-violet-500 to-pink-500",
  Wands: "from-orange-500 to-red-500",
  Cups: "from-blue-400 to-cyan-400",
  Swords: "from-slate-400 to-violet-400",
  Pentacles: "from-green-400 to-emerald-500",
};

function CardModal({ card, isOpen, onClose }: { card: TarotCard; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="card-modal-title" className="font-display text-3xl text-gold-soft">{card.name}</h2>
            <p className="mt-1 text-white/60">{card.suit} {card.suit !== "Major Arcana" ? `• ${card.number}` : ""}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-white/50 hover:text-gold hover:bg-white/10 transition"
            aria-label="Close"
          >
            <Sparkles className="h-6 w-6" />
          </button>
        </div>

        {/* Card Image */}
        <div className="relative mx-auto mb-6 aspect-[2/3] max-w-xs">
          <img
            src={card.image}
            alt={`${card.name} tarot card`}
            className="w-full h-full object-cover rounded-xl border-2 border-gold/60 shadow-[0_0_40px_rgba(232,194,106,0.4)]"
          />
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-6">
          {card.keywords.map((k) => (
            <span
              key={k}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gold/20 to-violet/20 text-gold-soft border border-gold/30"
            >
              {k}
            </span>
          ))}
        </div>

        {/* Meanings Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <MeaningCard title="Upright" icon="⬆️" color="text-green-400" content={card.upright} />
          <MeaningCard title="Reversed" icon="⬇️" color="text-rose-400" content={card.reversed} />
          <MeaningCard title="Love" icon="💖" color="text-pink-400" content={card.love} />
          <MeaningCard title="Career" icon="💼" color="text-blue-400" content={card.career} />
          <MeaningCard title="Money" icon="💰" color="text-yellow-400" content={card.money} />
          <MeaningCard title="Spiritual" icon="✨" color="text-purple-400" content={card.spiritual} />
        </div>

        {/* Advice */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-gold/10 to-violet/10 border border-gold/30">
          <p className="font-display text-lg text-gold-soft mb-2">💫 Advice</p>
          <p className="text-white/80">{card.advice}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MeaningCard({ title, icon, color, content }: { title: string; icon: string; color: string; content: string }) {
  return (
    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h3 className={`font-display text-lg ${color}`}>{title}</h3>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{content}</p>
    </div>
  );
}

function CardTile({ card, onClick }: { card: TarotCard; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col items-center p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(232,194,106,0.2)] transition-all duration-300"
      aria-label={`View ${card.name} meaning`}
    >
      <div className="relative w-24 h-36 mb-3 overflow-hidden rounded-lg border-2 border-gold/40 shadow-[0_0_20px_rgba(232,194,106,0.3)]">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="text-center w-full">
        <p className="font-display text-sm font-semibold text-gold-soft leading-tight">{card.name}</p>
        <p className="text-[11px] text-white/50 capitalize">{card.suit.toLowerCase()}</p>
      </div>
    </motion.button>
  );
}

export default function MeaningsPage() {
  const { reduced } = useApp();
  const [search, setSearch] = useState("");
  const [selectedSuit, setSelectedSuit] = useState<Suit | "all">("all");
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const filteredCards = TAROT_DECK.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
    const matchesSuit = selectedSuit === "all" || card.suit === selectedSuit;
    return matchesSearch && matchesSuit;
  });

  const cardsBySuit = SUITS.reduce((acc, suit) => {
    acc[suit] = filteredCards.filter((c) => c.suit === suit);
    return acc;
  }, {} as Record<Suit, TarotCard[]>);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pt-28 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-black/40 mb-4">
          <BookOpen className="h-5 w-5 text-gold" />
          <span className="font-display text-lg text-gold-soft">Card Meanings Reference</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          All 78 Cards & Their <span className="text-gradient-gold">Predictions</span>
        </h1>
        <p className="mt-3 text-lg text-white/60 max-w-2xl mx-auto">
          Explore the complete Rider-Waite-Smith deck. Click any card to see upright, reversed, love, career, money & spiritual meanings.
        </p>
      </motion.header>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards, keywords, meanings..."
            className="w-full px-10 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:border-gold/50 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <select
            value={selectedSuit}
            onChange={(e) => setSelectedSuit(e.target.value as Suit | "all")}
            className="appearance-none w-full sm:w-48 px-10 py-3 pr-8 rounded-xl glass border border-white/10 text-white bg-black/40 focus:border-gold/50 focus:outline-none cursor-pointer"
          >
            <option value="all">All Suits</option>
            {SUITS.map((s) => (
              <option key={s} value={s}>{SUIT_ICONS[s]} {s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
        </div>
      </motion.div>

      {/* Results Count */}
      <p className="mb-6 text-center text-white/50">
        Showing <span className="text-gold font-semibold">{filteredCards.length}</span> of 78 cards
      </p>

      {/* Cards by Suit */}
      <AnimatePresence mode="wait">
        {SUITS.map((suit) => {
          const cards = cardsBySuit[suit];
          if (cards.length === 0) return null;

          return (
            <motion.section
              key={suit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${SUIT_COLORS[suit]}`}>
                  {SUIT_ICONS[suit]}
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-gold-soft">{suit}</h2>
                  <p className="text-white/50">{cards.length} card{cards.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: reduced ? 0 : i * 0.03, type: "spring", damping: 20 }}
                  >
                    <CardTile card={card} onClick={() => setSelectedCard(card)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </AnimatePresence>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Sparkles className="mx-auto h-16 w-16 text-white/30 mb-4" />
          <h3 className="font-display text-2xl text-white/60 mb-2">No cards found</h3>
          <p className="text-white/40">Try adjusting your search or filter</p>
        </motion.div>
      )}

      {/* Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <CardModal card={selectedCard} isOpen={true} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}