import type { Metadata, MetadataRoute } from "next";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  localizedPath,
  type Locale,
} from "@/i18n/locales";
import { PAGES as MN_PAGES, SITE as MN_SITE } from "@/content/mn/pages";
import { PAGES as EN_PAGES, SITE as EN_SITE } from "@/content/en/pages";
import { PAGES as ZH_PAGES, SITE as ZH_SITE } from "@/content/zh/pages";
import { PAGES as KO_PAGES, SITE as KO_SITE } from "@/content/ko/pages";

// One registry for every public wire.mn page. Page metadata, canonical URLs,
// hreflang, sitemap.xml and llms.txt all read from here, so a page cannot be
// listed in one place and missing in another. Every page exists in all four
// languages; titles and descriptions live in content/<locale>/pages.ts.
//
// `updated` is the date the page's content last changed (YYYY-MM-DD). Bump it
// when you edit the page's copy — search engines stop trusting lastmod that
// moves on every deploy. en/zh/ko were written on TRANSLATED_ON, so their
// lastmod is the later of that and the page's `updated`; mn keeps `updated`.

export const SITE_URL = "https://wire.mn";
export const SITE_NAME = "WireMN";
export const DOCS_SITE_URL = "https://docs.wire.mn";

/** The day the en/zh/ko translations landed (YYYY-MM-DD). */
export const TRANSLATED_ON = "2026-11-09";

export interface PublicPage {
  /** The path without a locale prefix; each locale serves it (mn unprefixed). */
  path: string;
  priority: number;
  updated: string;
}

export const PUBLIC_PAGES = [
  { path: "/", priority: 1, updated: "2026-11-08" },
  { path: "/features", priority: 0.9, updated: "2026-11-08" },
  { path: "/developers", priority: 0.9, updated: "2026-10-12" },
  { path: "/links", priority: 0.8, updated: "2026-09-09" },
  { path: "/guide", priority: 0.8, updated: "2026-11-12" },
  { path: "/verification", priority: 0.7, updated: "2026-07-30" },
  { path: "/guides/online-payment", priority: 0.8, updated: "2026-11-08" },
  { path: "/guides/payment-link", priority: 0.8, updated: "2026-11-08" },
  { path: "/guides/card-payments", priority: 0.8, updated: "2026-11-08" },
  { path: "/guides/qr-payments", priority: 0.8, updated: "2026-11-08" },
  { path: "/guides/payment-gateway", priority: 0.8, updated: "2026-11-08" },
  { path: "/guides/platform", priority: 0.7, updated: "2026-10-25" },
  { path: "/payments-in-mongolia", priority: 0.7, updated: "2026-11-09" },
  { path: "/terms", priority: 0.4, updated: "2026-11-12" },
  { path: "/status", priority: 0.3, updated: "2026-07-30" },
] as const satisfies readonly PublicPage[];

export type PublicPath = (typeof PUBLIC_PAGES)[number]["path"];

/** A page's title and description in one language (content/<locale>/pages.ts). */
export interface PageCopy {
  title: string;
  description: string;
}

/** Site-wide copy in one language (content/<locale>/pages.ts). */
export interface SiteCopy {
  keywords: string[];
  summary: string;
  homeCrumb: string;
}

const PAGES: Record<Locale, Record<PublicPath, PageCopy>> = {
  mn: MN_PAGES,
  en: EN_PAGES,
  zh: ZH_PAGES,
  ko: KO_PAGES,
};

const SITES: Record<Locale, SiteCopy> = {
  mn: MN_SITE,
  en: EN_SITE,
  zh: ZH_SITE,
  ko: KO_SITE,
};

export function pagesFor(locale: Locale): Record<PublicPath, PageCopy> {
  return PAGES[locale];
}

export function siteFor(locale: Locale): SiteCopy {
  return SITES[locale];
}

export function publicPage(path: PublicPath): PublicPage {
  const page = PUBLIC_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`unknown public page: ${path}`);
  return page;
}

// The share card from app/opengraph-image.tsx. A page that sets its own
// `openGraph` replaces the root's wholesale, file-based image included, so
// every page names it explicitly.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "wire.mn — All-in-one Payment Gateway",
};

/** og:locale per language. */
export const OG_LOCALE: Record<Locale, string> = {
  mn: "mn_MN",
  en: "en_US",
  zh: "zh_CN",
  ko: "ko_KR",
};

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

// Lives in i18n/locales.ts (no page copy) so client components can use it.
export { localizedPath };

/** hreflang map for a page: every language, x-default = the Mongolian URL. */
function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES)
    out[HTML_LANG[l]] = absoluteUrl(localizedPath(l, path));
  out["x-default"] = absoluteUrl(localizedPath(DEFAULT_LOCALE, path));
  return out;
}

/** Metadata for a public page in one language: its own canonical URL, the
 *  hreflang set and share card. Without this, every page inherited the root
 *  layout's canonical (the homepage) and told search engines it was a
 *  duplicate of `/`. */
export function pageMetadata(locale: Locale, path: PublicPath): Metadata {
  const copy = PAGES[locale][path];
  const url = absoluteUrl(localizedPath(locale, path));
  return {
    title: path === "/" ? { absolute: copy.title } : copy.title,
    description: copy.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      url,
      title: copy.title,
      description: copy.description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [SHARE_IMAGE.url],
    },
  };
}

function lastmodOf(locale: Locale, updated: string): string {
  if (locale === DEFAULT_LOCALE) return updated;
  return updated > TRANSLATED_ON ? updated : TRANSLATED_ON;
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.flatMap((p) =>
    LOCALES.map((l) => ({
      url: absoluteUrl(localizedPath(l, p.path)),
      lastModified: new Date(`${lastmodOf(l, p.updated)}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: p.priority,
      alternates: { languages: languageAlternates(p.path) },
    })),
  );
}
