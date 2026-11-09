import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { parseSync } from "vite";
import { LOCALE_NAMES } from "@/i18n/locales";
import { COMPANY } from "@/lib/company";

// Page copy lives in messages/<locale>.json, so a Mongolian string left in a
// page or component would show up untranslated on /en, /zh and /ko. This
// guard parses every page and component and fails on Cyrillic in a string
// literal, a template literal or JSX text. Comments are not copy and are not
// scanned.
const root = path.resolve(import.meta.dirname, "..");
const ROOTS = ["app/[locale]", "components"];

// Proper names that stay Mongolian in every language. They are read from
// their source here, so a page that inlines one is not flagged.
const ALLOWLIST = new Set<string>([LOCALE_NAMES.mn, COMPANY.nameMn]);

// Files not converted yet. Must be empty once the page copy is extracted.
const PENDING: string[] = [];

const CYRILLIC = /[\u0400-\u04FF]/;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return name.endsWith(".tsx") ? [full] : [];
  });
}

type Node = { type?: string; start?: number; [k: string]: unknown };

/** Every string literal, template-literal chunk and JSX text that holds
 *  Cyrillic and is not allowlisted, with its line number. */
function cyrillicCopy(file: string, src: string): string[] {
  const { program, errors } = parseSync(file, src, { lang: "tsx" });
  if (errors.length) throw new Error(`${file}: ${errors[0]?.message}`);
  const hits: string[] = [];
  const report = (node: Node, text: unknown) => {
    if (typeof text !== "string" || !CYRILLIC.test(text)) return;
    if (ALLOWLIST.has(text.trim())) return;
    const line = src.slice(0, node.start ?? 0).split("\n").length;
    hits.push(`${file}:${line} ${text.trim().slice(0, 60)}`);
  };
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    const node = value as Node;
    if (node.type === "Literal" || node.type === "JSXText") {
      report(node, node.value);
    } else if (node.type === "TemplateElement") {
      report(node, (node.value as { cooked?: string } | undefined)?.cooked);
    }
    for (const child of Object.values(node)) visit(child);
  };
  visit(program);
  return hits;
}

describe("cyrillicCopy", () => {
  it("finds string literals, template chunks and JSX text", () => {
    const src = [
      'const a = "Сайн";',
      "const b = `x ${a} Байна`;",
      "const c = <p title='Гарчиг'>Текст</p>;",
    ].join("\n");
    expect(cyrillicCopy("x.tsx", src)).toEqual([
      "x.tsx:1 Сайн",
      "x.tsx:2 Байна",
      "x.tsx:3 Гарчиг",
      "x.tsx:3 Текст",
    ]);
  });

  it("ignores comments, Latin copy and allowlisted names", () => {
    const src = [
      "// Монгол тайлбар",
      "/* бас нэг */",
      'const a = "English";',
      `const b = "${COMPANY.nameMn}";`,
      `const c = <span>${LOCALE_NAMES.mn}</span>;`,
    ].join("\n");
    expect(cyrillicCopy("x.tsx", src)).toEqual([]);
  });
});

describe("no hard-coded copy in pages and components", () => {
  const files = ROOTS.flatMap((d) => walk(path.join(root, d))).map((f) =>
    path.relative(root, f),
  );

  it("PENDING lists only files that exist", () => {
    expect(PENDING.filter((f) => !files.includes(f))).toEqual([]);
  });

  it("every file is converted (PENDING is empty)", () => {
    expect(PENDING).toEqual([]);
  });

  it.each(files.filter((f) => !PENDING.includes(f)))("%s", (rel) => {
    const src = readFileSync(path.join(root, rel), "utf8");
    expect(cyrillicCopy(rel, src)).toEqual([]);
  });
});
