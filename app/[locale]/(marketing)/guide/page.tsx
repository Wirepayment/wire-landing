import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { KeyRound, PlugZap, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { FinalCta } from "@/components/home/final-cta";
import { RICH } from "@/components/rich";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/guide");
}

/* Steps are a real sequence — the numbering carries the order a new merchant
 * actually walks. Screenshots ship pre-masked (register, address, keys). */
type StepNo =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;

type Step = {
  n: StepNo;
  img: string;
  w: number;
  h: number;
  /** Key of the step's note under guide.notes; `warn` shows it as a warning. */
  note?: "s9" | "s17";
  warn?: boolean;
};

type Phase = {
  id: "signup" | "project" | "connector" | "integration";
  icon: React.ComponentType<{ className?: string }>;
  steps: Step[];
};

// Copy (tag, title, intro, and each step's title/desc/caption) lives in
// messages under guide.phases.<id>, guide.steps.s<n> and guide.notes.
const PHASES: Phase[] = [
  {
    id: "signup",
    icon: ShieldCheck,
    steps: [
      { n: 1, img: "01-signin.png", w: 1440, h: 900 },
      { n: 2, img: "02-onboarding-phone.png", w: 1440, h: 900 },
      { n: 3, img: "03-onboarding-phone-sms.png", w: 1440, h: 900 },
      { n: 4, img: "04-onboarding-dan.png", w: 1440, h: 900 },
      { n: 5, img: "05-dan-sso.png", w: 1200, h: 1067 },
      { n: 6, img: "06-profile-verified.png", w: 1200, h: 1067 },
    ],
  },
  {
    id: "project",
    icon: KeyRound,
    steps: [
      { n: 7, img: "07-start.png", w: 1440, h: 900 },
      { n: 8, img: "08-project-home.png", w: 1200, h: 1067 },
      {
        n: 9,
        img: "09-create-project.png",
        w: 1200,
        h: 1067,
        note: "s9",
      },
    ],
  },
  {
    id: "connector",
    icon: Workflow,
    steps: [
      { n: 10, img: "10-connectors.png", w: 1200, h: 1067 },
      { n: 11, img: "11-connector-start.png", w: 1200, h: 1067 },
      { n: 12, img: "12-connector-step2-info.png", w: 1200, h: 1067 },
      { n: 13, img: "13-connector-step3-address.png", w: 1200, h: 1067 },
      { n: 14, img: "14-connector-step4-account.png", w: 1200, h: 1067 },
      { n: 15, img: "15-connector-step5-review.png", w: 1200, h: 1268 },
      { n: 16, img: "16-connector-submit-confirm.png", w: 1200, h: 1067 },
      {
        n: 17,
        img: "17-connector-pending.png",
        w: 1200,
        h: 1067,
        note: "s17",
        warn: true,
      },
    ],
  },
  {
    id: "integration",
    icon: PlugZap,
    steps: [
      { n: 18, img: "18-api-keys.png", w: 1200, h: 1067 },
      { n: 19, img: "19-webhooks.png", w: 1200, h: 1067 },
    ],
  },
];

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guide");
  return (
    <>
      <PageIntro
        badge={t("intro.badge")}
        line1={t("intro.line1")}
        line2={t("intro.line2")}
        lead={t("intro.lead")}
      />

      <nav
        aria-label={t("tocAria")}
        className="mx-auto mt-6 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 px-5"
      >
        {PHASES.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="badge-pill transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]"
          >
            <p.icon className="size-3.5 text-[var(--color-primary)]" />
            {t(`phases.${p.id}.title`)}
          </a>
        ))}
      </nav>

      <div className="mx-auto w-full max-w-3xl px-5 pb-8">
        {PHASES.map((phase) => (
          <section key={phase.id} id={phase.id} className="scroll-mt-24">
            <Reveal>
              <div className="mt-20 border-t-2 border-[var(--color-primary)] pt-7">
                <span className="font-[family-name:var(--font-round)] text-xs font-bold tracking-[0.12em] text-[var(--color-primary)] uppercase">
                  {t(`phases.${phase.id}.tag`)}
                </span>
                <h2 className="display mt-2 text-[clamp(26px,3.4vw,38px)]">
                  {t(`phases.${phase.id}.title`)}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
                  {t.rich(`phases.${phase.id}.intro`, RICH)}
                </p>
              </div>
            </Reveal>

            {phase.steps.map((step) => (
              <Reveal key={step.n}>
                <article className="mt-12">
                  <div className="flex items-baseline gap-3.5">
                    <span className="flex shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 px-3 py-0.5 font-[family-name:var(--font-round)] text-[13px] font-bold text-[var(--color-primary)] tabular-nums">
                      {step.n}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {t(`steps.s${step.n}.title`)}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-[14.5px] leading-relaxed text-[var(--color-muted)] [&_code]:rounded [&_code]:bg-[var(--color-border)]/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_strong]:font-semibold [&_strong]:text-[var(--color-foreground)]">
                    {t.rich(`steps.s${step.n}.desc`, RICH)}
                  </p>
                  <figure className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_12px_32px_-16px_rgba(16,185,129,0.25)]">
                    <Image
                      src={`/guide/${step.img}`}
                      alt={t(`steps.s${step.n}.title`)}
                      width={step.w}
                      height={step.h}
                      sizes="(max-width: 800px) 100vw, 768px"
                      className="w-full"
                    />
                    <figcaption className="border-t border-[var(--color-border)] px-4 py-2.5 text-[13px] text-[var(--color-muted)]">
                      {t(`steps.s${step.n}.caption`)}
                    </figcaption>
                  </figure>
                  {step.note ? (
                    <p
                      className={`mt-4 rounded-xl border px-4 py-3 text-[14px] leading-relaxed ${
                        step.warn
                          ? "border-amber-300/60 bg-amber-50 text-amber-900"
                          : "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5"
                      } [&_strong]:font-semibold`}
                    >
                      {t.rich(`notes.${step.note}`, RICH)}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </section>
        ))}
      </div>

      <FinalCta />
    </>
  );
}
