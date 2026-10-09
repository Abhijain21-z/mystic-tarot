import Link from "next/link";
import { XCircle } from "lucide-react";
export const metadata = { title: "Payment Cancelled" };
export default function Page() {
  return (
    <div className="mx-auto max-w-lg px-6 pt-40 text-center">
      <div className="glass rounded-3xl p-10">
        <XCircle className="mx-auto h-14 w-14 text-white/60" />
        <h1 className="mt-4 font-display text-4xl">Payment Cancelled</h1>
        <p className="mt-2 text-white/70">No charge was made. You can return whenever you&apos;re ready.</p>
        <div className="mt-6 flex justify-center gap-3"><Link href="/#pricing" className="btn-glow rounded-full px-6 py-3">View Pricing</Link><Link href="/" className="btn-ghost rounded-full px-6 py-3">Home</Link></div>
      </div>
    </div>
  );
}
