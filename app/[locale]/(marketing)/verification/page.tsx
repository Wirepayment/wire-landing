import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import {
  Ban,
  Check,
  Lock,
  MessageSquare,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RICH } from "@/components/rich";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { FinalCta } from "@/components/home/final-cta";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/verification");
}

const promises = [
  { icon: Lock, key: "encrypted" },
  { icon: UserCheck, key: "oneCitizen" },
  { icon: Ban, key: "noThirdParty" },
] as const;

function StepHead({
  chip,
  icon: Icon,
  line1,
  line2,
  copy,
  bullets,
}: {
  chip: string;
  icon: React.ComponentType<{ className?: string }>;
  line1: string;
  line2: string;
  copy: React.ReactNode;
  bullets: string[];
}) {
  return (
    <div>
      <span className="badge-pill">
        <Icon className="size-3.5 text-[var(--color-primary)]" />
        {chip}
      </span>
      <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)]">
        {line1}
        <br />
        <span className="display-dim">{line2}</span>
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
        {copy}
      </p>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* mock: the one-SMS phone verification */
async function PhoneMock() {
  const t = await getTranslations("verification.phoneMock");
  return (
    <div className="screen-card mx-auto w-full max-w-sm p-5">
      <p className="flex items-center gap-1.5 text-[12px] font-bold">
        <MessageSquare className="size-3.5 text-[var(--color-primary)]" />
        {t("title")}
      </p>
      <div className="mt-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-3">
        <p className="text-[10px] text-[var(--color-faint)]">
          {t("yourNumber")}
        </p>
        <p className="tabular text-[16px] font-bold">88** ** 07</p>
      </div>
      <div className="mt-2.5 flex justify-end">
        <div className="pill-glow max-w-[80%] rounded-2xl rounded-br-sm bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] px-3.5 py-2 text-[12px] text-white">
          WIRE 8kfq2
        </div>
      </div>
      <p className="mt-1 text-right text-[9px] text-[var(--color-faint)]">
        {t("sent")}
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--color-primary-soft)] px-3 py-2.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <Check className="size-3" strokeWidth={3.5} />
        </span>
        <span className="text-[12px] font-semibold text-[var(--color-primary-deep)]">
          {t("recognized")}
        </span>
      </div>
    </div>
  );
}

/* mock: the ДАН government SSO handoff */
async function DanMock() {
  const t = await getTranslations("verification.danMock");
  return (
    <div className="screen-card mx-auto w-full max-w-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold">
          <ShieldCheck className="size-3.5 text-[var(--color-primary)]" />
          {t("title")}
        </span>
        <span className="rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-[9px] font-semibold text-[var(--color-primary)]">
          {t("gov")}
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="rounded-xl border border-[var(--color-border)] p-3">
          <p className="text-[10px] text-[var(--color-faint)]">{t("name")}</p>
          <p className="text-[13px] font-semibold">{t("nameValue")}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-3">
          <p className="text-[10px] text-[var(--color-faint)]">
            {t("register")}
          </p>
          <p className="tabular text-[13px] font-semibold">
            {t("registerValue")}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-[var(--color-primary-soft)] px-3 py-2.5">
          <Lock className="size-3.5 text-[var(--color-primary-deep)]" />
          <span className="text-[11px] font-medium text-[var(--color-primary-deep)]">
            {t("noPassword")}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Verification — why and how Wire verifies every owner: phone (SMS) first,
 *  then citizen identity through the government SSO (ДАН). */
export default async function VerificationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("verification");
  return (
    <>
      <PageIntro
        badge={t("intro.badge")}
        line1={t("intro.line1")}
        line2={t("intro.line2")}
        lead={t.rich("intro.lead", RICH)}
      />

      {/* step 1 — phone */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <StepHead
              chip={t("phone.chip")}
              icon={MessageSquare}
              line1={t("phone.line1")}
              line2={t("phone.line2")}
              copy={t.rich("phone.copy", RICH)}
              bullets={[
                t("phone.bullets.oneAccount"),
                t("phone.bullets.auto"),
                t("phone.bullets.alerts"),
              ]}
            />
          </Reveal>
          <Reveal delay={120}>
            <PhoneMock />
          </Reveal>
        </div>
      </section>

      {/* step 2 — DAN */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <StepHead
              chip={t("dan.chip")}
              icon={ShieldCheck}
              line1={t("dan.line1")}
              line2={t("dan.line2")}
              copy={t.rich("dan.copy", RICH)}
              bullets={[
                t("dan.bullets.official"),
                t("dan.bullets.once"),
                t("dan.bullets.signed"),
              ]}
            />
          </Reveal>
          <Reveal delay={120} className="lg:order-1">
            <DanMock />
          </Reveal>
        </div>
      </section>

      {/* privacy promises */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge={t("privacy.badge")}
            line1={t("privacy.line1")}
            line2={t("privacy.line2")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal
                key={p.key}
                delay={i * 110}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <p.icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {t(`privacy.items.${p.key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t(`privacy.items.${p.key}.desc`)}
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
