import type { Metadata } from "next";
import ReadingFlow from "@/components/reading/ReadingFlow";
export const metadata: Metadata = { title: "Check Your Tarot Cards — 5 Card Reading", description: "Spin the mystical deck, choose 5 cards and reveal your personalized tarot reading." };
export default function Page() { return <ReadingFlow />; }
