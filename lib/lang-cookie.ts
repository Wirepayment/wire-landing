// The wire_lang cookie the language picker writes, and the URL it goes to.
// Pure (no Next or DOM imports) so the picker and the tests share one rule.
import { localizedPath, type Locale } from "@/i18n/locales";

/** The cookie wire.mn's picker and the dashboard share. */
export const LANG_COOKIE = "wire_lang";

const ONE_YEAR = 31_536_000;

/** The cookie's attributes. On wire.mn hosts it is scoped to .wire.mn so
 *  wire.mn and app.wire.mn share the choice; elsewhere (localhost, and a
 *  look-alike such as evilwire.mn) it carries no Domain. Same rule as the
 *  dashboard's langCookieOptions. */
export function langCookieOptions(host: string): {
  path: "/";
  maxAge: number;
  sameSite: "lax";
  domain?: ".wire.mn";
} {
  const hostname = host.replace(/:\d+$/, "").toLowerCase();
  const shared = hostname === "wire.mn" || hostname.endsWith(".wire.mn");
  return {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
    ...(shared ? { domain: ".wire.mn" as const } : {}),
  };
}

/** The `document.cookie` string recording an explicit language choice. */
export function langCookie(locale: Locale, host: string): string {
  const o = langCookieOptions(host);
  return [
    `${LANG_COOKIE}=${locale}`,
    `Path=${o.path}`,
    `Max-Age=${o.maxAge}`,
    "SameSite=Lax",
    ...(o.domain ? [`Domain=${o.domain}`] : []),
  ].join("; ");
}

/** Where the picker sends the visitor: the same page in the target language,
 *  query string kept. `search` may come with or without its leading "?". */
export function switchHref(
  target: Locale,
  pathnameWithoutLocale: string,
  search: string,
): string {
  const query = search.replace(/^\?/, "");
  const path = localizedPath(target, pathnameWithoutLocale);
  return query ? `${path}?${query}` : path;
}
