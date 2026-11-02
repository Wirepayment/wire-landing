"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Эхлэл" },
  { href: "/features", label: "Боломжууд" },
  { href: "/verification", label: "Баталгаажуулалт" },
  { href: "/guide", label: "Гарын авлага" },
  { href: "/links", label: "Төлбөрийн линк" },
  { href: "/developers", label: "Хөгжүүлэгч" },
];

/** NavLinks — the marketing header menu with the current page highlighted
 *  (ink text + a hand-drawn mint underline). Inline from md up; below that the
 *  hamburger MobileNav owns navigation (no partially-hidden in-between state). */
export function NavLinks() {
  const pathname = usePathname();
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
            {item.label}
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
