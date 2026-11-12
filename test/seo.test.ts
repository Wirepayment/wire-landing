import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  PUBLIC_PAGES,
  SITE_URL,
  absoluteUrl,
  localizedPath,
  pageMetadata,
  pagesFor,
  sitemapEntries,
  TRANSLATED_ON,
} from "@/lib/seo";
import { LOCALES } from "@/i18n/locales";
import robots from "@/app/robots";
import { ALLOWED_CRAWLERS } from "@/lib/crawlers";
import { displayLength } from "./display-length";
import { llmsTxt } from "@/lib/llms";
import { homeJsonLd } from "@/lib/structured-data";
import { faqsFor } from "@/lib/faq";
import { brandNames } from "./brand-names";

const appDir = path.resolve(import.meta.dirname, "../app");

/** Every `page.tsx` under app/, as its public route ("/features"). */
function pageRoutes(dir = appDir): { route: string; file: string }[] {
  const out: { route: string; file: string }[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...pageRoutes(full));
    else if (name === "page.tsx") {
      const segs = path
        .relative(appDir, dir)
        .split(path.sep)
        .filter((s) => s && !s.startsWith("(") && s !== "[locale]");
      out.push({ route: `/${segs.join("/")}`, file: full });
    }
  }
  return out;
}

describe("public page registry", () => {
  it("lists every page.tsx, and every page uses pageMetadata", () => {
    const routes = pageRoutes();
    expect(routes.map((r) => r.route).sort()).toEqual(
      PUBLIC_PAGES.map((p) => p.path).sort(),
    );
    for (const { route, file } of routes) {
      const src = readFileSync(file, "utf8");
      expect(src, file).toContain(`pageMetadata(locale, "${route}")`);
    }
  });

  it("gives each page its own canonical and og:url (not the homepage)", () => {
    for (const l of LOCALES) {
      for (const p of PUBLIC_PAGES) {
        const meta = pageMetadata(l, p.path);
        const url = absoluteUrl(localizedPath(l, p.path));
        expect(meta.alternates?.canonical).toBe(url);
        expect(meta.openGraph?.url).toBe(url);
        // A page-level openGraph drops the root's file-based share image.
        expect(JSON.stringify(meta.openGraph)).toContain("/opengraph-image");
        expect(JSON.stringify(meta.twitter)).toContain("/opengraph-image");
      }
    }
  });

  it("counts a CJK character as two Latin letters of display length", () => {
    expect(displayLength("Wire")).toBe(4);
    expect(displayLength("支付网关。")).toBe(10);
    expect(displayLength("결제 채널")).toBe(9);
  });

  it("keeps descriptions in the length search engines display", () => {
    for (const l of LOCALES) {
      for (const [path, page] of Object.entries(pagesFor(l))) {
        expect(displayLength(page.description), `${l} ${path}`).toBeGreaterThan(
          50,
        );
        expect(
          displayLength(page.description),
          `${l} ${path}`,
        ).toBeLessThanOrEqual(260);
      }
    }
  });

  it("does not let the root layout set a canonical every page inherits", () => {
    for (const f of ["layout.tsx", "[locale]/layout.tsx"]) {
      const layout = readFileSync(path.join(appDir, f), "utf8");
      expect(layout, f).not.toMatch(/canonical/);
    }
  });
});

describe("sitemap.xml", () => {
  it("lists every public page in every locale with a stable, valid lastmod", () => {
    const entries = sitemapEntries();
    expect(entries.map((e) => e.url).sort()).toEqual(
      LOCALES.flatMap((l) =>
        PUBLIC_PAGES.map((p) => absoluteUrl(localizedPath(l, p.path))),
      ).sort(),
    );
    for (const e of entries) {
      const d = e.lastModified as Date;
      expect(Number.isNaN(d.getTime())).toBe(false);
      expect(d.getTime()).toBeLessThanOrEqual(Date.now());
    }
    // Stable across calls — not "now" on every request.
    expect(sitemapEntries()).toEqual(entries);
  });

  // mn keeps each page's own `updated`; en/zh/ko were written on
  // TRANSLATED_ON, so their lastmod is never older than that.
  it("dates mn by the page and translations by the translation", () => {
    const lastmod = (l: (typeof LOCALES)[number], path: string) => {
      const url = absoluteUrl(localizedPath(l, path));
      const e = sitemapEntries().find((x) => x.url === url);
      return (e?.lastModified as Date).toISOString().slice(0, 10);
    };
    expect(TRANSLATED_ON).toBe("2026-11-09");
    for (const p of PUBLIC_PAGES) {
      expect(lastmod("mn", p.path), p.path).toBe(p.updated);
      const want = p.updated > TRANSLATED_ON ? p.updated : TRANSLATED_ON;
      for (const l of ["en", "zh", "ko"] as const) {
        expect(lastmod(l, p.path), `${l}${p.path}`).toBe(want);
      }
    }
    expect(lastmod("en", "/verification")).toBe("2026-11-09");
    expect(lastmod("mn", "/verification")).toBe("2026-07-30");
  });
});

describe("robots.txt", () => {
  it("names the search and AI crawlers and points at the sitemap", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const named = rules.flatMap((rule) =>
      Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent],
    );
    for (const bot of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot"]) {
      expect(named).toContain(bot);
    }
    expect(named).toEqual(expect.arrayContaining([...ALLOWED_CRAWLERS, "*"]));
    for (const rule of rules) expect(rule.disallow).toBeUndefined();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("llms.txt", () => {
  const txt = llmsTxt();

  it("links every public page (Mongolian and English) and the docs llms files", () => {
    for (const l of ["mn", "en"] as const) {
      for (const p of PUBLIC_PAGES) {
        expect(txt).toContain(`(${absoluteUrl(localizedPath(l, p.path))})`);
      }
    }
    expect(txt).toContain("https://docs.wire.mn/llms.txt");
    expect(txt).toContain("https://docs.wire.mn/llms-full.txt");
    expect(txt.startsWith("# Wire")).toBe(true);
  });

  it("carries the visible Mongolian and English FAQ verbatim", () => {
    for (const f of [...faqsFor("mn"), ...faqsFor("en")]) {
      expect(txt).toContain(f.q);
      expect(txt).toContain(f.a);
    }
  });

  it("names no competitor or non-connector brand", () => {
    expect(brandNames(txt)).toEqual([]);
  });
});

describe.each(LOCALES)("home JSON-LD (%s)", (locale) => {
  const ld = homeJsonLd(locale);
  const json = JSON.stringify(ld);
  const graph = ld["@graph"] as { "@type": string }[];

  it("describes the organization, site, service and FAQ", () => {
    expect(graph.map((n) => n["@type"])).toEqual([
      "Organization",
      "WebSite",
      "Service",
      "FAQPage",
    ]);
  });

  it("FAQPage matches the visible FAQ exactly", () => {
    const faq = graph.find((n) => n["@type"] === "FAQPage") as unknown as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(
      faqsFor(locale).map((f) => [f.q, f.a]),
    );
  });

  it("invents no ratings or reviews and names no competitor", () => {
    expect(json).not.toMatch(/aggregateRating|"review"/i);
    expect(brandNames(json)).toEqual([]);
  });
});
