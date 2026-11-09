import type { Metadata } from "next";
import { Pricing, Disclaimer } from "@/components/home/Sections";
export const metadata: Metadata = { title: "Pricing", description: "Every tarot reading is free — unlimited. The only paid option: a $1 PDF download of any reading." };
export default function Page() { return <div className="pt-20"><Pricing /><Disclaimer /></div>; }
