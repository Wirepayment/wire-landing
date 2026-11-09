"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { DOCS_URL } from "@/lib/links";

const ITEMS = [
  { href: "/", label: "home" },
  { href: "/features", label: "features" },
  { href: "/verification", label: "verification" },
  { href: "/guide", label: "guide" },
  { href: "/links", label: "links" },
  { href: "/developers", label: "developers" },
] as const;

/** MobileNav — the marketing menu for small screens (the inline NavLinks hide
 *  below sm/md): a hamburger that opens a full-width sheet under the header.
 *  Closes on route change; locks body scroll while open. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common");
  const nav = useTranslations("nav");

  // close when the route changes (Link navigation)
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? nav("closeMenu") : nav("openMenu")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface)]"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-pop,0_12px_32px_rgba(26,26,26,0.14))]">
          <nav className="mx-auto max-w-6xl px-5 py-3">
            {ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                    active
                      ? "bg-[var(--color-primary-soft)] font-semibold text-[var(--color-primary)]"
                      : "text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[15px] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)]"
            >
              {t("docs")}
              <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
