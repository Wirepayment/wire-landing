import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { FinalCta } from "@/components/home/final-cta";
import { blogPostPath, postsFor } from "@/lib/blog";
import { pageJsonLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/blog");
}

/* The blog index: every post, newest first, as one quiet list — date, title,
 * one line. The posts themselves are in lib/blog.ts + content/<locale>. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = postsFor(locale);
  return (
    <>
      <JsonLd data={pageJsonLd(locale, "/blog")} />
      <PageIntro
        badge={t("badge")}
        line1={t("line1")}
        line2={t("line2")}
        lead={t("lead")}
      />

      <section className="bg-[var(--color-background)]">
        <ul className="mx-auto w-full max-w-3xl px-5 pt-10 pb-16 sm:pb-24">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="border-t border-[var(--color-border)] last:border-b"
            >
              <Link
                href={blogPostPath(p.slug)}
                className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[7.5rem_1fr]"
              >
                <time
                  dateTime={p.published}
                  className="tabular pt-1.5 text-[13px] text-[var(--color-faint)]"
                >
                  {p.published}
                </time>
                <div>
                  <h2 className="display text-[22px] leading-snug transition-colors group-hover:text-[var(--color-primary-deep)] sm:text-[26px]">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {p.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-primary-deep)]">
                    {t("read")}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}
