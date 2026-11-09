import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { DEFAULT_LOCALE, HTML_LANG, LOCALES } from "@/i18n/locales";

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
