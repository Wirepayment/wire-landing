import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  Code2,
  KeyRound,
  Layers,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RICH } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { ApiMock } from "@/components/home/feature-blocks";
import { FinalCta } from "@/components/home/final-cta";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import type { Locale } from "@/i18n/locales";

export const metadata: Metadata = pageMetadata("/developers");

const devFeatures = [
  { icon: Code2, key: "rest" },
  { icon: Boxes, key: "sdk" },
  { icon: Webhook, key: "webhooks" },
  { icon: Layers, key: "platform" },
  { icon: KeyRound, key: "idempotency" },
] as const;

/** Developers — the build surface: REST API, SDKs, webhooks, platform mode. */
export default async function DevelopersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("developers");
  return (
    <>
      <PageIntro
        badge={t("intro.badge")}
        line1={t("intro.line1")}
        line2={t("intro.line2")}
        lead={t.rich("intro.lead", RICH)}
      >
        <Button asChild size="lg">
          <a href={DOCS_URL}>
            {t("docs")}
            <ArrowRight />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={DASHBOARD_URL}>{t("apiKey")}</a>
        </Button>
      </PageIntro>

      {/* one request → checkout */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <Reveal>
            <ApiMock />
          </Reveal>
        </div>
      </section>

      {/* build surface grid */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge={t("grid.badge")}
            line1={t("grid.line1")}
            line2={t("grid.line2")}
            lead={t("grid.lead")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {devFeatures.map((f, i) => (
              <Reveal
                key={f.key}
                delay={(i % 3) * 90}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)] transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.35)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <f.icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {t(`items.${f.key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t(`items.${f.key}.desc`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
