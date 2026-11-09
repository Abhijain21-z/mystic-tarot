import type { Metadata } from "next";
import ReadingFlow from "@/components/reading/ReadingFlow";
export const metadata: Metadata = {
  title: "Tarot Readings for Love, Career, Money & More — Pick Your Life Stream",
  description: "Pick your life stream — love, career, money, family, business, emotions or relationship — and get a dedicated 10-card deep tarot reading tailored to that field, free and unlimited.",
};
export default function Page() { return <ReadingFlow />; }
