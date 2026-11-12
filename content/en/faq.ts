import type { Faq } from "@/lib/faq";

// Home-page FAQ in English, one entry per Mongolian question in
// content/mn/faq.ts, same order. Where the former English /en page answered
// the same question, its wording is kept.
export const FAQS: Faq[] = [
  {
    q: "Is there a sign-up or monthly fee?",
    a: "No. Sign-up, connecting accounts and the dashboard are free, and there are no usage or monthly fees. A fee applies only to successful transactions.",
  },
  {
    q: "What is the transaction fee?",
    a: "It starts from 1%, depending on the payment channel you choose. The exact rate is shown in that channel's terms when you connect your account — there are no hidden fees.",
  },
  {
    q: "How do I start?",
    a: "Sign up and verify the owner once with email, phone and DAN (state e-ID). Then connect the account that receives your revenue and start taking payments with ready-made links or the API.",
  },
  {
    q: "Do I need a developer?",
    a: "No. Ready-made payment links are easy for anyone: create one in the dashboard in seconds and share it in chat, social posts or email.",
  },
  {
    q: "Which channels can I take payments through?",
    a: "QPay (QR code, bank apps), PayLink (Visa, Mastercard, domestic cards), Toki and MonPay (e-wallets), StorePay and Pocket Zero (installments). QPay and PayLink are connected through Wire; the others you connect from the dashboard with your own agreement and keys from the payment operator. Transactions from every channel come through one connection into one dashboard.",
  },
  {
    q: "When does the revenue reach my account?",
    a: "It depends on the terms of the payment channel you choose. Every transaction shows in the dashboard in real time, and the revenue goes to the account you connected.",
  },
  {
    q: "Is my data safe?",
    a: "Personal data is stored encrypted with AES-256 and not shared with third parties. Every webhook carries a signature so you can verify each notification.",
  },
];
