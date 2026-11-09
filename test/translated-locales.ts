import type { Locale } from "@/i18n/locales";

// Locales whose translation has landed. translations.test.ts asserts this
// equals TRANSLATED_LOCALES, so dropping one fails loudly.
export const ENABLED_LOCALES: Locale[] = ["en", "zh", "ko"];

/** Every language translated from Mongolian. */
export const TRANSLATED_LOCALES = [
  "en",
  "zh",
  "ko",
] as const satisfies Locale[];
