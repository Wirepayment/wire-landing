import Image from "next/image";
import { Check, ChevronDown, ShieldCheck, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { RICH } from "@/components/rich";
import { SectionHeading } from "@/components/home/section-heading";

/* GetStarted — the "first win" trio: three rounded sky-topped cards, each
 * with a miniature UI vignette (KYC, account link, incoming revenue). */

function CardShell({
  children,
  visual,
  title,
  desc,
  delay,
}: {
  children?: never;
  visual: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-30px_rgba(16,185,129,0.18)]"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src="/clouds/card-sky.jpg"
          alt=""
          width={640}
          height={640}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
        {visual}
      </div>
      <div className="px-7 pt-1 pb-8 text-center">
        <h3 className="display text-[22px]">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

function MiniRow({ label, done }: { label: string; done?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-[11px]">
      <span className="font-medium text-[var(--color-foreground)]">
        {label}
      </span>
      {done ? (
        <span className="flex size-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <Check className="size-2.5" strokeWidth={3.5} />
        </span>
      ) : (
        <ChevronDown className="size-3.5 text-[var(--color-faint)]" />
      )}
    </div>
  );
}

function TimeChip({
  children,
  unit,
}: {
  children: React.ReactNode;
  unit: string;
}) {
  return (
    <span className="pill-glow absolute top-4 right-4 z-10 flex size-11 flex-col items-center justify-center rounded-full bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] text-white">
      <span className="text-[13px] leading-none font-bold">{children}</span>
      <span className="text-[7px] font-medium opacity-80">{unit}</span>
    </span>
  );
}

export async function GetStarted() {
  const t = await getTranslations("home.getStarted");
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <SectionHeading
          badge={t("badge")}
          line1={t("line1")}
          line2={t("line2")}
          lead={t.rich("lead", RICH)}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <CardShell
            delay={0}
            title={t("signup.title")}
            desc={t("signup.desc")}
            visual={
              <div className="absolute inset-x-8 top-8">
                <TimeChip unit={t("minutes")}>3</TimeChip>
                <div className="screen-card space-y-2 p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold">
                    <ShieldCheck className="size-3.5 text-[var(--color-primary)]" />
                    {t("signup.heading")}
                  </p>
                  <MiniRow label={t("signup.phone")} done />
                  <MiniRow label={t("signup.dan")} done />
                  <div className="rounded-lg bg-[var(--color-primary-soft)] px-3 py-2 text-center text-[10px] font-semibold text-[var(--color-primary)]">
                    {t("signup.done")}
                  </div>
                </div>
              </div>
            }
          />

          <CardShell
            delay={110}
            title={t("account.title")}
            desc={t("account.desc")}
            visual={
              <div className="absolute inset-x-8 top-8">
                <TimeChip unit={t("minutes")}>2</TimeChip>
                <div className="screen-card space-y-2 p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold">
                    <Smartphone className="size-3.5 text-[var(--color-primary)]" />
                    {t("account.heading")}
                  </p>
                  <MiniRow label={t("account.chooseBank")} />
                  <MiniRow label="5049 •••• 1207" done />
                  <div className="pill-glow rounded-full bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] px-3 py-2 text-center text-[10px] font-semibold text-white">
                    {t("account.connect")}
                  </div>
                </div>
              </div>
            }
          />

          <CardShell
            delay={220}
            title={t("revenue.title")}
            desc={t("revenue.desc")}
            visual={
              <div className="absolute inset-x-8 top-10">
                <div className="screen-card p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="tabular text-[20px] font-bold">
                      ₮1,254,000
                    </span>
                    <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
                      ↑ 23%
                    </span>
                  </div>
                  <p className="text-[9px] text-[var(--color-faint)]">
                    {t("revenue.today")}
                  </p>
                  <svg viewBox="0 0 220 70" className="mt-2 w-full" aria-hidden>
                    <path
                      d="M4 58 L40 44 L76 50 L112 30 L148 38 L184 16 L216 24"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="184"
                      cy="16"
                      r="3.5"
                      fill="#fff"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="pill-glow relative z-10 mx-auto -mt-3 w-fit rounded-xl bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] px-3 py-1.5 text-center text-white">
                  <p className="text-[8px] opacity-80">
                    {t("revenue.newPayment")}
                  </p>
                  <p className="tabular text-[12px] font-bold">+₮52,500</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
