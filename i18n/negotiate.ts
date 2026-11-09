// Pure locale negotiation for wire.mn — no Next imports, so proxy.ts and the
// tests share one rule. Spec §6.1–6.2 (2026-11-09 multilingual design).
import { ALLOWED_CRAWLERS } from "@/lib/crawlers";
import { isLocale, type Locale } from "./locales";

const ZH_COUNTRIES = new Set(["CN", "TW", "HK", "MO"]);

// Country comes from nginx's X-Wire-Country: one of MN, CN, TW, HK, MO, KR,
// or ZZ for any other public IP. Empty or absent (loopback, private ranges,
// local dev) means we know nothing, so Mongolian.
export function localeFromCountry(country: string | null | undefined): Locale {
  const c = (country ?? "").trim().toUpperCase();
  if (c === "" || c === "MN") return "mn";
  if (ZH_COUNTRIES.has(c)) return "zh";
  if (c === "KR") return "ko";
  return "en";
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|bingpreview|baiduspider|yeti|daum/i;
const CRAWLER_NAMES = ALLOWED_CRAWLERS.map((n) => n.toLowerCase());

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  if (BOT_PATTERN.test(userAgent)) return true;
  const ua = userAgent.toLowerCase();
  return CRAWLER_NAMES.some((n) => ua.includes(n));
}

function hasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/")[1];
  return isLocale(first);
}

// Returns the 307 target for an unprefixed (Mongolian) URL, or null to serve
// the page as asked. A saved choice (wire_lang) decides first: en/zh/ko go to
// their twin, mn stays (Ruling 23 — the choice always wins, spec §6.1). With
// no valid cookie the IP decides. A prefixed URL or a crawler is never
// redirected — crawlers must keep indexing Mongolian.
export function landingRedirect(req: {
  method: string;
  pathname: string;
  /** NextURL.search: "?a=1" with its leading "?", or "" when there is none. */
  search: string;
  cookie: string | undefined;
  country: string | null;
  userAgent: string | null;
}): string | null {
  const method = req.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return null;
  if (hasLocalePrefix(req.pathname)) return null;
  if (isBot(req.userAgent)) return null;
  const locale = isLocale(req.cookie)
    ? req.cookie
    : localeFromCountry(req.country);
  if (locale === "mn") return null;
  const path = req.pathname === "/" ? "" : req.pathname;
  return `/${locale}${path}${req.search}`;
}
