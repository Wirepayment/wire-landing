import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { FileText } from "lucide-react";
import { CONTACT } from "@/lib/company";
import type { Locale } from "@/i18n/locales";

export const metadata: Metadata = pageMetadata("/terms");

// Mirrors the dashboard terms dialog (apps/dashboard/components/terms-dialog.tsx)
// — update both together. Operator-agnostic (CLAUDE.md critical rule #9).
const SECTIONS = [
  "service",
  "account",
  "kyc",
  "privacy",
  "payments",
  "duties",
  "termination",
] as const;

/** Terms — the public terms-of-service page (same content as the dashboard
 *  dialog, so signin/onboarding and the marketing site tell one story). */
export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
  const legalNotice = t("legalNotice");
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-2xl px-5 py-14 text-center sm:py-16">
        {legalNotice ? (
          <p className="mx-auto mb-6 max-w-md rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-[13px] text-[var(--color-muted)]">
            {legalNotice}
          </p>
        ) : null}
        <span className="badge-pill">
          <FileText className="size-3.5 text-[var(--color-primary)]" />
          {t("badge")}
        </span>
        <h1 className="display mt-5 text-[clamp(32px,4.5vw,48px)]">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-muted)]">
          {t("lead")}
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-7 text-left shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-36px_rgba(16,185,129,0.18)] sm:p-9">
          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s}>
                <h2 className="text-[15px] font-semibold tracking-tight">
                  {t(`sections.${s}.title`)}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t(`sections.${s}.body`)}
                </p>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--color-faint)]">
          {t.rich("updated", {
            email: CONTACT.email,
            link: (chunks) => (
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[var(--color-primary)] hover:opacity-80"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
