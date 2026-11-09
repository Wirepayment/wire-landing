import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { guidesFor } from "@/lib/guides";
import { PUBLIC_PAGES, absoluteUrl, localizedPath } from "@/lib/seo";
import { guideJsonLd } from "@/lib/structured-data";
import { llmsTxt } from "@/lib/llms";
import { LOCALES } from "@/i18n/locales";
import mn from "@/messages/mn.json";
import { brandNames } from "./brand-names";

const registered = new Set<string>(PUBLIC_PAGES.map((p) => p.path));
const layout = readFileSync(
  path.resolve(import.meta.dirname, "../app/[locale]/(marketing)/layout.tsx"),
  "utf8",
);

describe.each(LOCALES)("answer pages (%s)", (locale) => {
  const guides = guidesFor(locale);

  it("are all registered for sitemap/llms", () => {
    for (const g of guides) expect(registered.has(g.slug), g.slug).toBe(true);
  });

  it("answer a question properly: short answer, steps, at least 4 FAQs", () => {
    for (const g of guides) {
      expect(g.answer.length, g.slug).toBeGreaterThan(120);
      expect(g.answer.length, g.slug).toBeLessThan(480);
      expect(g.steps.length, g.slug).toBeGreaterThanOrEqual(3);
      expect(g.faqs.length, g.slug).toBeGreaterThanOrEqual(4);
      expect(new Set(g.faqs.map((f) => f.q)).size).toBe(g.faqs.length);
    }
  });

  it("link only to registered pages or absolute URLs", () => {
    for (const g of guides) {
      for (const l of [...g.related, g.cta]) {
        if (l.href.startsWith("/")) {
          expect(registered.has(l.href), `${g.slug} -> ${l.href}`).toBe(true);
        } else {
          expect(l.href).toMatch(/^(https?:|mailto:)/);
        }
      }
    }
  });

  it("name no competitor or non-connector brand", () => {
    expect(brandNames(JSON.stringify(guides))).toEqual([]);
  });

  it("emit FAQPage JSON-LD identical to the visible FAQ", () => {
    for (const g of guides) {
      const graph = guideJsonLd(locale, g)["@graph"] as { "@type": string }[];
      expect(graph.map((n) => n["@type"])).toEqual([
        "WebPage",
        "BreadcrumbList",
        "FAQPage",
      ]);
      expect(graph[0]).toMatchObject({
        url: absoluteUrl(localizedPath(locale, g.slug)),
      });
      const faq = graph[2] as unknown as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      expect(
        faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]),
      ).toEqual(g.faqs.map((f) => [f.q, f.a]));
      expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|"review"/i);
    }
  });
});

describe("answer pages everywhere", () => {
  it("are reachable from the footer in the visitor's language", () => {
    expect(layout).toContain("guidesFor(locale).map(");
    // The language picker replaces the old hard-coded English link.
    expect(layout).not.toContain('href="/en"');
  });

  it("put each Mongolian and English short answer in llms.txt with its URL", () => {
    const txt = llmsTxt();
    for (const locale of ["mn", "en"] as const) {
      for (const g of guidesFor(locale)) {
        expect(txt).toContain(g.answer);
        expect(txt).toContain(absoluteUrl(localizedPath(locale, g.slug)));
      }
    }
  });
});

describe("closing CTA", () => {
  it("does not call live card payments 'coming soon'", () => {
    const cta = readFileSync(
      path.resolve(import.meta.dirname, "../components/home/final-cta.tsx"),
      "utf8",
    );
    // Live items have no roadmap flag; the label itself is in the messages.
    expect(cta).toContain('{ label: "cards" }');
    expect(mn.home.finalCta.items.cards).toBe("Картын төлбөр");
  });
});
