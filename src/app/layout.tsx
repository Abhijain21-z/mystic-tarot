import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "MysticTarot — Free Tarot Card Reading | Discover What the Cards Reveal", template: "%s | MysticTarot Tarot" },
  description: "Interactive 5-card tarot reading with a full 78-card deck. Love, career, money and spiritual insights. First 2 readings free.",
  keywords: ["tarot card reading", "free tarot reading", "5 card tarot spread", "tarot meanings", "love tarot", "online tarot"],
  openGraph: { title: "MysticTarot — Tarot Card Reading", description: "Choose five cards. Explore your energy, choices and possibilities.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#07040f" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <Providers>
          <Starfield />
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
