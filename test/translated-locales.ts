import type { Locale } from "@/i18n/locales";

// Locales whose translation has landed, so the cross-locale guards in
// test/translations.test.ts run for them. All three are translated.
export const ENABLED_LOCALES: Locale[] = ["en", "zh", "ko"];

/** Every language translated from Mongolian. */
export const TRANSLATED_LOCALES = [
  "en",
  "zh",
  "ko",
] as const satisfies Locale[];
