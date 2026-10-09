import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { DISCLAIMER } from "@/components/Footer";
export const metadata: Metadata = { title: "Terms of Service" };
export default function Page() {
  return (
    <Prose eyebrow="Legal" title="Terms of Service">
      <h2>1. Entertainment purpose</h2><p>{DISCLAIMER}</p>
      <h2>2. Accounts</h2><p>You are responsible for keeping your credentials secure. You may delete your account at any time from your profile.</p>
      <h2>3. Readings & credits</h2><p>Each new user receives 2 free readings. After that, each reading costs 1 credit. Credits can be purchased at $1 USD each or $50 USD for 500 credits. Credits are non-transferable and consumed only when a reading is successfully generated.</p>
      <h2>4. Payments</h2><p>Payments are processed securely by Stripe. We never store your card details. Refund requests can be made through our contact page within 14 days for unused credits.</p>
      <h2>5. Age</h2><p>You must be at least 18 years old, or have parental consent, to purchase credits.</p>
    </Prose>
  );
}
