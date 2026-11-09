import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { landingRedirect } from "@/i18n/negotiate";
import { routing } from "@/i18n/routing";

const intl = createMiddleware(routing);

// Our redirect rule (saved choice, then IP — spec §6.1–6.2) decides first;
// next-intl then maps the unprefixed Mongolian URLs onto the [locale] segment.
export default function proxy(req: NextRequest) {
  const target = landingRedirect({
    method: req.method,
    pathname: req.nextUrl.pathname,
    search: req.nextUrl.search,
    cookie: req.cookies.get("wire_lang")?.value,
    country: req.headers.get("x-wire-country"),
    userAgent: req.headers.get("user-agent"),
  });
  if (target) {
    // Next rewrites a same-origin Location to a relative one, so the http
    // scheme nginx proxies with never reaches the browser.
    const res = NextResponse.redirect(new URL(target, req.url), 307);
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }
  return intl(req);
}

// Pages only: not Next internals, API routes, the Sentry tunnel
// (/monitoring), the share image, or any file (a dot in the path — llms.txt,
// robots.txt, sitemap.xml, google*.html, icon.png).
export const config = {
  matcher: [
    "/((?!_next(?:/|$)|api(?:/|$)|monitoring(?:/|$)|opengraph-image|.*\\.).*)",
  ],
};
