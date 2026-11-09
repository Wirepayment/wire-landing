import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { LOCALES } from "@/i18n/locales";
import { guidesFor } from "@/lib/guides";
import { faqsFor } from "@/lib/faq";
import { connectorsFor, connectorModesFor } from "@/lib/connectors";
import {
  PUBLIC_PAGES,
  localizedPath,
  pageMetadata,
  pagesFor,
  siteFor,
  sitemapEntries,
} from "@/lib/seo";

// Every page exists in mn, en, zh and ko, with the same structure. Mongolian
// is the source; a translation adds no page, step or question of its own.

const appDir = path.resolve(import.meta.dirname, "../app/[locale]");

/** Today's Mongolian URLs (lib/seo.ts PUBLIC_PAGES at 14da613), minus the two
 *  former English-only pages, plus the new Mongolian /payments-in-mongolia.
 *  A Mongolian URL that moves loses its search ranking. */
const MN_URLS_FROZEN = [
  "/",
  "/features",
  "/developers",
  "/links",
  "/guide",
  "/verification",
  "/guides/online-payment",
  "/guides/payment-link",
  "/guides/card-payments",
  "/guides/qr-payments",
  "/guides/payment-gateway",
  "/guides/platform",
  // "/en" — now the English home page (the en twin of "/").
  // "/en/payments-in-mongolia" — now the en twin of the line below.
  "/payments-in-mongolia",
  "/terms",
  "/status",
].sort();

const keys = (o: object) => Object.keys(o).sort();

describe("per-locale content mirrors Mongolian", () => {
  const mnGuides = guidesFor("mn");

  it.each(LOCALES)("%s: same guides, steps and FAQ counts", (l) => {
    const g = guidesFor(l);
    expect(g.map((x) => x.slug)).toEqual(mnGuides.map((x) => x.slug));
    expect(g.map((x) => x.steps.length)).toEqual(
      mnGuides.map((x) => x.steps.length),
    );
    expect(g.map((x) => x.faqs.length)).toEqual(
      mnGuides.map((x) => x.faqs.length),
    );
    expect(g.map((x) => x.related.length)).toEqual(
      mnGuides.map((x) => x.related.length),
    );
    expect(g.map((x) => x.points?.items.length)).toEqual(
      mnGuides.map((x) => x.points?.items.length),
    );
  });

  it.each(LOCALES)("%s: same home FAQ count", (l) => {
    expect(faqsFor(l)).toHaveLength(faqsFor("mn").length);
  });

  it.each(LOCALES)("%s: pages.ts has the same keys", (l) => {
    expect(keys(pagesFor(l))).toEqual(keys(pagesFor("mn")));
    expect(keys(siteFor(l))).toEqual(keys(siteFor("mn")));
  });

  it.each(LOCALES)("%s: connector copy for every connector and mode", (l) => {
    expect(connectorsFor(l).map((c) => c.id)).toEqual(
      connectorsFor("mn").map((c) => c.id),
    );
    expect(keys(connectorModesFor(l))).toEqual(keys(connectorModesFor("mn")));
  });

  it("registers a title and description for every public page", () => {
    for (const l of LOCALES) {
      expect(keys(pagesFor(l))).toEqual(PUBLIC_PAGES.map((p) => p.path).sort());
    }
  });
});

describe("URLs", () => {
  it("localizedPath: Mongolian unprefixed, the rest under /<locale>", () => {
    expect(localizedPath("mn", "/")).toBe("/");
    expect(localizedPath("mn", "/features")).toBe("/features");
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("zh", "/guides/qr-payments")).toBe(
      "/zh/guides/qr-payments",
    );
    expect(localizedPath("ko", "/payments-in-mongolia")).toBe(
      "/ko/payments-in-mongolia",
    );
  });

  it("keeps every Mongolian URL where it was", () => {
    expect(PUBLIC_PAGES.map((p) => localizedPath("mn", p.path)).sort()).toEqual(
      MN_URLS_FROZEN,
    );
  });

  it("keeps the English URL of payments-in-mongolia", () => {
    expect(localizedPath("en", "/payments-in-mongolia")).toBe(
      "/en/payments-in-mongolia",
    );
  });

  // A visitor redirected from a Mongolian deep link must land on a page.
  it("has a page.tsx under app/[locale] for every public path", () => {
    for (const p of PUBLIC_PAGES) {
      const rel = p.path === "/" ? "" : p.path;
      const candidates = [
        path.join(appDir, "(marketing)", rel, "page.tsx"),
        path.join(appDir, rel, "page.tsx"),
      ];
      expect(candidates.some(existsSync), p.path).toBe(true);
    }
  });

  it("prerenders app/[locale] for all four locales", () => {
    const layout = readFileSync(path.join(appDir, "layout.tsx"), "utf8");
    expect(layout).toContain("LOCALES.map((locale) => ({ locale }))");
    expect([...LOCALES]).toEqual(["mn", "en", "zh", "ko"]);
  });
});

describe("pageMetadata", () => {
  it("canonical is the localized URL, x-default the Mongolian one", () => {
    const meta = pageMetadata("zh", "/features");
    expect(meta.alternates?.canonical).toBe("https://wire.mn/zh/features");
    expect(meta.alternates?.languages).toEqual({
      mn: "https://wire.mn/features",
      en: "https://wire.mn/en/features",
      "zh-Hans": "https://wire.mn/zh/features",
      ko: "https://wire.mn/ko/features",
      "x-default": "https://wire.mn/features",
    });
    expect(meta.openGraph?.url).toBe("https://wire.mn/zh/features");
  });

  it("sets og:locale per language", () => {
    const og = (l: (typeof LOCALES)[number]) =>
      (pageMetadata(l, "/").openGraph as { locale?: string }).locale;
    expect(LOCALES.map(og)).toEqual(["mn_MN", "en_US", "zh_CN", "ko_KR"]);
  });

  it("home: the bare origin for mn, /en for English", () => {
    expect(pageMetadata("mn", "/").alternates?.canonical).toBe(
      "https://wire.mn",
    );
    expect(pageMetadata("en", "/").alternates?.canonical).toBe(
      "https://wire.mn/en",
    );
  });
});

describe("sitemap.xml", () => {
  it("lists every page in every locale, each with its hreflang set", () => {
    const entries = sitemapEntries();
    expect(entries).toHaveLength(PUBLIC_PAGES.length * 4);
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
    const zh = entries.find((e) => e.url === "https://wire.mn/zh/features");
    expect(zh?.alternates?.languages).toEqual({
      mn: "https://wire.mn/features",
      en: "https://wire.mn/en/features",
      "zh-Hans": "https://wire.mn/zh/features",
      ko: "https://wire.mn/ko/features",
      "x-default": "https://wire.mn/features",
    });
  });
});
