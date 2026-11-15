import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  BLOG_POSTS,
  blogPost,
  blogPostJsonLd,
  blogPostMetadata,
  blogPostPath,
  blogSitemapEntries,
  isBlogSlug,
  postsFor,
} from "@/lib/blog";
import { PUBLIC_PAGES, absoluteUrl, localizedPath } from "@/lib/seo";
import { llmsTxt } from "@/lib/llms";
import { LOCALES } from "@/i18n/locales";
import sitemap from "@/app/sitemap";
import { brandNames } from "./brand-names";
import { displayLength } from "./display-length";

const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => readFileSync(path.join(root, rel), "utf8");
const registered = new Set<string>(PUBLIC_PAGES.map((p) => p.path));

describe("blog registry", () => {
  it("has unique, URL-safe slugs and real dates that are not in the future", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const today = new Date().toISOString().slice(0, 10);
    for (const p of BLOG_POSTS) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      for (const d of [p.published, p.updated]) {
        expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isNaN(new Date(`${d}T00:00:00Z`).getTime())).toBe(false);
        expect(d <= today, `${p.slug} ${d}`).toBe(true);
      }
      expect(p.updated >= p.published, p.slug).toBe(true);
    }
    expect(isBlogSlug("nope")).toBe(false);
  });

  it("lists the newest post first", () => {
    const dates = postsFor("mn").map((p) => p.published);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});

describe.each(LOCALES)("blog posts (%s)", (locale) => {
  const posts = postsFor(locale);
  const mn = postsFor("mn");

  // Mongolian is the source: a translation adds or drops no section.
  it("mirror Mongolian section for section", () => {
    expect(posts.map((p) => p.slug)).toEqual(mn.map((p) => p.slug));
    for (const [i, p] of posts.entries()) {
      const src = mn[i]!;
      expect(p.sections.length, p.slug).toBe(src.sections.length);
      expect(
        p.sections.map((s) => [s.body.length, s.items?.length]),
        p.slug,
      ).toEqual(src.sections.map((s) => [s.body.length, s.items?.length]));
      expect(
        p.links.map((l) => l.href.startsWith("/")),
        p.slug,
      ).toEqual(src.links.map((l) => l.href.startsWith("/")));
    }
  });

  it("have a title, description and lead in the length search shows", () => {
    for (const p of posts) {
      expect(displayLength(p.title), p.slug).toBeGreaterThan(15);
      expect(displayLength(p.title), p.slug).toBeLessThanOrEqual(70);
      expect(displayLength(p.description), p.slug).toBeGreaterThan(50);
      expect(displayLength(p.description), p.slug).toBeLessThanOrEqual(260);
      expect(displayLength(p.lead), p.slug).toBeGreaterThan(120);
      expect(displayLength(p.lead), p.slug).toBeLessThan(480);
      expect(p.sections.length, p.slug).toBeGreaterThanOrEqual(2);
      // React keys and anchors: no two sections or paragraphs alike.
      const texts = p.sections.flatMap((s) => [
        s.heading,
        ...s.body,
        ...(s.items ?? []),
      ]);
      expect(new Set(texts).size, p.slug).toBe(texts.length);
    }
  });

  it("link only to registered pages or absolute URLs", () => {
    for (const p of posts) {
      for (const l of p.links) {
        if (l.href.startsWith("/")) {
          expect(registered.has(l.href), `${p.slug} -> ${l.href}`).toBe(true);
        } else {
          expect(l.href).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("name no competitor or non-connector brand", () => {
    expect(brandNames(JSON.stringify(posts))).toEqual([]);
  });

  it("give each post its own canonical, hreflang set and share card", () => {
    for (const p of posts) {
      const url = absoluteUrl(localizedPath(locale, blogPostPath(p.slug)));
      const meta = blogPostMetadata(locale, p.slug);
      expect(meta.alternates?.canonical).toBe(url);
      expect(meta.openGraph?.url).toBe(url);
      expect(Object.keys(meta.alternates?.languages ?? {}).sort()).toEqual(
        ["en", "ko", "mn", "x-default", "zh-Hans"].sort(),
      );
      expect(JSON.stringify(meta.openGraph)).toContain("/opengraph-image");
      expect(JSON.stringify(meta.twitter)).toContain("/opengraph-image");
    }
  });

  it("describe each post as a BlogPosting under the blog", () => {
    for (const p of posts) {
      const ld = blogPostJsonLd(locale, p.slug, { home: "Home", blog: "Blog" });
      const graph = ld["@graph"] as Record<string, unknown>[];
      expect(graph.map((n) => n["@type"])).toEqual([
        "BlogPosting",
        "BreadcrumbList",
      ]);
      const url = absoluteUrl(localizedPath(locale, blogPostPath(p.slug)));
      expect(graph[0]).toMatchObject({
        url,
        headline: blogPost(locale, p.slug).title,
        datePublished: p.published,
        dateModified: p.updated,
      });
      const crumbs = graph[1] as {
        itemListElement: { position: number; item: string }[];
      };
      expect(crumbs.itemListElement.map((c) => c.item)).toEqual([
        absoluteUrl(localizedPath(locale, "/")),
        absoluteUrl(localizedPath(locale, "/blog")),
        url,
      ]);
      expect(JSON.stringify(ld)).not.toMatch(/aggregateRating|"review"/i);
    }
  });
});

describe("blog everywhere", () => {
  it("is in sitemap.xml: the index and every post, in every language", () => {
    const urls = sitemap().map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(blogSitemapEntries()).toHaveLength(BLOG_POSTS.length * 4);
    for (const l of LOCALES) {
      expect(urls).toContain(absoluteUrl(localizedPath(l, "/blog")));
      for (const p of BLOG_POSTS) {
        expect(urls).toContain(
          absoluteUrl(localizedPath(l, blogPostPath(p.slug))),
        );
      }
    }
  });

  it("puts each Mongolian and English post in llms.txt with its URL", () => {
    const txt = llmsTxt();
    for (const l of ["mn", "en"] as const) {
      for (const p of postsFor(l)) {
        expect(txt).toContain(p.lead);
        expect(txt).toContain(
          absoluteUrl(localizedPath(l, blogPostPath(p.slug))),
        );
      }
    }
  });

  it("is reachable from the header, the mobile menu and the footer", () => {
    for (const f of ["components/nav-links.tsx", "components/mobile-nav.tsx"]) {
      expect(read(f), f).toContain('{ href: "/blog", label: "blog" }');
    }
    expect(read("app/[locale]/(marketing)/layout.tsx")).toContain(
      '<Link href="/blog"',
    );
  });

  it("renders posts only from the registry, with their own metadata and JSON-LD", () => {
    const page = read("app/[locale]/(marketing)/blog/[slug]/page.tsx");
    expect(page).toContain("export const dynamicParams = false");
    expect(page).toContain("BLOG_POSTS.map((p) => ({ slug: p.slug }))");
    expect(page).toContain("blogPostMetadata(locale, slug)");
    expect(page).toContain("blogPostJsonLd(locale, slug");
  });
});
