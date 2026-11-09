import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CONNECTORS, connectorLogo } from "@/lib/connectors";
import { Connectors } from "@/components/home/connectors";
import { FAQS } from "@/lib/faq";
import { llmsTxt } from "@/lib/llms";
import { brandNames } from "./brand-names";

const root = path.resolve(import.meta.dirname, "..");
const read = (rel: string) => readFileSync(path.join(root, rel), "utf8");

// The six connectors live in production on 2026-11-08 — this list is the
// contract the home page has to keep.
const LIVE = {
  qpay: { name: "QPay", mode: "wire" },
  paylink: { name: "PayLink", mode: "wire" },
  storepay: { name: "StorePay", mode: "byo" },
  toki: { name: "Toki", mode: "byo" },
  monpay: { name: "MonPay", mode: "byo" },
  pocket: { name: "Pocket Zero", mode: "byo" },
} as const;

describe("connectors", () => {
  it("lists exactly the six live connectors with the right mode", () => {
    expect(
      Object.fromEntries(
        CONNECTORS.map((c) => [c.id, { name: c.name, mode: c.mode }]),
      ),
    ).toEqual(LIVE);
    expect(CONNECTORS).toHaveLength(Object.keys(LIVE).length);
  });

  it("has a PNG logo on disk for every connector", () => {
    for (const c of CONNECTORS) {
      const file = path.join(root, "public", connectorLogo(c.id));
      expect(existsSync(file), file).toBe(true);
      // PNG signature: \x89PNG
      expect(readFileSync(file).subarray(0, 4).toString("hex")).toBe(
        "89504e47",
      );
    }
  });

  it("are all shown, with their logos, in the home connectors section", () => {
    const html = renderToStaticMarkup(createElement(Connectors));
    for (const c of CONNECTORS) {
      expect(html).toContain(`>${c.name}</h3>`);
      expect(html).toContain(encodeURIComponent(connectorLogo(c.id)));
      expect(html).toContain(`alt="${c.name} лого"`);
    }
    expect(html).toContain("Wire-ээр");
    expect(html).toContain("Өөрийн гэрээгээр (BYO)");
  });

  it("is a section of the home page", () => {
    expect(read("app/[locale]/(marketing)/page.tsx")).toContain(
      "<Connectors />",
    );
  });

  it("gives every connector a payment-method group on the features page", () => {
    const features = read("app/[locale]/(marketing)/features/page.tsx");
    for (const c of CONNECTORS) {
      expect(features, c.id).toContain(`group: "${c.group}"`);
    }
  });

  it("are named in the visible FAQ and in llms.txt", () => {
    const faq = FAQS.map((f) => f.a).join("\n");
    const txt = llmsTxt();
    for (const c of CONNECTORS) {
      expect(faq, c.name).toContain(c.name);
      expect(txt, c.name).toContain(c.name);
    }
  });

  it("pass the brand guard (connector names are allowed on wire.mn)", () => {
    expect(brandNames(CONNECTORS.map((c) => c.name).join(", "))).toEqual([]);
    expect(brandNames(JSON.stringify(CONNECTORS))).toEqual([]);
  });
});
