import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import type { Guide } from "@/lib/guides";
import { GUIDES as MN } from "@/content/mn/guides";

// Real English: the former /en/payments-in-mongolia page, verbatim (its
// "Wire in English" link now points at the English home, "/" here).
export const PAYMENTS_IN_MONGOLIA: Guide = {
  slug: "/payments-in-mongolia",
  label: "Accept payments in Mongolia",
  badge: "Guide",
  line1: "How to accept online",
  line2: "payments in Mongolia",
  answer:
    "Wire is a payment gateway for Mongolia. A business or individual seller in Mongolia signs up at app.wire.mn, verifies the owner once (phone and DAN, the national e-ID), activates the payment operators it wants, and then takes payments through hosted checkout, payment links or a REST API. Buyers pay with bank apps, e-wallets, QR, cards or buy-now-pay-later, and the money goes to the business's own account.",
  stepsTitle: "From sign-up to the first payment",
  steps: [
    {
      title: "Sign up and verify once",
      body: "Sign in at app.wire.mn and verify the owner's phone and DAN identity. It is done once, however many businesses or projects you open later.",
    },
    {
      title: "Activate an operator",
      body: "For QPay or PayLink, submit your business details and payout bank account in the dashboard; after review you sign the agreement electronically and the connection goes live. For Toki, MonPay, StorePay or Pocket Zero, enter the keys from your own contract with the operator.",
    },
    {
      title: "Create a project and API key",
      body: "Each project has its own sk_live secret key and one webhook endpoint. The key is shown once — store it in a password manager.",
    },
    {
      title: "Send buyers to checkout",
      body: "Create a PaymentIntent on your server, open a checkout session and redirect the buyer to the hosted page on pay.wire.mn, which shows the QR code, bank-app deeplinks and every channel you switched on.",
    },
    {
      title: "Confirm with a webhook",
      body: "Your server receives payment_intent.succeeded, signed with HMAC-SHA256. Verify the signature, then fulfil the order.",
    },
  ],
  faqs: [
    {
      q: "Which payment methods can buyers use?",
      a: "QR and bank apps (QPay), cards — Visa, Mastercard and domestic cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero). QPay and PayLink are connected through Wire; the others with your own operator contract and keys, entered in the dashboard.",
    },
    {
      q: "What currency are amounts in?",
      a: "Mongolian tögrög (MNT), as whole numbers — MNT has no minor unit.",
    },
    {
      q: "Which languages have SDKs?",
      a: "Go, Python, Node.js, PHP, Ruby and .NET on the server, plus checkout SDKs for JavaScript and iOS. The API is described by an OpenAPI 3.1 spec.",
    },
    {
      q: "What does it cost?",
      a: "Sign-up, connecting accounts and the dashboard are free and there is no monthly fee. A fee applies only to successful transactions, starting from 1% depending on the connector; the exact rate is shown when you activate it.",
    },
    {
      q: "Can I take payments without a website?",
      a: "Yes. Create a payment link in the dashboard and share it in chat, social posts or email, or print its QR code.",
    },
    {
      q: "Who operates Wire?",
      a: "Buildry AI LLC (Билдрай Эй Ай ХХК).",
    },
  ],
  related: [
    { label: "Wire in English", href: "/" },
    { label: "Developer docs (English)", href: `${DOCS_URL}/en/docs` },
    { label: "Quickstart", href: `${DOCS_URL}/en/docs/quickstart` },
  ],
  cta: { label: "Get started", href: DASHBOARD_URL },
};

// TEMP until translations (B8): every other guide shows the Mongolian copy.
export const GUIDES: Guide[] = MN.map((g) =>
  g.slug === PAYMENTS_IN_MONGOLIA.slug ? PAYMENTS_IN_MONGOLIA : g,
);
