import type { Metadata } from "next";
import ReadingFlow from "@/components/reading/ReadingFlow";
export const metadata: Metadata = {
  title: "Tarot Readings for Love, Career, Money & More — Pick Your Life Stream",
  description: "Pick your life stream — love, career, money, family, business, emotions or relationship — and get a dedicated 5-card tarot reading tailored to that field, free 3 times a day.",
};
export default function Page() { return <ReadingFlow />; }
