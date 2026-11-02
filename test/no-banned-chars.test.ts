import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Owner rule (2026-10-26): the guillemets and the dagger are not used anywhere
// — UI copy, docs, comments. Name on-screen buttons with a styled label
// (components/ui-label.tsx; bold in MDX) or rephrase. The characters are
// spelled as escapes here so this file passes its own scan.
const BANNED = /[\u00AB\u00BB\u2020]/;

// Inside the monorepo the guard covers every project; once landing is its own
// repo (docs/superpowers/specs/2026-11-01-repo-split-design.md) it covers that
// repo, and each other repo carries its own copy of this test.
const MONOREPO = path.resolve(import.meta.dirname, "../../..");
const inMonorepo = existsSync(path.join(MONOREPO, "pnpm-workspace.yaml"));
const repo = inMonorepo ? MONOREPO : path.resolve(import.meta.dirname, "..");
const ROOTS = inMonorepo ? ["apps", "internal", "cmd", "api", "docs"] : ["."];
const ROOT_FILES = inMonorepo ? ["CLAUDE.md", "ROADMAP.md", "README.md"] : [];
// docs/legal holds the source of signed/filed documents (their DOCX copies
// are edited by hand) — changed only together with those documents.
const SKIP = new Set([
  ".git",
  "node_modules",
  ".next",
  ".source",
  ".turbo",
  "public",
  "legal",
]);
const EXT = /\.(tsx?|mjs|css|mdx?|json|ya?ml|go)$/;

function scan(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) scan(full, out);
    else if (EXT.test(name) && BANNED.test(readFileSync(full, "utf8"))) {
      out.push(path.relative(repo, full));
    }
  }
}

describe("banned characters", () => {
  it("appear in no app, Go, API or docs file", () => {
    const hits: string[] = [];
    for (const root of ROOTS) scan(path.join(repo, root), hits);
    for (const f of ROOT_FILES) {
      if (BANNED.test(readFileSync(path.join(repo, f), "utf8"))) hits.push(f);
    }
    expect(hits).toEqual([]);
  });
});
