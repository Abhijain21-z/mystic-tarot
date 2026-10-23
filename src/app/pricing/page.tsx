import type { Metadata } from "next";
import { Pricing, Disclaimer } from "@/components/home/Sections";
export const metadata: Metadata = { title: "Pricing", description: "3 free tarot readings every day. Beyond that $1 per reading or $50 for 100 credits." };
export default function Page() { return <div className="pt-20"><Pricing /><Disclaimer /></div>; }
