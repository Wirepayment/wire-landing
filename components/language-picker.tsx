"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { Flag } from "@/components/flag";
import { usePathname } from "@/i18n/navigation";
import { HTML_LANG, LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/locales";
import { langCookie, switchHref } from "@/lib/lang-cookie";

/** useSwitchLocale — the one way to change language: record the choice in
 *  wire_lang (so the IP redirect never overrides it again), then open the same
 *  page in the target language with the query string kept. Choosing the
 *  current language does nothing. */
function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();

  const choose = (target: Locale, e?: MouseEvent) => {
    if (target === current) {
      e?.preventDefault();
      return;
    }
    document.cookie = langCookie(target, window.location.host);
    // A modified click (new tab/window) keeps the browser's default.
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return;
    e?.preventDefault();
    router.replace(switchHref(target, pathname, window.location.search));
  };

  return { current, pathname, choose };
}

/** LanguagePicker — the header's globe button with the current language's
 *  own name; opens a menu of the four languages, the current one checked.
 *  Keyboard: Enter/Space/ArrowDown open, arrows/Home/End move, Escape closes
 *  and returns focus to the button, Tab or a click outside closes. */
export function LanguagePicker({ className = "" }: { className?: string }) {
  const nav = useTranslations("nav");
  const { current, pathname, choose } = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);

  const focusItem = (i: number) => {
    const n = LOCALES.length;
    items.current[((i % n) + n) % n]?.focus();
  };

  // On open, focus the current language.
  useEffect(() => {
    if (open) focusItem(LOCALES.indexOf(current));
  }, [open, current]);

  // Click (or tap) outside closes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    const at = items.current.indexOf(
      document.activeElement as HTMLAnchorElement | null,
    );
    const moves: Partial<Record<string, number>> = {
      ArrowDown: at + 1,
      ArrowUp: at - 1,
      Home: 0,
      End: LOCALES.length - 1,
    };
    const to = moves[e.key];
    if (to !== undefined) {
      e.preventDefault();
      focusItem(to);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      button.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key === " " && at >= 0) {
      e.preventDefault();
      items.current[at]?.click();
    }
  };

  const label = `${nav("language")}: ${LOCALE_NAMES[current]}`;

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex h-9 items-center gap-1.5 rounded-full px-2.5 font-[family-name:var(--font-round)] text-[13.5px] font-semibold text-[var(--color-muted)] transition-colors outline-none hover:text-[var(--color-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      >
        <Flag locale={current} className="size-[18px]" />
        <span lang={HTML_LANG[current]} className="hidden sm:inline">
          {LOCALE_NAMES[current]}
        </span>
        <ChevronDown className="hidden size-3.5 sm:block" aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={nav("language")}
          onKeyDown={onMenuKey}
          className="absolute right-0 top-11 z-50 min-w-40 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-1 shadow-[var(--shadow-pop,0_12px_32px_rgba(26,26,26,0.14))]"
        >
          {LOCALES.map((l, i) => {
            const checked = l === current;
            return (
              <a
                key={l}
                ref={(el) => {
                  items.current[i] = el;
                }}
                role="menuitemradio"
                aria-checked={checked}
                tabIndex={-1}
                lang={HTML_LANG[l]}
                hrefLang={HTML_LANG[l]}
                href={switchHref(l, pathname, "")}
                onClick={(e) => {
                  setOpen(false);
                  choose(l, e);
                }}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-[var(--color-surface)] focus:bg-[var(--color-surface)] ${
                  checked
                    ? "font-semibold text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Flag locale={l} className="size-[18px]" />
                  {LOCALE_NAMES[l]}
                </span>
                {checked && (
                  <Check
                    className="size-4 text-[var(--color-primary)]"
                    aria-hidden
                  />
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** LanguageLinks — the four languages as a plain row of links (footer, mobile
 *  sheet). Same switch as the picker: the click records the choice. */
export function LanguageLinks({ className = "" }: { className?: string }) {
  const nav = useTranslations("nav");
  const { current, pathname, choose } = useSwitchLocale();
  return (
    <nav aria-label={nav("language")} className={className}>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {LOCALES.map((l) => (
          <li key={l}>
            <a
              lang={HTML_LANG[l]}
              hrefLang={HTML_LANG[l]}
              href={switchHref(l, pathname, "")}
              aria-current={l === current ? "true" : undefined}
              onClick={(e) => choose(l, e)}
              className={`inline-flex items-center gap-1.5 ${
                l === current
                  ? "font-semibold text-[var(--color-foreground)]"
                  : "transition-colors hover:text-[var(--color-foreground)] [&>span]:underline [&>span]:decoration-[var(--color-border-strong)] [&>span]:underline-offset-4"
              }`}
            >
              <Flag locale={l} />
              <span>{LOCALE_NAMES[l]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
