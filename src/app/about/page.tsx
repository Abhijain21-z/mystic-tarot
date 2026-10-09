import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { DISCLAIMER } from "@/components/Footer";
export const metadata: Metadata = { title: "About", description: "About MysticTarot tarot readings." };
export default function Page() {
  return (
    <Prose eyebrow="Our Story" title="About MysticTarot">
      <p>MysticTarot is a cinematic, interactive tarot experience built for reflection. We use the complete 78-card tarot — 22 Major Arcana and 56 Minor Arcana — with meanings that shift according to each card&apos;s position and whether it lands upright or reversed.</p>
      <h2>Our artwork</h2>
      <p>Card images come from the Rider–Waite–Smith deck illustrated by Pamela Colman Smith (1909), which is in the public domain. Our interface, card backs and animations are original.</p>
      <h2>Our philosophy</h2>
      <p>Tarot is a mirror, not a verdict. Our language is supportive and never alarming. {DISCLAIMER}</p>
    </Prose>
  );
}
