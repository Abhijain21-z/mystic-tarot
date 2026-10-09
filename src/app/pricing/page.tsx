import type { Metadata } from "next";
import { Pricing, Disclaimer } from "@/components/home/Sections";
export const metadata: Metadata = { title: "Pricing", description: "First 2 tarot readings free. $1 per reading or $50 for 500 credits." };
export default function Page() { return <div className="pt-20"><Pricing /><Disclaimer /></div>; }
