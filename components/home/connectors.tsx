import Image from "next/image";
import { Building2, KeyRound } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { RICH } from "@/components/rich";
import { SectionHeading } from "@/components/home/section-heading";
import {
  connectorLogo,
  connectorModesFor,
  connectorsFor,
  type ConnectorMode,
  type ConnectorModeCopy,
} from "@/lib/connectors";
import { cn } from "@/lib/utils";

/* Connectors — the "Төлбөрийн сувгууд" grid: every live connector with its
 * logo, category, one line and how a merchant connects it (through Wire, or
 * with its own operator contract). Data: lib/connectors.ts, copy:
 * content/<locale>/connectors.ts. */

const MODE_ICON = { wire: Building2, byo: KeyRound } as const;

function ModePill({
  mode,
  copy,
}: {
  mode: ConnectorMode;
  copy: ConnectorModeCopy;
}) {
  const Icon = MODE_ICON[mode];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        mode === "wire"
          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
          : "border border-[var(--color-border)] bg-white text-[var(--color-muted)]",
      )}
    >
      <Icon className="size-3" />
      {copy.label}
    </span>
  );
}

export async function Connectors() {
  const [t, locale] = await Promise.all([
    getTranslations("home.connectors"),
    getLocale(),
  ]);
  const modes = connectorModesFor(locale);
  return (
    <section id="connectors" className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
        <SectionHeading
          badge={t("badge")}
          line1={t("line1")}
          line2={t("line2")}
          lead={t.rich("lead", RICH)}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {connectorsFor(locale).map((c, i) => (
            <Reveal
              key={c.id}
              delay={(i % 3) * 90}
              className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)] transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.35)]"
            >
              <div className="flex items-center gap-3.5">
                <Image
                  src={connectorLogo(c.id)}
                  alt={t("logoAlt", { name: c.name })}
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-xl border border-[var(--color-border)]"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight">
                    {c.name}
                  </h3>
                  <p className="text-[12px] font-medium text-[var(--color-faint)]">
                    {c.category}
                  </p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {c.desc}
              </p>
              <div className="mt-5">
                <ModePill mode={c.mode} copy={modes[c.mode]} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
          {(Object.keys(modes) as ConnectorMode[]).map((m) => (
            <div
              key={m}
              className="rounded-2xl bg-[var(--color-surface)]/60 p-5 text-left"
            >
              <ModePill mode={m} copy={modes[m]} />
              <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--color-muted)]">
                {modes[m].hint}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
