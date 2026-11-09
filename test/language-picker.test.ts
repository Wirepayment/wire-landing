import { describe, it, expect } from "vitest";
import { switchHref } from "@/lib/lang-cookie";

describe("switchHref", () => {
  it.each([
    ["mn", "/features", "?a=1", "/features?a=1"],
    ["ko", "/", "", "/ko"],
    ["en", "/", "?utm_source=fb", "/en?utm_source=fb"],
    ["zh", "/guides/qr-payments", "", "/zh/guides/qr-payments"],
    ["mn", "/", "", "/"],
    // search with or without the leading "?"
    ["en", "/features", "a=1&b=2", "/en/features?a=1&b=2"],
    ["en", "/features", "?", "/en/features"],
  ] as const)("%s %s %s -> %s", (target, path, search, want) => {
    expect(switchHref(target, path, search)).toBe(want);
  });
});
