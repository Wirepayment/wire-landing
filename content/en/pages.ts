import type { PageCopy, PublicPath, SiteCopy } from "@/lib/seo";

// English title and description of every public page, translated from
// content/mn/pages.ts. "/" and "/payments-in-mongolia" keep the wording of
// the former English /en and /en/payments-in-mongolia pages.
export const PAGES: Record<PublicPath, PageCopy> = {
  "/": {
    title: "Wire — payment gateway for Mongolia",
    description:
      "Accept bank-app, e-wallet, QR and card payments in Mongolia through one integration: payment links, hosted checkout, REST API and SDKs.",
  },
  "/features": {
    title: "Features — one connection, many channels",
    description:
      "QR, bank apps, cards, e-wallets and installments — QPay, PayLink, Toki, MonPay, StorePay and Pocket Zero through one API. Real-time notifications, reports and full MNT support.",
  },
  "/developers": {
    title: "For developers — API · SDK · webhook",
    description:
      "A clean REST API, SDKs in 6 languages + checkout JS/iOS, and signed webhooks. Take your first payment in 10 minutes.",
  },
  "/links": {
    title: "Payment links — ready in seconds",
    description:
      "Create a payment link in the dashboard and share it in chat, social posts or email. QR code and image previews — easy for anyone.",
  },
  "/guide": {
    title: "Getting started guide — from sign-up to taking payments",
    description:
      "The full sequence on Wire: sign up, verify with email, phone and DAN, create a project and switch on a payment channel — 19 steps with real screens.",
  },
  "/verification": {
    title: "Verification — email, phone and DAN (KYC)",
    description:
      "On Wire every owner verifies their email address with a one-time code, their phone number by SMS and their personal details through DAN, the state e-ID system. The data is stored encrypted.",
  },
  "/guides/online-payment": {
    title: "How to accept online payments on your website",
    description:
      "Accept QR, bank-app, card and e-wallet payments on your website or app through one connection — 5 steps from sign-up to the first payment.",
  },
  "/guides/payment-link": {
    title: "Take payments without a website — payment links",
    description:
      "If you sell on Facebook, Instagram or Messenger, create a payment link and share it. No developer needed; one link takes many payments.",
  },
  "/guides/card-payments": {
    title: "Accept online card payments in Mongolia",
    description:
      "Accept Visa, Mastercard and domestic cards. Activate the card payment channel in the dashboard and offer it on your links and checkout.",
  },
  "/guides/qr-payments": {
    title: "Add QR payments to your shop or app",
    description:
      "A QR code and bank-app deeplinks for every payment. Accept QR payments from Mongolia's payment operators through one connection.",
  },
  "/guides/payment-gateway": {
    title: "What is a payment gateway — many operators, one connection",
    description:
      "How a payment gateway works and how it differs from connecting to each operator separately. One API, one dashboard, one webhook.",
  },
  "/guides/platform": {
    title: "Payments for many merchants on platforms and marketplaces, one API",
    description:
      "Register your merchants through the API and create payments on their behalf. Each merchant is paid straight into its own account.",
  },
  "/payments-in-mongolia": {
    title: "How to accept online payments in Mongolia",
    description:
      "Sign up, verify once, activate an operator and take payments in MNT with hosted checkout, payment links or the Wire REST API.",
  },
  "/terms": {
    title: "Terms of service",
    description:
      "Wire (wire.mn) terms of service — account, verification (KYC), data protection, payment data and user obligations.",
  },
  "/status": {
    title: "Status",
    description:
      "The current state of Wire's services (API, dashboard, checkout, website).",
  },
};

export const SITE: SiteCopy = {
  keywords: [
    "WireMN",
    "Wire",
    "wire.mn",
    "payment gateway",
    "payments in Mongolia",
    "e-wallet",
    "BNPL",
    "payment API",
    "merchant",
    "Buildry",
  ],
  summary:
    "Wire is a payment gateway for businesses in Mongolia. One integration accepts payments through Mongolian payment operators — QR and bank apps (QPay), cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero) — with ready-made payment links or a REST API, and all revenue in one dashboard.",
  homeCrumb: "Home",
};
