import { describe, it, expect } from "vitest";
import { clickIntent, switchHref, type LinkClick } from "@/lib/lang-cookie";

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

// A middle click fires auxclick, never click; every way of opening another
// language must record the choice, or the new tab is redirected by IP.
describe("clickIntent", () => {
  const click = (button: number, mods: Partial<LinkClick> = {}): LinkClick => ({
    button,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    ...mods,
  });

  it.each([
    ["plain primary click", click(0), "switch"],
    ["middle click", click(1), "newTab"],
    ["ctrl-click", click(0, { ctrlKey: true }), "newTab"],
    ["cmd-click", click(0, { metaKey: true }), "newTab"],
    ["shift-click", click(0, { shiftKey: true }), "newTab"],
    ["alt-click", click(0, { altKey: true }), "newTab"],
    ["right click", click(2), "none"],
    ["back button", click(3), "none"],
  ] as const)("other language, %s -> %s", (_, e, want) => {
    expect(clickIntent("en", "mn", e)).toBe(want);
  });

  it.each([
    ["plain primary click", click(0), "same"],
    ["cmd-click", click(0, { metaKey: true }), "same"],
    ["middle click", click(1), "none"],
    ["right click", click(2), "none"],
  ] as const)("current language, %s -> %s", (_, e, want) => {
    expect(clickIntent("ko", "ko", e)).toBe(want);
  });
});
