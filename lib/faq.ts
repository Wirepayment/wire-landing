import type { Locale } from "@/i18n/locales";
import { FAQS as MN } from "@/content/mn/faq";
import { FAQS as EN } from "@/content/en/faq";
import { FAQS as ZH } from "@/content/zh/faq";
import { FAQS as KO } from "@/content/ko/faq";

// Home-page FAQ per language (content/<locale>/faq.ts). Rendered by
// components/home/faq.tsx and reused verbatim by the FAQPage JSON-LD and
// llms.txt — structured data must match the visible text.

export interface Faq {
  q: string;
  a: string;
}

const FAQS: Record<Locale, Faq[]> = { mn: MN, en: EN, zh: ZH, ko: KO };

export function faqsFor(locale: Locale): Faq[] {
  return FAQS[locale];
}
