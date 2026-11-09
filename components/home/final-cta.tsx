import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { RICH } from "@/components/rich";
import { LogoMark } from "@/components/logo";
import { DASHBOARD_URL } from "@/lib/links";

/* FinalCta — the closing cloud band: app-icon tile, big serif line, the
 * capability checklist with "Удахгүй / Roadmap" pills, one blue CTA. */

type ItemKey =
  | "paymentLink"
  | "dashboard"
  | "qr"
  | "projects"
  | "api"
  | "webhooks"
  | "idempotency"
  | "platform"
  | "routing"
  | "cards"
  | "export"
  | "insights";

type Item = { label: ItemKey; roadmap?: boolean };

const COLUMNS: Item[][] = [
  [
    { label: "paymentLink" },
    { label: "dashboard" },
    { label: "qr" },
    { label: "projects" },
  ],
  [
    { label: "api" },
    { label: "webhooks" },
    { label: "idempotency" },
    { label: "platform" },
  ],
  [
    { label: "routing" },
    { label: "cards" },
    { label: "export" },
    { label: "insights", roadmap: true },
  ],
];

export async function FinalCta() {
  const t = await getTranslations("home.finalCta");
  return (
    <section className="bg-[var(--color-background)] px-3 pb-4 sm:px-5">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[32px]">
        <Image
          src="/clouds/cta-clouds.jpg"
          alt=""
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/80" />

        <div className="relative mx-auto w-full max-w-4xl px-5 py-20 text-center sm:py-28">
          <Reveal className="flex justify-center">
            <span className="flex size-16 items-center justify-center rounded-[20px] border border-white/70 bg-white/90 shadow-[0_12px_36px_-8px_rgba(16,185,129,0.35)] backdrop-blur">
              <LogoMark className="size-9" />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display mt-7 text-[clamp(36px,5.5vw,64px)]">
              {t("heading")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              {t.rich("lead", RICH)}
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-12">
            <div className="grid gap-x-8 gap-y-3 text-left sm:grid-cols-3">
              {COLUMNS.map((col, ci) => (
                <ul key={ci} className="space-y-3">
                  {col.map((it) => (
                    <li key={it.label} className="flex items-center gap-2.5">
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                          it.roadmap
                            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                            : "bg-[var(--color-primary)] text-white"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3.5} />
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          it.roadmap
                            ? "text-[var(--color-faint)]"
                            : "text-[var(--color-foreground)]"
                        }`}
                      >
                        {t(`items.${it.label}`)}
                      </span>
                      {it.roadmap ? (
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-muted)] shadow-[0_1px_2px_rgba(10,10,10,0.08)]">
                          {t("roadmap")}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240} className="mt-12">
            <Button asChild size="lg">
              <a href={DASHBOARD_URL}>
                {t("start")}
                <ArrowRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
