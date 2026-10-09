import type { Metadata } from "next";
import { HowItWorks, Features } from "@/components/home/Sections";
export const metadata: Metadata = { title: "How It Works" };
export default function Page() { return <div className="pt-20"><HowItWorks /><Features /></div>; }
