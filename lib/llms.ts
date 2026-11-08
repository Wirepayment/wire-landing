import { COMPANY, CONTACT } from "@/lib/company";
import { CONNECTORS, CONNECTOR_MODES } from "@/lib/connectors";
import { FAQS } from "@/lib/faq";
import { GUIDES } from "@/lib/guides";
import { DOCS_SITE_URL, PUBLIC_PAGES, absoluteUrl } from "@/lib/seo";

// llms.txt (https://llmstxt.org) — the plain-text map AI answer engines read
// before (or instead of) the HTML. Same facts as the pages: page list from the
// sitemap registry, answers from the visible FAQ, connectors from
// lib/connectors.ts. Public material — connector names are allowed on wire.mn
// (owner decision 2026-11-08), competitor brand names are not.

export function llmsTxt(): string {
  const pages = PUBLIC_PAGES.map(
    (p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`,
  );
  const connectors = CONNECTORS.map(
    (c) =>
      `- ${c.name} — ${c.category}. ${c.desc} Холболт: ${CONNECTOR_MODES[c.mode].label}.`,
  );
  const modes = Object.values(CONNECTOR_MODES).map(
    (m) => `- ${m.label}: ${m.hint}`,
  );
  const faq = FAQS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]);
  const answers = GUIDES.flatMap((g) => [
    `### ${g.line1} ${g.line2}`,
    "",
    `${g.answer} Дэлгэрэнгүй: ${absoluteUrl(g.path)}`,
    "",
  ]);

  return [
    "# Wire (wire.mn)",
    "",
    "> Wire бол Монголын бизнесүүдэд зориулсан төлбөрийн гарц (payment gateway): QR код, банкны апп, карт, цахим хэтэвч, хуваан төлөх зэрэг Монголын төлбөрийн операторуудаар нэг холболтоор төлбөр хүлээн авна. Бэлэн төлбөрийн линк эсвэл REST API, орлого нэг dashboard-д.",
    "",
    `Хэл: Монгол (баримт бичиг Монгол, англи). Зах зээл: Монгол Улс. Валют: төгрөг (MNT). Хөгжүүлж ажиллуулдаг: ${COMPANY.nameMn} (${COMPANY.nameEn}), улсын бүртгэлийн дугаар ${COMPANY.registerNo}.`,
    "",
    "## Төлбөрийн сувгууд",
    "",
    ...connectors,
    "",
    ...modes,
    "",
    "## Хуудсууд",
    "",
    ...pages,
    "",
    "## Товч хариултууд / Short answers",
    "",
    ...answers,
    "## Хөгжүүлэгчийн баримт бичиг",
    "",
    `- [Wire Docs](${DOCS_SITE_URL}/docs): API, SDK, webhook, гарын авлага (Монгол).`,
    `- [Wire Docs (English)](${DOCS_SITE_URL}/en/docs): the same reference in English.`,
    `- [Docs llms.txt](${DOCS_SITE_URL}/llms.txt): баримт бичгийн хуудсуудын жагсаалт.`,
    `- [Docs llms-full.txt](${DOCS_SITE_URL}/llms-full.txt): баримт бичгийн бүрэн текст нэг файлд.`,
    "- [OpenAPI 3.1 spec](https://raw.githubusercontent.com/buildry-wire/spec/main/openapi.yaml): REST API-ийн албан ёсны тодорхойлолт.",
    "",
    "## Түгээмэл асуултууд",
    "",
    ...faq,
    "## Холбоо барих",
    "",
    `- Имэйл: ${CONTACT.email}`,
    `- Утас: ${CONTACT.phone}`,
    `- Бүртгүүлэх, нэвтрэх: https://app.wire.mn`,
    "",
    "## English summary",
    "",
    "Wire is a payment gateway for businesses in Mongolia. One integration accepts payments through Mongolian payment operators: QPay (QR code and bank apps) and PayLink (Visa, Mastercard and domestic cards), connected through Wire; Toki and MonPay (e-wallets), StorePay and Pocket Zero (buy-now-pay-later), connected with the merchant's own operator contract and keys, with money paid straight to the merchant's operator account. Merchants use ready-made payment links or a REST API (OpenAPI 3.1, SDKs for Go, Python, Node.js, PHP, Ruby and .NET, signed webhooks) and see all revenue in one dashboard. Amounts are in Mongolian tögrög (MNT). Sign-up, account connection and the dashboard are free; a fee applies only to successful transactions. Developer documentation: https://docs.wire.mn/en/docs",
    "",
  ].join("\n");
}
