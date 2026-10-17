import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/Seo";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "MysticTarot",
      url: "https://tarot-reader-pied.vercel.app",
      potentialAction: { "@type": "SearchAction", target: "https://tarot-reader-pied.vercel.app/meanings?q={search_term_string}", "query-input": "required name=search_term_string" },
    },
    {
      "@type": "Organization",
      name: "MysticTarot",
      url: "https://tarot-reader-pied.vercel.app",
      description: "Free online tarot card readings with the full 78-card Rider–Waite deck.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tarot-reader-pied.vercel.app"),
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
        <JsonLd data={ORG_JSONLD} />
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
