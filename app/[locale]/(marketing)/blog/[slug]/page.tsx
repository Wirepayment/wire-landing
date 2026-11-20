import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { FinalCta } from "@/components/home/final-cta";
import {
  BLOG_POSTS,
  blogPost,
  blogPostJsonLd,
  blogPostMetadata,
  blogPostPath,
  isBlogSlug,
  postsFor,
} from "@/lib/blog";
import { siteFor } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";

type Params = Promise<{ locale: Locale; slug: string }>;

// Only registered posts exist; anything else is a 404, not a render attempt.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isBlogSlug(slug)) return {};
  return blogPostMetadata(locale, slug);
}

const PILL =
  "badge-pill inline-flex items-center gap-1.5 !px-4 !py-2 text-[13px] transition-colors hover:text-[var(--color-foreground)]";

/* One post: date, title, the opening paragraph, then plain sections at a
 * reading measure. Words come from content/<locale>/blog.ts. */
export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations("blog"),
    getTranslations("common"),
  ]);
  const post = blogPost(locale, slug);
  const others = postsFor(locale).filter((p) => p.slug !== slug);
  return (
    <>
      <JsonLd
        data={blogPostJsonLd(locale, slug, {
          home: siteFor(locale).homeCrumb,
          blog: common("blog"),
        })}
      />
      <article className="mx-auto w-full max-w-2xl px-5 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="size-3.5" />
          {t("back")}
        </Link>

        <header className="mt-8">
          <p className="tabular text-[13px] text-[var(--color-faint)]">
            <time dateTime={post.published}>{post.published}</time>
            {post.updated !== post.published ? (
              <>
                {" "}
                ({t("updated")}{" "}
                <time dateTime={post.updated}>{post.updated}</time>)
              </>
            ) : null}
          </p>
          <h1 className="display mt-3 text-[clamp(30px,4.6vw,46px)] leading-[1.15]">
            {post.title}
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--color-foreground)] sm:text-[19px]">
            {post.lead}
          </p>
        </header>

        {post.sections.map((s) => (
          <section key={s.heading} className="mt-11">
            <h2 className="display text-[22px] leading-snug sm:text-[25px]">
              {s.heading}
            </h2>
            {s.body.map((p) => (
              <p
                key={p}
                className="mt-4 text-[16px] leading-[1.75] text-[var(--color-muted)]"
              >
                {p}
              </p>
            ))}
            {s.items ? (
              <ul className="mt-4 space-y-2.5 pl-5 text-[16px] leading-[1.7] text-[var(--color-muted)] marker:text-[var(--color-primary)]">
                {s.items.map((item) => (
                  <li key={item} className="list-disc pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <div className="mt-12 flex flex-wrap gap-2.5">
          {post.links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href} className={PILL}>
                {l.label}
                <ArrowRight className="size-3.5" />
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={PILL}>
                {l.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ),
          )}
        </div>

        {others.length > 0 ? (
          <nav
            aria-label={t("more")}
            className="mt-14 border-t border-[var(--color-border)] pt-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[13px] font-semibold text-[var(--color-faint)]">
                {t("more")}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-primary-deep)] hover:underline"
              >
                {t("back")}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            {/* The three newest other posts as cards — a title, a line of what
                it says and its date — instead of every title in one run that
                read as a single long sentence. The full list is one click
                away. */}
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={blogPostPath(p.slug)}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-primary-deep)]"
                  >
                    <time
                      dateTime={p.published}
                      className="tabular text-[12px] text-[var(--color-faint)]"
                    >
                      {p.published}
                    </time>
                    <span className="display mt-2 text-[16px] leading-snug transition-colors group-hover:text-[var(--color-primary-deep)]">
                      {p.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[var(--color-muted)]">
                      {p.description}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-[var(--color-primary-deep)]">
                      {t("read")}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>

      <FinalCta />
    </>
  );
}
