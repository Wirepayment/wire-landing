import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { GUIDES } from "@/lib/guides";
import { PUBLIC_PAGES, absoluteUrl, pageMetadata } from "@/lib/seo";
import { guideJsonLd } from "@/lib/structured-data";
import { llmsTxt } from "@/lib/llms";
import mn from "@/messages/mn.json";
import { brandNames } from "./brand-names";

const registered = new Map<string, (typeof PUBLIC_PAGES)[number]>(
  PUBLIC_PAGES.map((p) => [p.path, p]),
);
const layout = readFileSync(
  path.resolve(import.meta.dirname, "../app/[locale]/(marketing)/layout.tsx"),
  "utf8",
);

describe("answer pages", () => {
  it("are all registered for sitemap/llms, in the right language", () => {
    for (const g of GUIDES) {
      const page = registered.get(g.path);
      expect(page, g.path).toBeDefined();
      expect(page && "lang" in page ? page.lang : "mn").toBe(g.lang);
    }
  });

  it("answer a question properly: short answer, steps, at least 4 FAQs", () => {
    for (const g of GUIDES) {
      expect(g.answer.length, g.path).toBeGreaterThan(120);
      expect(g.answer.length, g.path).toBeLessThan(480);
      expect(g.steps.length, g.path).toBeGreaterThanOrEqual(3);
      expect(g.faqs.length, g.path).toBeGreaterThanOrEqual(4);
      expect(new Set(g.faqs.map((f) => f.q)).size).toBe(g.faqs.length);
    }
  });

  it("link only to registered pages or absolute URLs", () => {
    for (const g of GUIDES) {
      for (const l of [...g.related, g.cta]) {
        if (l.href.startsWith("/")) {
          expect(registered.has(l.href), `${g.path} -> ${l.href}`).toBe(true);
        } else {
          expect(l.href).toMatch(/^(https?:|mailto:)/);
        }
      }
    }
  });

  it("are reachable from the footer (Mongolian pages + English entry)", () => {
    expect(layout).toContain('GUIDES.filter((g) => g.lang === "mn")');
    expect(layout).toContain('href="/en"');
  });

  it("name no competitor or non-connector brand", () => {
    expect(brandNames(JSON.stringify(GUIDES))).toEqual([]);
  });

  it("emit FAQPage JSON-LD identical to the visible FAQ", () => {
    for (const g of GUIDES) {
      const graph = guideJsonLd(g)["@graph"] as { "@type": string }[];
      expect(graph.map((n) => n["@type"])).toEqual([
        "WebPage",
        "BreadcrumbList",
        "FAQPage",
      ]);
      const faq = graph[2] as unknown as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      expect(
        faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]),
      ).toEqual(g.faqs.map((f) => [f.q, f.a]));
      expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|"review"/i);
    }
  });

  it("put each short answer in llms.txt with its URL", () => {
    const txt = llmsTxt();
    for (const g of GUIDES) {
      expect(txt).toContain(g.answer);
      expect(txt).toContain(absoluteUrl(g.path));
    }
  });

  it("pair the home page with /en via hreflang, English pages as en_US", () => {
    expect(pageMetadata("/").alternates?.languages).toEqual({
      mn: "https://wire.mn",
      en: "https://wire.mn/en",
      "x-default": "https://wire.mn",
    });
    expect(pageMetadata("/en").openGraph).toMatchObject({ locale: "en_US" });
    expect(
      pageMetadata("/guides/platform").alternates?.languages,
    ).toBeUndefined();
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
