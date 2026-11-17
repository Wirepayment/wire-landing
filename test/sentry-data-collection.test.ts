import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Sentry v11 replaced sendDefaultPii with dataCollection, and its defaults
// collect user info, cookies, headers, request/response bodies and query
// params. Wire's cookies carry session tokens and its bodies carry payment
// data (CLAUDE.md rule #2), so every Sentry.init here must switch each one off.
const FILES = ["instrumentation.ts", "instrumentation-client.ts"];
const OFF = [
  "userInfo: false,",
  "cookies: false,",
  "httpHeaders: false,",
  "httpBodies: [],",
  "urlQueryParams: false,",
  "genAI: { inputs: false, outputs: false },",
  "mcp: { inputs: false, outputs: false },",
  "databaseQueryData: false,",
  "queues: false,",
  "stackFrameVariables: false,",
];

describe("Sentry dataCollection — nothing personal leaves the app", () => {
  it.each(FILES)("%s switches every collector off", (file) => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", file),
      "utf8",
    );
    const inits = src.split("Sentry.init(").length - 1;
    expect(inits).toBeGreaterThan(0);
    const blocks = src.match(/dataCollection: \{[\s\S]*?\n {4}\},/g) ?? [];
    expect(blocks).toHaveLength(inits);
    for (const block of blocks) {
      for (const line of OFF) expect(block).toContain(line);
    }
    expect(src).not.toMatch(/sendDefaultPii\s*:/);
  });
});
