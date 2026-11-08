import { describe, expect, it } from "vitest";

import { CONNECTORS } from "@/lib/connectors";
import { brandNames } from "./brand-names";

// Forbidden names are spelled backwards here so the repo never holds them in
// clear. Connector names are public on wire.mn and written as they are.
const back = (s: string) => [...s].reverse().join("");

describe("brandNames()", () => {
  it("finds a whole Latin name in any case", () => {
    expect(brandNames(`Pay with ${back("YAPLAICOS")} today`)).toHaveLength(1);
    expect(brandNames(`like ${back("epirtS")}`)).toHaveLength(1);
  });

  it("finds a two-word name with or without the space", () => {
    expect(brandNames(`via ${back("yenom tsom")}`)).toHaveLength(1);
    expect(brandNames(`via ${back("yenomtsom")}`)).toHaveLength(1);
  });

  it("finds an inflected Cyrillic name", () => {
    expect(brandNames(`${back("тмолог")}ын карт`)).toHaveLength(1);
  });

  it("still finds the card connector's processor, which is not a connector", () => {
    expect(brandNames(`${back("idgeN")} processor`)).toHaveLength(1);
    expect(brandNames(`${back("идгэН")}ийн гэрээ`)).toHaveLength(1);
  });

  it("does not flag ordinary words that merely contain a name", () => {
    expect(brandNames("tokens striped money bank Монголын банк")).toEqual([]);
  });

  it("allows every live connector name (owner decision 2026-11-08)", () => {
    for (const c of CONNECTORS) {
      expect(brandNames(`Pay with ${c.name} today`), c.name).toEqual([]);
      expect(brandNames(c.name.toUpperCase()), c.name).toEqual([]);
    }
  });

  it("still catches a forbidden name next to a connector name", () => {
    const text = `${CONNECTORS.map((c) => c.name).join(" ")} ${back("epirts")}`;
    expect(brandNames(text)).toHaveLength(1);
  });
});
