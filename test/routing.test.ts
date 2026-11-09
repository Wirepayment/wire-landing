import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import proxy, { config } from "@/proxy";

const appDir = path.resolve(import.meta.dirname, "../app");

/** Every `page.tsx` under app/, relative to app/ ("[locale]/(marketing)/page.tsx"). */
function pageFiles(dir = appDir): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return pageFiles(full);
    return name === "page.tsx" ? [path.relative(appDir, full)] : [];
  });
}

describe("[locale] routing", () => {
  it("puts every page under app/[locale]/", () => {
    const files = pageFiles();
    expect(files.length).toBeGreaterThan(10);
    for (const f of files) expect(f.split(path.sep)[0], f).toBe("[locale]");
  });
});

describe("messages/mn.json", () => {
  it("parses and carries the shell namespaces", () => {
    const raw = readFileSync(
      path.resolve(import.meta.dirname, "../messages/mn.json"),
      "utf8",
    );
    const messages = JSON.parse(raw) as Record<string, unknown>;
    for (const ns of ["nav", "footer", "common"]) {
      expect(typeof messages[ns], ns).toBe("object");
    }
  });
});

describe("proxy matcher", () => {
  const matches = (url: string) =>
    unstable_doesMiddlewareMatch({ config, url });

  it.each([
    "/llms.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/googleb63b661d013ac436.html",
    "/icon.png",
    "/brand/wire-icon.png",
    "/opengraph-image",
    "/_next/static/chunks/main.js",
    "/_next/image?url=%2Fbrand%2Fwire-icon.png&w=64&q=75",
    "/api/anything",
    "/monitoring",
    "/monitoring?o=1&p=2",
  ])("skips %s", (url) => {
    expect(matches(url)).toBe(false);
  });

  it.each([
    "/",
    "/features",
    "/en",
    "/en/features",
    "/zh/guides/qr-payments",
    "/guides/qr-payments",
    "/guides/qr-payments?utm_source=fb",
    "/status",
  ])("runs on %s", (url) => {
    expect(matches(url)).toBe(true);
  });
});

function request(
  url: string,
  init: { method?: string; headers?: Record<string, string> } = {},
) {
  return new NextRequest(new URL(url, "http://localhost:3000"), init);
}

describe("proxy", () => {
  it("sends a first visit from abroad to its language, query kept", async () => {
    const res = await proxy(
      request("/guides/qr-payments?utm_source=fb", {
        headers: { "x-wire-country": "ZZ" },
      }),
    );
    expect(res.status).toBe(307);
    // Absolute here; Next's runtime sends it relative (same origin).
    expect(res.headers.get("location")).toBe(
      "http://localhost:3000/en/guides/qr-payments?utm_source=fb",
    );
    expect(res.headers.get("cache-control")).toBe("private, no-store");
  });

  it("serves Mongolian when nothing is known", async () => {
    const res = await proxy(request("/features"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    // next-intl rewrites the unprefixed URL onto the mn segment.
    expect(res.headers.get("x-middleware-rewrite")).toBe(
      "http://localhost:3000/mn/features",
    );
    // wire_lang is written only by the language picker.
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("keeps a saved Mongolian choice from abroad", async () => {
    const res = await proxy(
      request("/features", {
        headers: { "x-wire-country": "US", cookie: "wire_lang=mn" },
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("never redirects a prefixed URL", async () => {
    const res = await proxy(
      request("/zh/features", { headers: { "x-wire-country": "KR" } }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("drops the redundant /mn prefix", async () => {
    const res = await proxy(request("/mn/features"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/features");
  });
});
