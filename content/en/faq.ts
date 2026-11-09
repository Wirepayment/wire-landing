import type { Faq } from "@/lib/faq";
import { FAQS as MN } from "@/content/mn/faq";

// Home-page FAQ in English, one entry per Mongolian question, same order.
// Entries marked "real English" come verbatim from the former /en page (the
// English guide that "/en" used to be); the rest are TEMP until translations
// (B8) and still show the Mongolian copy.
export const FAQS: Faq[] = [
  // Real English (former /en).
  {
    q: "Is there a sign-up or monthly fee?",
    a: "No. Sign-up, connecting accounts and the dashboard are free. A fee applies only to successful transactions, starting from 1% depending on the connector.",
  },
  // TEMP until translations.
  MN[1]!,
  // Real English (former /en).
  {
    q: "How do I start?",
    a: "Sign up at app.wire.mn, verify the owner once with phone and DAN (Mongolia's national e-ID), connect a payout bank account and activate an operator. Then use payment links or the API.",
  },
  // Real English (former /en).
  {
    q: "Do I need a developer?",
    a: "No. Payment links work from the dashboard alone. The API and SDKs are there when you want to integrate checkout into a website or app.",
  },
  // TEMP until translations.
  MN[4]!,
  MN[5]!,
  // Real English (former /en).
  {
    q: "Is my data safe?",
    a: "Personal data is stored encrypted with AES-256 and not shared with third parties. Every webhook carries a signature so you can verify each notification.",
  },
];
