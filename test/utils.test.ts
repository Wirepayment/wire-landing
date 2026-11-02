import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins simple class lists", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("resolves Tailwind conflicts — last wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-emerald-500")).toBe("text-emerald-500");
  });

  it("keeps non-conflicting utilities", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, null, "")).toBe("a");
  });

  it("supports conditional objects and arrays", () => {
    expect(cn({ a: true, b: false }, ["c", { d: true }])).toBe("a c d");
  });

  it("returns an empty string for no input", () => {
    expect(cn()).toBe("");
  });
});
