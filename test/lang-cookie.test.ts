import { describe, it, expect } from "vitest";
import { langCookie, langCookieOptions } from "@/lib/lang-cookie";

describe("langCookie", () => {
  it("writes the choice for a year, site-wide, SameSite=Lax", () => {
    const c = langCookie("zh", "wire.mn");
    expect(c).toContain("wire_lang=zh");
    expect(c).toContain("Path=/");
    expect(c).toContain("Max-Age=31536000");
    expect(c).toContain("SameSite=Lax");
    expect(c).toContain("Domain=.wire.mn");
  });

  it.each([
    ["wire.mn", true],
    ["www.wire.mn", true],
    ["app.wire.mn", true],
    ["wire.mn:443", true],
    ["WIRE.MN", true],
    ["evilwire.mn", false],
    ["wire.mn.evil.com", false],
    ["localhost", false],
    ["localhost:3000", false],
    ["", false],
  ])("host %s shares across .wire.mn: %s", (host, shared) => {
    expect(langCookie("en", host).includes("Domain=.wire.mn")).toBe(shared);
    expect(langCookieOptions(host).domain).toBe(
      shared ? ".wire.mn" : undefined,
    );
  });

  it("has no Domain on localhost", () => {
    expect(langCookie("en", "localhost")).not.toContain("Domain");
  });
});
