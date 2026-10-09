"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Sparkles, History, User, CreditCard, Menu, X, Moon, Eye, BookOpen } from "lucide-react";
import { useApp } from "./Providers";
import LanguageSwitcher from "./LanguageSwitcher";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/reading", label: "Tarot Reading" },
  { href: "/meanings", label: "Card Meanings" },
  { href: "/#how", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/history", label: "Reading History" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="MysticTarot home">
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/60">
        <Moon className="h-4 w-4 text-gold" />
        <span className="absolute inset-0 rounded-full bg-violet/30 blur-md" />
      </span>
      <span className="flex flex-col leading-none"><span className="font-display text-2xl font-semibold text-gold-soft">MysticTarot</span><span className="text-[10px] tracking-wide text-white/60">Guidance for a Brighter You</span></span>
    </Link>
  );
}

export default function Nav() {
  const path = usePathname();
  const { user, reduced, setReduced } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl glass px-4 py-2.5 mx-3 md:mx-auto">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 text-sm transition hover:text-gold ${path === l.href ? "text-gold" : "text-white/75"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setReduced(!reduced)} aria-pressed={reduced} aria-label={reduced ? "Enable animations" : "Reduce motion"} title="Reduce motion" className="rounded-full p-2 text-white/70 hover:text-gold">
              <Eye className={`h-4 w-4 ${reduced ? "opacity-40" : ""}`} />
            </button>
            {user ? (
              <Link href="/profile" className="hidden items-center gap-2 rounded-full btn-ghost px-3 py-1.5 text-sm sm:flex">
                <User className="h-4 w-4" /> {user.name.split(" ")[0]} · <span className="text-gold">{user.credits + user.freeRemaining}</span> cr
              </Link>
            ) : (
              <Link href="/login" className="hidden rounded-full btn-ghost px-4 py-1.5 text-sm sm:block">Login</Link>
            )}
            <button className="rounded-full p-2 lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md lg:hidden" onClick={() => setOpen(false)}>
            <motion.nav aria-label="Mobile" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26 }} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-72 glass p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="mb-6 ml-auto block"><X /></button>
              <div className="mb-4"><LanguageSwitcher compact /></div>
              {[...LINKS, { href: user ? "/profile" : "/login", label: user ? "Profile" : "Login" }, { href: "/terms", label: "Terms" }, { href: "/privacy", label: "Privacy Policy" }].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-3 font-display text-xl text-white/85 hover:text-gold">{l.label}</Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav aria-label="Mobile bottom" className="fixed inset-x-3 bottom-3 z-50 flex justify-around rounded-2xl glass py-2 md:hidden">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/reading", icon: Sparkles, label: "Tarot" },
          { href: "/meanings", icon: BookOpen, label: "Meanings" },
          { href: "/#pricing", icon: CreditCard, label: "Pricing" },
          { href: "/history", icon: History, label: "History" },
          { href: user ? "/profile" : "/login", icon: User, label: user ? "Profile" : "Login" },
        ].map(({ href, icon: I, label }) => (
          <Link key={label} href={href} aria-label={label} className={`flex flex-col items-center gap-0.5 px-2 text-[10px] ${path === href ? "text-gold" : "text-white/70"}`}>
            <I className="h-5 w-5" />{label}
          </Link>
        ))}
      </nav>
    </>
  );
}
