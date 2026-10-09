import type { Metadata } from "next";
import Prose from "@/components/Prose";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <Prose eyebrow="Legal" title="Privacy Policy">
      <h2>What we collect</h2><p>Your name, email, a securely hashed password, your reading history and payment records (amount, credits, PayPal order ID). We never see or store card numbers.</p>
      <h2>Cookies</h2><p>We use a secure, http-only session cookie to keep you signed in and an anonymous guest cookie to track free readings before you sign up.</p>
      <h2>How we use it</h2><p>Only to provide readings, maintain your history and credits, and respond to your messages. We do not sell your data.</p>
      <h2>Deletion</h2><p>You can permanently delete your account and all readings from your profile page at any time.</p>
    </Prose>
  );
}
