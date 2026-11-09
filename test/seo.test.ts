import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  PUBLIC_PAGES,
  SITE_URL,
  absoluteUrl,
  pageMetadata,
  sitemapEntries,
} from "@/lib/seo";
import robots from "@/app/robots";
import { ALLOWED_CRAWLERS } from "@/lib/crawlers";
import { llmsTxt } from "@/lib/llms";
import { homeJsonLd } from "@/lib/structured-data";
import { FAQS } from "@/lib/faq";
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

// The English pages are still registered under /en (lib/seo.ts is reworked for
// four languages later); their files now live once under app/[locale].
const withoutLocale = (p: string) =>
  p.replace(/^\/(?:en|zh|ko)(?=\/|$)/, "") || "/";

describe("public page registry", () => {
  it("lists every page.tsx, and every page uses pageMetadata", () => {
    const routes = pageRoutes();
    const registered = [
      ...new Set(PUBLIC_PAGES.map((p) => withoutLocale(p.path))),
    ].sort();
    expect(routes.map((r) => r.route).sort()).toEqual(registered);
    for (const { route, file } of routes) {
      const src = readFileSync(file, "utf8");
      const calls = PUBLIC_PAGES.filter(
        (p) => withoutLocale(p.path) === route,
      ).map((p) => `pageMetadata("${p.path}")`);
      expect(
        calls.some((c) => src.includes(c)),
        file,
      ).toBe(true);
    }
  });

  it("gives each page its own canonical and og:url (not the homepage)", () => {
    for (const p of PUBLIC_PAGES) {
      const meta = pageMetadata(p.path);
      const url = p.path === "/" ? SITE_URL : `${SITE_URL}${p.path}`;
      expect(meta.alternates?.canonical).toBe(url);
      expect(meta.openGraph?.url).toBe(url);
      // A page-level openGraph drops the root's file-based share image.
      expect(JSON.stringify(meta.openGraph)).toContain("/opengraph-image");
      expect(JSON.stringify(meta.twitter)).toContain("/opengraph-image");
    }
  });

  it("keeps descriptions in the length search engines display", () => {
    for (const p of PUBLIC_PAGES) {
      expect(p.description.length, p.path).toBeGreaterThan(50);
      expect(p.description.length, p.path).toBeLessThanOrEqual(260);
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
  it("lists every public page with a stable, valid lastmod", () => {
    const entries = sitemapEntries();
    expect(entries.map((e) => e.url)).toEqual(
      PUBLIC_PAGES.map((p) => absoluteUrl(p.path)),
    );
    for (const e of entries) {
      const d = e.lastModified as Date;
      expect(Number.isNaN(d.getTime())).toBe(false);
      expect(d.getTime()).toBeLessThanOrEqual(Date.now());
    }
    // Stable across calls — not "now" on every request.
    expect(sitemapEntries()).toEqual(entries);
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

  it("links every public page and the docs llms files", () => {
    for (const p of PUBLIC_PAGES) expect(txt).toContain(absoluteUrl(p.path));
    expect(txt).toContain("https://docs.wire.mn/llms.txt");
    expect(txt).toContain("https://docs.wire.mn/llms-full.txt");
    expect(txt.startsWith("# Wire")).toBe(true);
  });

  it("carries the visible FAQ verbatim", () => {
    for (const f of FAQS) {
      expect(txt).toContain(f.q);
      expect(txt).toContain(f.a);
    }
  });

  it("names no competitor or non-connector brand", () => {
    expect(brandNames(txt)).toEqual([]);
  });
});

describe("home JSON-LD", () => {
  const ld = homeJsonLd();
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
      FAQS.map((f) => [f.q, f.a]),
    );
  });

  it("invents no ratings or reviews and names no competitor", () => {
    expect(json).not.toMatch(/aggregateRating|"review"/i);
    expect(brandNames(json)).toEqual([]);
  });
});
