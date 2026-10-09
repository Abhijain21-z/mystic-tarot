import Link from "next/link";

export const DISCLAIMER = "Tarot readings are for entertainment, reflection and personal guidance only. They are not a guaranteed prediction or professional medical, legal or financial advice.";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/10 pb-28 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-deco text-xl text-gold-soft">MysticTarot</p>
          <p className="mt-3 max-w-md text-sm text-white/60">{DISCLAIMER}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <Link href="/reading" className="hover:text-gold">Check Your Tarot</Link>
          <Link href="/#pricing" className="hover:text-gold">Pricing</Link>
          <Link href="/about" className="hover:text-gold">About</Link>
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/70">
          <Link href="/terms" className="hover:text-gold">Terms</Link>
          <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
          <Link href="/history" className="hover:text-gold">Reading History</Link>
          <Link href="/profile" className="hover:text-gold">Profile</Link>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/40">© {new Date().getFullYear()} MysticTarot. Card art: Rider–Waite–Smith deck (1909), public domain.</p>
    </footer>
  );
}
