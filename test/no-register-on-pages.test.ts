import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { COMPANY } from "@/lib/company";

// Owner decision 2026-10-26: the state register number appears only in
// /llms.txt — never on a rendered page (footer, FAQ, JSON-LD).
const root = path.resolve(import.meta.dirname, "..");
const ALLOWED = new Set(["lib/company.ts", "lib/llms.ts"]);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(tsx?|mdx?)$/.test(name) ? [full] : [];
  });
}

describe("register number stays off the pages", () => {
  const files = ["app", "components", "lib"].flatMap((d) =>
    walk(path.join(root, d)),
  );

  it.each(files.map((f) => path.relative(root, f)))("%s", (rel) => {
    if (ALLOWED.has(rel)) return;
    const src = readFileSync(path.join(root, rel), "utf8");
    expect(src).not.toContain(COMPANY.registerNo);
    expect(src).not.toContain("registerNo");
  });
});
