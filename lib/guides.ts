import type { Locale } from "@/i18n/locales";
import type { PublicPath } from "@/lib/seo";
import { GUIDES as MN } from "@/content/mn/guides";
import { GUIDES as EN } from "@/content/en/guides";
import { GUIDES as ZH } from "@/content/zh/guides";
import { GUIDES as KO } from "@/content/ko/guides";

// Answer pages: each one answers a single question merchants (or AI answer
// engines on their behalf) actually ask. The copy is the page, the FAQPage
// JSON-LD and the llms.txt entry at once — one source, so they never drift.
// Copy per language lives in content/<locale>/guides.ts; Mongolian is the
// source and the others mirror it (test/locale-parity.test.ts).

export interface GuideStep {
  title: string;
  body: string;
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideLink {
  label: string;
  /** A locale-agnostic wire.mn path ("/developers") or an absolute URL. */
  href: string;
}

export interface Guide {
  /** The page path without a locale prefix ("/guides/qr-payments"). */
  slug: PublicPath;
  /** Footer / breadcrumb label. */
  label: string;
  badge: string;
  line1: string;
  line2: string;
  /** The short, direct answer — the paragraph an AI answer would quote. */
  answer: string;
  stepsTitle: string;
  steps: GuideStep[];
  points?: { title: string; items: string[] };
  faqs: GuideFaq[];
  related: GuideLink[];
  cta: GuideLink;
}

const GUIDES: Record<Locale, Guide[]> = {
  mn: MN,
  en: EN,
  zh: ZH,
  ko: KO,
};

export function guidesFor(locale: Locale): Guide[] {
  return GUIDES[locale];
}

export function guide(locale: Locale, slug: PublicPath): Guide {
  const g = GUIDES[locale].find((x) => x.slug === slug);
  if (!g) throw new Error(`unknown guide: ${locale} ${slug}`);
  return g;
}
