import { describe, it, expect, afterEach, vi } from "vitest";

// The constants are captured at module load, so each case re-imports the
// module with a fresh env.
async function loadLinks(): Promise<typeof import("@/lib/links")> {
  vi.resetModules();
  return import("@/lib/links");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("DASHBOARD_URL", () => {
  it("defaults to the local dashboard dev port", async () => {
    vi.stubEnv("NEXT_PUBLIC_DASHBOARD_URL", "");
    // An empty env var is still unset-like only when undefined — clear it fully.
    delete process.env.NEXT_PUBLIC_DASHBOARD_URL;
    const { DASHBOARD_URL } = await loadLinks();
    expect(DASHBOARD_URL).toBe("http://localhost:3001");
  });

  it("respects NEXT_PUBLIC_DASHBOARD_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_DASHBOARD_URL", "https://app.wire.mn");
    const { DASHBOARD_URL } = await loadLinks();
    expect(DASHBOARD_URL).toBe("https://app.wire.mn");
  });
});

describe("DOCS_URL", () => {
  it("defaults to the production docs domain", async () => {
    delete process.env.NEXT_PUBLIC_DOCS_URL;
    const { DOCS_URL } = await loadLinks();
    expect(DOCS_URL).toBe("https://docs.wire.mn");
  });

  it("respects NEXT_PUBLIC_DOCS_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_DOCS_URL", "http://localhost:3005");
    const { DOCS_URL } = await loadLinks();
    expect(DOCS_URL).toBe("http://localhost:3005");
  });

  it("default URLs are well-formed absolute URLs", async () => {
    delete process.env.NEXT_PUBLIC_DASHBOARD_URL;
    delete process.env.NEXT_PUBLIC_DOCS_URL;
    const { DASHBOARD_URL, DOCS_URL } = await loadLinks();
    expect(() => new URL(DASHBOARD_URL)).not.toThrow();
    expect(() => new URL(DOCS_URL)).not.toThrow();
  });
});
