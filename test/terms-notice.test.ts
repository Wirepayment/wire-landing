import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import mn from "@/messages/mn.json";

// The terms page opens with a "the Mongolian version prevails" notice in the
// page's language. Mongolian needs none, so an empty legalNotice renders
// nothing; a translation that sets it shows it first.
let messages: typeof mn = mn;

vi.mock("next-intl/server", async () => {
  const { createTranslator } = await import("next-intl");
  return {
    setRequestLocale: () => {},
    getTranslations: async (namespace: "terms") =>
      createTranslator({ locale: "mn", messages, namespace }),
  };
});

const { default: TermsPage } =
  await import("@/app/[locale]/(marketing)/terms/page");

async function render(legalNotice: string): Promise<string> {
  messages = { ...mn, terms: { ...mn.terms, legalNotice } };
  const page = await TermsPage({ params: Promise.resolve({ locale: "mn" }) });
  return renderToStaticMarkup(page);
}

describe("terms legal notice", () => {
  it("renders nothing when the message is empty (Mongolian)", async () => {
    const html = await render("");
    const badge = html.indexOf(mn.terms.badge);
    expect(badge).toBeGreaterThan(-1);
    // nothing — not even an empty paragraph — comes before the badge
    expect(html.slice(0, badge)).not.toMatch(/<p[\s>]/);
  });

  it("shows a set notice before the page heading", async () => {
    const notice =
      "This is a translation. The Mongolian version is legally binding.";
    const html = await render(notice);
    expect(html).toContain(notice);
    expect(html.indexOf(notice)).toBeLessThan(html.indexOf(mn.terms.heading));
  });
});
