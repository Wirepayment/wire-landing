import type { Metadata, MetadataRoute } from "next";
import { HTML_LANG, LOCALES, type Locale } from "@/i18n/locales";
import {
  OG_LOCALE,
  SHARE_IMAGE,
  SITE_NAME,
  TRANSLATED_ON,
  absoluteUrl,
  languageAlternates,
  localizedPath,
} from "@/lib/seo";
import type { GuideLink } from "@/lib/guides";
import { POSTS as MN } from "@/content/mn/blog";
import { POSTS as EN } from "@/content/en/blog";
import { POSTS as ZH } from "@/content/zh/blog";
import { POSTS as KO } from "@/content/ko/blog";

// The blog: product news and explanations, each post in all four languages.
// A post is registered here once (slug and dates); its words live in
// content/<locale>/blog.ts. The post page, the index, sitemap.xml, llms.txt
// and the BlogPosting JSON-LD all read this file, so they cannot drift.
// Posts state only what is already live or already public elsewhere on
// wire.mn — no announcements of things that have not shipped.

/** One post: its URL slug and dates (YYYY-MM-DD), newest first. Bump
 *  `updated` when the post's words change. The dates are the owner's
 *  editorial dates: the first thirteen posts were spread over June to
 *  October (decided 2026-11-15); posts from November on carry the date the
 *  feature went live (decided 2026-11-18). */
export const BLOG_POSTS = [
  { slug: "aml-agent", published: "2026-11-20", updated: "2026-11-20" },
  { slug: "smart-insights", published: "2026-11-18", updated: "2026-11-18" },
  { slug: "expired-pay-links", published: "2026-11-17", updated: "2026-11-17" },
  {
    slug: "wire-in-four-languages",
    published: "2026-11-10",
    updated: "2026-11-10",
  },
  {
    slug: "connect-your-own-channel",
    published: "2026-11-08",
    updated: "2026-11-08",
  },
  {
    slug: "channel-amount-limits",
    published: "2026-11-05",
    updated: "2026-11-05",
  },
  {
    slug: "change-payment-method",
    published: "2026-10-26",
    updated: "2026-10-26",
  },
  {
    slug: "automatic-failover",
    published: "2026-10-19",
    updated: "2026-10-19",
  },
  {
    slug: "six-channels-one-integration",
    published: "2026-10-12",
    updated: "2026-10-12",
  },
  {
    slug: "payments-for-platforms",
    published: "2026-10-05",
    updated: "2026-10-05",
  },
  { slug: "who-is-wire-for", published: "2026-09-28", updated: "2026-09-28" },
  {
    slug: "first-payment-in-ten-minutes",
    published: "2026-09-14",
    updated: "2026-09-14",
  },
  {
    slug: "payments-are-not-lost",
    published: "2026-08-31",
    updated: "2026-08-31",
  },
  { slug: "one-dashboard", published: "2026-08-17", updated: "2026-08-17" },
  { slug: "no-monthly-fee", published: "2026-08-03", updated: "2026-08-03" },
  {
    slug: "start-in-three-steps",
    published: "2026-07-20",
    updated: "2026-07-20",
  },
  {
    slug: "accept-payments-without-website",
    published: "2026-07-06",
    updated: "2026-07-06",
  },
  {
    slug: "how-your-data-is-protected",
    published: "2026-06-22",
    updated: "2026-06-22",
  },
  { slug: "what-is-wire", published: "2026-06-08", updated: "2026-06-08" },
] as const;

export type BlogSlug = (typeof BLOG_POSTS)[number]["slug"];

export interface BlogSection {
  heading: string;
  body: string[];
  /** An optional list after the paragraphs. */
  items?: string[];
}

/** A post's words in one language. */
export interface BlogPostCopy {
  title: string;
  /** Meta description and the line under the title on the index. */
  description: string;
  /** The opening paragraph — the summary an AI answer would quote. */
  lead: string;
  sections: BlogSection[];
  links: GuideLink[];
}

export type BlogPost = BlogPostCopy & {
  slug: BlogSlug;
  published: string;
  updated: string;
};

const COPY: Record<Locale, Record<BlogSlug, BlogPostCopy>> = {
  mn: MN,
  en: EN,
  zh: ZH,
  ko: KO,
};

export const BLOG_PATH = "/blog";

/** A post's path without a locale prefix ("/blog/automatic-failover"). */
export function blogPostPath(slug: BlogSlug): string {
  return `${BLOG_PATH}/${slug}`;
}

export function isBlogSlug(x: string): x is BlogSlug {
  return BLOG_POSTS.some((p) => p.slug === x);
}

/** Every post in one language, newest first (registry order breaks ties). */
export function postsFor(locale: Locale): BlogPost[] {
  return BLOG_POSTS.map((p) => ({ ...p, ...COPY[locale][p.slug] })).sort(
    (a, b) => b.published.localeCompare(a.published),
  );
}

export function blogPost(locale: Locale, slug: BlogSlug): BlogPost {
  const post = postsFor(locale).find((p) => p.slug === slug);
  if (!post) throw new Error(`unknown blog post: ${locale} ${slug}`);
  return post;
}

/** Metadata for one post: its own canonical, hreflang set and share card,
 *  as an article with its dates. */
export function blogPostMetadata(locale: Locale, slug: BlogSlug): Metadata {
  const post = blogPost(locale, slug);
  const path = blogPostPath(slug);
  const url = absoluteUrl(localizedPath(locale, path));
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      url,
      title: post.title,
      description: post.description,
      publishedTime: `${post.published}T00:00:00Z`,
      modifiedTime: `${post.updated}T00:00:00Z`,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/** sitemap.xml entries for the posts, in every language. */
export function blogSitemapEntries(): MetadataRoute.Sitemap {
  return BLOG_POSTS.flatMap((p) =>
    LOCALES.map((l) => {
      const path = blogPostPath(p.slug);
      const lastmod =
        l === "mn" || p.updated > TRANSLATED_ON ? p.updated : TRANSLATED_ON;
      return {
        url: absoluteUrl(localizedPath(l, path)),
        lastModified: new Date(`${lastmod}T00:00:00Z`),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: languageAlternates(path) },
      };
    }),
  );
}

/** schema.org for one post: the article and where it sits. */
export function blogPostJsonLd(
  locale: Locale,
  slug: BlogSlug,
  crumbs: {
    home: string;
    blog: string;
  },
) {
  const post = blogPost(locale, slug);
  const url = absoluteUrl(localizedPath(locale, blogPostPath(slug)));
  const trail = [
    { name: crumbs.home, url: absoluteUrl(localizedPath(locale, "/")) },
    { name: crumbs.blog, url: absoluteUrl(localizedPath(locale, BLOG_PATH)) },
    { name: post.title, url },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": url,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        inLanguage: HTML_LANG[locale],
        datePublished: post.published,
        dateModified: post.updated,
        author: { "@id": "https://wire.mn/#organization" },
        publisher: { "@id": "https://wire.mn/#organization" },
        isPartOf: { "@id": "https://wire.mn/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      },
    ],
  };
}
