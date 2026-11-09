"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const ITEMS = [
  { href: "/", label: "home" },
  { href: "/features", label: "features" },
  { href: "/verification", label: "verification" },
  { href: "/guide", label: "guide" },
  { href: "/links", label: "links" },
  { href: "/developers", label: "developers" },
] as const;

/** NavLinks — the marketing header menu with the current page highlighted
 *  (ink text + a hand-drawn mint underline). Inline from md up; below that the
 *  hamburger MobileNav owns navigation (no partially-hidden in-between state). */
export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("common");
  return (
    <>
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        const visibility = "hidden md:inline-flex";
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative px-3 py-1.5 font-[family-name:var(--font-round)] text-[13.5px] font-semibold transition-colors ${visibility} ${
              active
                ? "font-bold text-[var(--color-foreground)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {t(item.label)}
            {active && (
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-0.5 h-[3px] bg-[var(--color-primary)]"
              />
            )}
          </Link>
        );
      })}
    </>
  );
}
