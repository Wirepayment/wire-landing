import { describe, it, expect } from "vitest";
import { COMPANY, CONTACT } from "@/lib/company";

describe("COMPANY", () => {
  it("names the registered entity in both scripts", () => {
    expect(COMPANY.nameMn).toBe("Билдрай Эй Ай ХХК");
    expect(COMPANY.nameEn).toBe("Buildry AI LLC");
  });

  it("carries a plain state register number (llms.txt only)", () => {
    expect(COMPANY.registerNo).toMatch(/^\d{7}$/);
  });
});

describe("CONTACT", () => {
  it("dials the same number it displays", () => {
    const digits = CONTACT.phone.replace(/\D/g, "");
    expect(CONTACT.phoneHref).toBe(`tel:+${digits}`);
    expect(CONTACT.phone.startsWith("+976")).toBe(true);
  });

  it("points at an absolute https Facebook page", () => {
    const url = new URL(CONTACT.facebook);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("www.facebook.com");
    expect(url.pathname).toBe("/buildry");
  });

  it("uses the wire.mn support inbox", () => {
    expect(CONTACT.email).toBe("usukhbayar@buildry.cloud");
  });
});
