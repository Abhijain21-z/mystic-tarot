"use client";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface MeUser { id: number; name: string; email: string; credits: number; freeRemaining: number }
interface Ctx {
  reduced: boolean; setReduced: (v: boolean) => void;
  user: MeUser | null; guestFreeRemaining: number; loaded: boolean; refresh: () => Promise<void>;
}
const AppCtx = createContext<Ctx>({ reduced: false, setReduced: () => {}, user: null, guestFreeRemaining: 2, loaded: false, refresh: async () => {} });
export const useApp = () => useContext(AppCtx);

export default function Providers({ children }: { children: ReactNode }) {
  const [reduced, setR] = useState(false);
  const [user, setUser] = useState<MeUser | null>(null);
  const [guestFreeRemaining, setG] = useState(2);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/me", { cache: "no-store" });
      const d = await r.json();
      setUser(d.user); setG(d.guestFreeRemaining ?? 0);
    } finally { setLoaded(true); }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("reduce-motion");
    const initial = saved ? saved === "1" : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setR(initial);
    refresh();
  }, [refresh]);

  useEffect(() => { document.documentElement.classList.toggle("reduce-motion", reduced); }, [reduced]);
  const setReduced = (v: boolean) => { setR(v); localStorage.setItem("reduce-motion", v ? "1" : "0"); };

  return (
    <AppCtx.Provider value={{ reduced, setReduced, user, guestFreeRemaining, loaded, refresh }}>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>{children}</MotionConfig>
    </AppCtx.Provider>
  );
}
