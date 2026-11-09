import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Logo, LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/nav-links";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageLinks, LanguagePicker } from "@/components/language-picker";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import { COMPANY, CONTACT } from "@/lib/company";
import { guidesFor } from "@/lib/guides";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/locales";

/** FacebookMark — lucide v1 dropped brand glyphs, so the one brand icon the
 *  footer needs lives here inline. */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

const FOOTER_LINK =
  "underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[var(--color-foreground)]";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const [common, nav, footer] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "footer" }),
  ]);
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 shrink-0 bg-[var(--color-background)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" aria-label={nav("homeAria")}>
            <Logo />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLinks />
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-round)] text-[13.5px] font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:inline-flex"
            >
              {common("docs")}
            </a>
            <LanguagePicker />
            <Button asChild size="sm" variant="dark" className="ml-1">
              <a href={DASHBOARD_URL}>{nav("signIn")}</a>
            </Button>
            <MobileNav />
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="shrink-0 bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-10">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.3fr_auto_auto_auto_auto] lg:gap-12">
            <div>
              <div className="flex size-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.2)]">
                <LogoMark className="size-8" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
                {footer("tagline")}
              </p>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                {footer("linksHeading")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <a href={DOCS_URL} className={FOOTER_LINK}>
                    {common("docs")}
                  </a>
                </li>
                <li>
                  <Link href="/status" className={FOOTER_LINK}>
                    {common("status")}
                  </Link>
                </li>
                <li>
                  <Link href="/features" className={FOOTER_LINK}>
                    {common("features")}
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className={FOOTER_LINK}>
                    {common("guide")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                {footer("solutionsHeading")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                {guidesFor(locale).map((g) => (
                  <li key={g.slug}>
                    <Link href={g.slug} className={FOOTER_LINK}>
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                {footer("legalHeading")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <Link href="/terms" className={FOOTER_LINK}>
                    {common("terms")}
                  </Link>
                </li>
                <li>
                  <Link href="/verification" className={FOOTER_LINK}>
                    {common("verification")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                {footer("contactHeading")}
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-[var(--color-muted)]">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="group flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]"
                  >
                    <Phone className="size-4 shrink-0 text-[var(--color-primary)]" />
                    <span>{CONTACT.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]"
                  >
                    <Mail className="size-4 shrink-0 text-[var(--color-primary)]" />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-[var(--color-foreground)]"
                  >
                    <FacebookMark className="size-4 shrink-0 text-[var(--color-primary)]" />
                    {footer("facebook")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <LanguageLinks className="mt-12 text-sm text-[var(--color-muted)]" />

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row">
            <p className="text-center sm:text-left">
              {footer("rights", {
                year: String(new Date().getFullYear()),
                // The registered Mongolian name on Mongolian pages; its Latin
                // form everywhere else (no Mongolian on a translated page).
                company: locale === "mn" ? COMPANY.nameMn : COMPANY.nameEn,
              })}
            </p>
            <a
              href="https://buildry.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill !py-1 text-[11px] transition-colors hover:text-[var(--color-foreground)]"
            >
              {footer("byBuildry")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
