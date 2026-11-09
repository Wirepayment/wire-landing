import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  LOCALE_NAMES,
} from "@/i18n/locales";
import { ENABLED_LOCALES } from "./translated-locales";

// Checks on the prerendered pages in .next/ — run after `pnpm build` (the
// verify command builds before it tests).
const nextDir = path.resolve(import.meta.dirname, "../.next");

function html(locale: string): string {
  const file = path.join(nextDir, "server/app", `${locale}.html`);
  expect(existsSync(file), `${file} missing: run pnpm build`).toBe(true);
  return readFileSync(file, "utf8");
}

describe("built pages", () => {
  // globals.css keys the CJK font stacks on html:lang(HTML_LANG[...]), so the
  // attribute on the page must be that exact value.
  it.each(LOCALES)("%s: <html lang> is HTML_LANG", (l) => {
    expect(html(l)).toMatch(new RegExp(`<html[^>]*\\slang="${HTML_LANG[l]}"`));
  });

  it("link the same stylesheets on every locale", () => {
    const sheets = (l: string) =>
      [...html(l).matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)]
        .map((m) => m[1] ?? "")
        .sort();
    const fontPreloads = (l: string) =>
      html(l).match(/<link[^>]*rel="preload"[^>]*as="font"[^>]*>/g) ?? [];
    for (const l of LOCALES.filter((x) => x !== DEFAULT_LOCALE)) {
      expect(sheets(l), l).toEqual(sheets(DEFAULT_LOCALE));
      expect(fontPreloads(l), l).toEqual(fontPreloads(DEFAULT_LOCALE));
    }
    // No CJK web font is served anywhere (system stacks only).
    for (const href of sheets(DEFAULT_LOCALE)) {
      const sheet = readFileSync(
        path.join(nextDir, href.replace("/_next/", "")),
        "utf8",
      );
      expect(sheet, href).not.toMatch(/@font-face\s*\{[^}]*Noto/);
    }
  });
});

/** Every prerendered page of one locale: <locale>.html and <locale>/**.html. */
function pagesOf(locale: string): string[] {
  const appDir = path.join(nextDir, "server/app");
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) return walk(full);
      return name.endsWith(".html") ? [full] : [];
    });
  const sub = path.join(appDir, locale);
  return [
    path.join(appDir, `${locale}.html`),
    ...(existsSync(sub) ? walk(sub) : []),
  ];
}

/** What a reader (or a search snippet) sees: text between tags, the <title>,
 *  meta content and alt/title/aria-label/placeholder attributes. Scripts and
 *  styles are code, not copy — the JSON-LD's alternateName (the company's
 *  registered Mongolian name) and the RSC payload live there. */
export function visibleText(html: string): string {
  const attrs = [
    ...html.matchAll(/\s(?:alt|title|aria-label|placeholder)="([^"]*)"/g),
    ...html.matchAll(/<meta\b[^>]*\scontent="([^"]*)"/g),
  ].map((m) => m[1] ?? "");
  const text = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
  return [text, ...attrs].join(" ");
}

const CYRILLIC_RUN = /[\p{Script=Cyrillic}][\p{Script=Cyrillic}\s.,:;-]*/gu;

describe("visibleText", () => {
  it("keeps text and attributes, drops scripts, styles and tags", () => {
    const html =
      '<html><head><title>T1</title><meta name="description" content="D1">' +
      '<style>.a{}</style><script type="application/ld+json">{"x":"S1"}</script>' +
      '</head><body><p class="c">P1 <b>B1</b></p><img alt="A1" src="x">' +
      '<a aria-label="L1" href="/h">x</a></body></html>';
    const text = visibleText(html);
    for (const seen of ["T1", "D1", "P1", "B1", "A1", "L1"]) {
      expect(text).toContain(seen);
    }
    for (const hidden of ["S1", ".a{}", "class", "/h"]) {
      expect(text).not.toContain(hidden);
    }
  });
});

// Spec §7.7: a translated page shows no Mongolian. The only Cyrillic allowed
// is the language picker's own name for Mongolian.
for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
  describe.skipIf(!ENABLED_LOCALES.includes(locale))(
    `built ${locale} pages`,
    () => {
      it(`show no Cyrillic but ${LOCALE_NAMES.mn}`, () => {
        const pages = pagesOf(locale);
        expect(pages.length).toBeGreaterThan(10);
        const hits = pages.flatMap((file) => {
          expect(existsSync(file), `${file} missing: run pnpm build`).toBe(
            true,
          );
          const text = visibleText(readFileSync(file, "utf8"))
            .split(LOCALE_NAMES.mn)
            .join(" ");
          return [...text.matchAll(CYRILLIC_RUN)].map(
            (m) => `${path.relative(nextDir, file)}: ${m[0].trim()}`,
          );
        });
        expect(hits).toEqual([]);
      });
    },
  );
}
