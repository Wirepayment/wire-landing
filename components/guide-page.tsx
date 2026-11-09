import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { FinalCta } from "@/components/home/final-cta";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { guide, type GuideLink } from "@/lib/guides";
import { guideJsonLd } from "@/lib/structured-data";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import type { PublicPath } from "@/lib/seo";

/* GuidePage — one answer page: the direct answer up top (the paragraph search
 * and AI answers quote), the steps, optional comparison points, the FAQ (also
 * emitted as FAQPage JSON-LD) and related links. Copy lives in
 * content/<locale>/guides.ts. */

/* Internal links keep the visitor's locale; external ones open as plain
 * anchors. */
function SmartLink({
  link,
  className,
}: {
  link: GuideLink;
  className: string;
}) {
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
        <ArrowRight className="size-3.5" />
      </Link>
    );
  }
  return (
    <a href={link.href} className={className}>
      {link.label}
      <ArrowUpRight className="size-3.5" />
    </a>
  );
}

export async function GuidePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: PublicPath;
}) {
  const g = guide(locale, slug);
  const t = await getTranslations("guidePage");
  return (
    <>
      <JsonLd data={guideJsonLd(locale, g)} />
      <PageIntro
        badge={g.badge}
        line1={g.line1}
        line2={g.line2}
        lead={g.answer}
      >
        <Button asChild size="lg">
          <a href={g.cta.href}>
            {g.cta.label}
            <ArrowRight />
          </a>
        </Button>
      </PageIntro>

      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:py-20">
          <SectionHeading badge={t("stepsBadge")} line1={g.stepsTitle} />
          <ol className="mt-12 grid gap-4">
            {g.steps.map((s, i) => (
              <li key={s.title} className="list-none">
                <Reveal
                  delay={(i % 3) * 80}
                  className="flex gap-5 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)]"
                >
                  <span className="tabular flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-sm font-semibold text-[var(--color-primary)]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {g.points ? (
            <Reveal className="mt-12 rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-30px_rgba(16,185,129,0.18)]">
              <h3 className="display text-[22px]">{g.points.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.points.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-3xl px-5 pb-16 sm:pb-24">
          <SectionHeading badge={t("faqBadge")} line1={t("faqHeading")} />
          <FaqList items={g.faqs} />
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {g.related.map((l) => (
              <SmartLink
                key={l.href}
                link={l}
                className="badge-pill inline-flex items-center gap-1.5 !px-4 !py-2 text-[13px] transition-colors hover:text-[var(--color-foreground)]"
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
