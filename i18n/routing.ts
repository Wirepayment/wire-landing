import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./locales";

// Mongolian keeps its unprefixed URLs; /en, /zh and /ko carry a prefix.
// Language detection and the wire_lang cookie are ours (negotiate.ts and the
// picker), so next-intl neither reads Accept-Language nor writes a cookie.
// Its HTTP Link header is off too: it disagreed with the pages' own
// alternates (hreflang "zh" vs "zh-Hans", the www host, 404s carrying them),
// so pageMetadata()'s <link rel="alternate"> tags are the one source.
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});
