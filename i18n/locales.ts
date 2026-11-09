// wire.mn languages. Mongolian is the default and keeps its unprefixed URLs;
// the others live under /en, /zh and /ko.
export const LOCALES = ["mn", "en", "zh", "ko"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "mn";

export function isLocale(x: unknown): x is Locale {
  return typeof x === "string" && (LOCALES as readonly string[]).includes(x);
}

export const HTML_LANG: Record<Locale, string> = {
  mn: "mn",
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
};

// Each language names itself; these are never translated.
export const LOCALE_NAMES: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

/** A page's URL path in one language: Mongolian keeps the bare path, the
 *  others gain /en, /zh or /ko ("/" becomes "/en"). */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}
