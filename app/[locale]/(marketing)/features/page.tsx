import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  BellRing,
  Coins,
  CreditCard,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RICH } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { FinalCta } from "@/components/home/final-cta";
import { DASHBOARD_URL } from "@/lib/links";
import {
  connectorLogo,
  connectorModesFor,
  connectorsFor,
  type ConnectorGroup,
} from "@/lib/connectors";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/features");
}

// Payment-method groups, each with the live connectors behind it
// (lib/connectors.ts) — so the page lists only what a merchant can turn on.
const rails: { icon: LucideIcon; group: ConnectorGroup }[] = [
  { icon: QrCode, group: "qr" },
  { icon: CreditCard, group: "card" },
  { icon: Wallet, group: "wallet" },
  { icon: Coins, group: "installment" },
];

const features = [
  { icon: Zap, key: "routing" },
  { icon: RefreshCw, key: "guarantee" },
  { icon: BellRing, key: "notifications" },
  { icon: BarChart3, key: "reports" },
  { icon: Banknote, key: "mnt" },
  { icon: ShieldCheck, key: "ecosystem" },
] as const;

/** Features — what the unified gateway gives a merchant, beyond the API. */
export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("features");
  const connectors = connectorsFor(locale);
  const modes = connectorModesFor(locale);
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
            {t("start")}
            <ArrowRight />
          </a>
        </Button>
      </PageIntro>

      {/* rails */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {rails.map((r, i) => (
              <Reveal
                key={r.group}
                delay={i * 110}
                className="flex flex-col rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-30px_rgba(16,185,129,0.18)]"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <r.icon className="size-5" />
                </span>
                <p className="mt-4 text-[12px] font-semibold tracking-wide text-[var(--color-faint)] uppercase">
                  {t(`rails.${r.group}.label`)}
                </p>
                <h3 className="display mt-1 text-[21px]">
                  {t(`rails.${r.group}.items`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t(`rails.${r.group}.desc`)}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[var(--color-border)] pt-4">
                  {connectors
                    .filter((c) => c.group === r.group)
                    .map((c) => (
                      <li key={c.id} className="flex items-center gap-2.5">
                        <Image
                          src={connectorLogo(c.id)}
                          alt={t("logoAlt", { name: c.name })}
                          width={28}
                          height={28}
                          className="size-7 shrink-0 rounded-lg border border-[var(--color-border)]"
                        />
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {c.name}
                        </span>
                        <span className="ml-auto whitespace-nowrap text-[11px] text-[var(--color-faint)]">
                          {modes[c.mode].short}
                        </span>
                      </li>
                    ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Object.values(modes).map((m) => (
              <p
                key={m.label}
                className="text-[13px] leading-relaxed text-[var(--color-muted)]"
              >
                {t.rich("modeLine", {
                  label: m.label,
                  hint: m.hint,
                  b: (chunks) => (
                    <span className="font-semibold text-[var(--color-foreground)]">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* feature grid */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge={t("grid.badge")}
            line1={t("grid.line1")}
            line2={t("grid.line2")}
            lead={t("grid.lead")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
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
