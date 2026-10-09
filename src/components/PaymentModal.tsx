"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Lock } from "lucide-react";
import BuyButton from "./BuyButton";

export default function PaymentModal({ open, mode, onClose }: { open: boolean; mode: "payment" | "login"; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="glass relative w-full max-w-md rounded-3xl p-7">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-white/60 hover:text-white"><X /></button>
            {mode === "login" ? (
              <>
                <h2 id="pm-title" className="font-display text-3xl">Your free readings are complete</h2>
                <p className="mt-2 text-white/70">Create a free profile to save your readings and continue with credits ($1 per reading, or $50 for 500).</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/login?mode=register&next=/reading" className="btn-glow rounded-full px-6 py-3 text-center">Create Profile</Link>
                  <Link href="/login?next=/reading" className="btn-ghost rounded-full px-6 py-3 text-center">I already have an account</Link>
                </div>
              </>
            ) : (
              <>
                <h2 id="pm-title" className="font-display text-3xl">Continue Your Journey</h2>
                <p className="mt-2 text-white/70">You have no free readings or credits left. <strong className="text-gold-soft">1 reading = 1 credit.</strong></p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 p-4">
                    <div className="mb-3 flex justify-between"><span>1 credit</span><span className="font-semibold text-gold">$1.00 USD</span></div>
                    <BuyButton pack="single" className="btn-ghost">Pay $1 for 1 Reading</BuyButton>
                  </div>
                  <div className="rounded-2xl border border-gold/40 bg-gold/5 p-4">
                    <div className="mb-3 flex justify-between"><span>500 credits <span className="text-xs text-gold">best value</span></span><span className="font-semibold text-gold">$50.00 USD</span></div>
                    <BuyButton pack="pack500" className="btn-glow">Buy 500 Credits</BuyButton>
                  </div>
                </div>
                <p className="mt-4 flex items-center justify-center gap-1 text-xs text-white/50"><Lock className="h-3 w-3" />Secure checkout by PayPal. One-time charge, no subscription.</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
