import { COMPANY, CONTACT } from "@/lib/company";
import { connectorModesFor, connectorsFor } from "@/lib/connectors";
import { faqsFor } from "@/lib/faq";
import { guidesFor } from "@/lib/guides";
import {
  DOCS_SITE_URL,
  PUBLIC_PAGES,
  absoluteUrl,
  localizedPath,
  pagesFor,
  siteFor,
} from "@/lib/seo";
import type { Locale } from "@/i18n/locales";

// llms.txt (https://llmstxt.org) — the plain-text map AI answer engines read
// before (or instead of) the HTML. Same facts as the pages: page list from the
// sitemap registry, answers from the visible FAQ, connectors from
// lib/connectors.ts — a Mongolian part, then the same in English (both from
// content/<locale>). Public material — connector names are allowed on wire.mn
// (owner decision 2026-11-08), competitor brand names are not.

/** The headings of one language's part. */
const HEADINGS = {
  mn: {
    channels: "Төлбөрийн сувгууд",
    connection: "Холболт",
    pages: "Хуудсууд",
    answers: "Товч хариултууд",
    more: "Дэлгэрэнгүй",
    faq: "Түгээмэл асуултууд",
  },
  en: {
    channels: "Payment channels (English)",
    connection: "Connection",
    pages: "Pages (English)",
    answers: "Short answers (English)",
    more: "More",
    faq: "Frequently asked questions (English)",
  },
} as const satisfies Partial<Record<Locale, Record<string, string>>>;

type LlmsLocale = keyof typeof HEADINGS;

/** The English part's overview after the summary: how each channel is
 *  connected, the developer surface and the price — facts the Mongolian
 *  pages state (connectors, /developers, the FAQ). */
const ENGLISH_DETAILS =
  "QPay (QR code and bank apps) and PayLink (Visa, Mastercard and domestic cards) are connected through Wire. Toki and MonPay (e-wallets), StorePay and Pocket Zero (buy-now-pay-later) are connected with the merchant's own operator agreement and keys, and the money goes straight to the merchant's operator account; Wire never holds it. Merchants use ready-made payment links or a REST API (OpenAPI 3.1, SDKs for Go, Python, Node.js, PHP, Ruby and .NET, checkout SDKs for JavaScript and iOS, signed webhooks) and see all revenue in one dashboard. Amounts are in Mongolian tögrög (MNT), as whole numbers. Sign-up, account connection and the dashboard are free; a fee applies only to successful transactions.";

function channels(locale: LlmsLocale): string[] {
  const h = HEADINGS[locale];
  const modes = connectorModesFor(locale);
  return [
    `## ${h.channels}`,
    "",
    ...connectorsFor(locale).map(
      (c) =>
        `- ${c.name} — ${c.category}. ${c.desc} ${h.connection}: ${modes[c.mode].label}.`,
    ),
    "",
    ...Object.values(modes).map((m) => `- ${m.label}: ${m.hint}`),
    "",
  ];
}

function pages(locale: LlmsLocale): string[] {
  const copy = pagesFor(locale);
  return [
    `## ${HEADINGS[locale].pages}`,
    "",
    ...PUBLIC_PAGES.map(
      (p) =>
        `- [${copy[p.path].title}](${absoluteUrl(localizedPath(locale, p.path))}): ${copy[p.path].description}`,
    ),
    "",
  ];
}

function answers(locale: LlmsLocale): string[] {
  const h = HEADINGS[locale];
  return [
    `## ${h.answers}`,
    "",
    ...guidesFor(locale).flatMap((g) => [
      `### ${g.line1} ${g.line2}`,
      "",
      `${g.answer} ${h.more}: ${absoluteUrl(localizedPath(locale, g.slug))}`,
      "",
    ]),
  ];
}

function faq(locale: LlmsLocale): string[] {
  return [
    `## ${HEADINGS[locale].faq}`,
    "",
    ...faqsFor(locale).flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
}

export function llmsTxt(): string {
  return [
    "# Wire (wire.mn)",
    "",
    `> ${siteFor("mn").summary}`,
    "",
    `Хэл: Монгол (баримт бичиг Монгол, англи). Зах зээл: Монгол Улс. Валют: төгрөг (MNT). Хөгжүүлж ажиллуулдаг: ${COMPANY.nameMn} (${COMPANY.nameEn}), улсын бүртгэлийн дугаар ${COMPANY.registerNo}.`,
    "",
    ...channels("mn"),
    ...pages("mn"),
    ...answers("mn"),
    "## Хөгжүүлэгчийн баримт бичиг",
    "",
    `- [Wire Docs](${DOCS_SITE_URL}/docs): API, SDK, webhook, гарын авлага (Монгол).`,
    `- [Wire Docs (English)](${DOCS_SITE_URL}/en/docs): the same reference in English.`,
    `- [Docs llms.txt](${DOCS_SITE_URL}/llms.txt): баримт бичгийн хуудсуудын жагсаалт.`,
    `- [Docs llms-full.txt](${DOCS_SITE_URL}/llms-full.txt): баримт бичгийн бүрэн текст нэг файлд.`,
    "- [OpenAPI 3.1 spec](https://raw.githubusercontent.com/buildry-wire/spec/main/openapi.yaml): REST API-ийн албан ёсны тодорхойлолт.",
    "",
    ...faq("mn"),
    "## Холбоо барих",
    "",
    `- Имэйл: ${CONTACT.email}`,
    `- Утас: ${CONTACT.phone}`,
    `- Бүртгүүлэх, нэвтрэх: https://app.wire.mn`,
    "",
    "## English",
    "",
    siteFor("en").summary,
    "",
    ENGLISH_DETAILS,
    "",
    `The site is also in English (${absoluteUrl(localizedPath("en", "/"))}), Chinese (${absoluteUrl(localizedPath("zh", "/"))}) and Korean (${absoluteUrl(localizedPath("ko", "/"))}). Developer documentation: ${DOCS_SITE_URL}/en/docs`,
    "",
    ...channels("en"),
    ...pages("en"),
    ...answers("en"),
    ...faq("en"),
  ].join("\n");
}
