import type { Locale } from "@/i18n/locales";

// Locales whose translation has landed, so the cross-locale guards in
// test/translations.test.ts run for them. B8 adds "en", B9 "zh", B10 "ko";
// until then those guards are skipped (ko still shows Mongolian).
export const ENABLED_LOCALES: Locale[] = ["en", "zh"];

/** Every language translated from Mongolian. */
export const TRANSLATED_LOCALES = [
  "en",
  "zh",
  "ko",
] as const satisfies Locale[];
