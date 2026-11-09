import type { PageCopy, PublicPath, SiteCopy } from "@/lib/seo";
import { PAGES as MN, SITE as MN_SITE } from "@/content/mn/pages";

// English titles and descriptions. "/" and "/payments-in-mongolia" are real
// English, verbatim from the former /en and /en/payments-in-mongolia pages;
// every other page is TEMP until translations (B8) and shows the Mongolian
// copy.
export const PAGES: Record<PublicPath, PageCopy> = {
  ...MN,
  "/": {
    title: "Wire — payment gateway for Mongolia",
    description:
      "Accept bank-app, e-wallet, QR and card payments in Mongolia through one integration: payment links, hosted checkout, REST API and SDKs.",
  },
  "/payments-in-mongolia": {
    title: "How to accept online payments in Mongolia",
    description:
      "Sign up, verify once, activate an operator and take payments in MNT with hosted checkout, payment links or the Wire REST API.",
  },
};

export const SITE: SiteCopy = {
  // TEMP until translations: the Mongolian keyword list.
  keywords: MN_SITE.keywords,
  // Real English: the former /en page's short answer.
  summary:
    "Wire is a payment gateway for businesses in Mongolia. One integration accepts payments through Mongolian payment operators — QR and bank apps (QPay), cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero) — with ready-made payment links or a REST API, and all revenue in one dashboard.",
  homeCrumb: "Home",
};
