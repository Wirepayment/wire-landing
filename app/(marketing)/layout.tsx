import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo, LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/nav-links";
import { MobileNav } from "@/components/mobile-nav";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import { COMPANY, CONTACT } from "@/lib/company";
import { GUIDES } from "@/lib/guides";

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

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 shrink-0 bg-[var(--color-background)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" aria-label="wire нүүр">
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
              Docs
            </a>
            <Button asChild size="sm" variant="dark" className="ml-1">
              <a href={DASHBOARD_URL}>Нэвтрэх</a>
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
                Бүх төлбөрөө нэг гарцаар — Монголын төлбөрийн операторуудад нэг
                холболтоор.
              </p>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Холбоос
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <a href={DOCS_URL} className={FOOTER_LINK}>
                    Docs
                  </a>
                </li>
                <li>
                  <Link href="/status" className={FOOTER_LINK}>
                    Статус
                  </Link>
                </li>
                <li>
                  <Link href="/features" className={FOOTER_LINK}>
                    Боломжууд
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className={FOOTER_LINK}>
                    Гарын авлага
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Шийдлүүд
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                {GUIDES.filter((g) => g.lang === "mn").map((g) => (
                  <li key={g.path}>
                    <Link href={g.path} className={FOOTER_LINK}>
                      {g.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/en" hrefLang="en" className={FOOTER_LINK}>
                    English
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Эрх зүй
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <Link href="/terms" className={FOOTER_LINK}>
                    Үйлчилгээний нөхцөл
                  </Link>
                </li>
                <li>
                  <Link href="/verification" className={FOOTER_LINK}>
                    Баталгаажуулалт
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Холбоо барих
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
                    Facebook хуудас
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {COMPANY.nameMn} · wire.mn. Бүх эрх
              хамгаалагдсан.
            </p>
            <a
              href="https://buildry.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill !py-1 text-[11px] transition-colors hover:text-[var(--color-foreground)]"
            >
              A product by Buildry ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
