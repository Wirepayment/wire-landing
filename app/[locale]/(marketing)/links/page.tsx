import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, Check, Copy, Link2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RICH } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { FinalCta } from "@/components/home/final-cta";
import { DASHBOARD_URL } from "@/lib/links";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/links");
}

const perks = ["fast", "amount", "reusable", "share", "live"] as const;

/* mock: a live payment link with its QR and running stats */
async function LinkShowcase() {
  const t = await getTranslations("links.showcase");
  return (
    <div className="screen-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
        <span className="flex items-center gap-2 text-[13px] font-bold">
          <Link2 className="size-4 text-[var(--color-primary)]" />
          {t("title")}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          {t("active")}
        </span>
      </div>

      <div className="flex items-center gap-5 p-5">
        <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_24px_-12px_rgba(10,10,10,0.2)]">
          <QrCode
            className="size-16 text-[var(--color-foreground)]"
            strokeWidth={1.2}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[var(--color-faint)]">{t("amount")}</p>
          <p className="tabular text-[26px] font-bold">₮50,000</p>
          <div className="mt-3 flex items-center gap-2 rounded-full border border-[var(--color-border)] py-1.5 pr-1.5 pl-3.5">
            <span className="tabular min-w-0 flex-1 truncate text-[12px] font-semibold">
              wire.mn/l/sara
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)]">
              <Copy className="size-3" />
              {t("copy")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-[var(--color-border)] bg-[var(--color-border)]">
        {[
          ["128", t("payments")],
          ["₮6,400,000", t("collected")],
        ].map(([v, l]) => (
          <div key={l} className="bg-white px-5 py-3.5">
            <p className="tabular text-[18px] font-bold">{v}</p>
            <p className="text-[10px] text-[var(--color-faint)]">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Links — the ready-made product: create a payment link, share it anywhere. */
export default async function LinksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("links");
  return (
    <>
      <PageIntro
        badge={t("intro.badge")}
        line1={t("intro.line1")}
        line2={t("intro.line2")}
        lead={t.rich("intro.lead", RICH)}
      >
        <Button asChild size="lg">
          <a href={DASHBOARD_URL}>
            {t("create")}
            <ArrowRight />
          </a>
        </Button>
      </PageIntro>

      <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display text-[clamp(28px,3.8vw,44px)]">
              {t("line1")}
              <br />
              <span className="display-dim">{t("line2")}</span>
            </h2>
            <ul className="mt-7 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-sm text-[var(--color-foreground)]">
                    {t(`perks.${p}`)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <LinkShowcase />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
