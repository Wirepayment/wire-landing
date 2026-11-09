import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { LOCALE_NAMES, type Locale } from "@/i18n/locales";
import { COMPANY } from "@/lib/company";
import * as mnConnectors from "@/content/mn/connectors";
import * as mnFaq from "@/content/mn/faq";
import * as mnGuides from "@/content/mn/guides";
import * as mnPages from "@/content/mn/pages";
import * as enConnectors from "@/content/en/connectors";
import * as enFaq from "@/content/en/faq";
import * as enGuides from "@/content/en/guides";
import * as enPages from "@/content/en/pages";
import * as zhConnectors from "@/content/zh/connectors";
import * as zhFaq from "@/content/zh/faq";
import * as zhGuides from "@/content/zh/guides";
import * as zhPages from "@/content/zh/pages";
import * as koConnectors from "@/content/ko/connectors";
import * as koFaq from "@/content/ko/faq";
import * as koGuides from "@/content/ko/guides";
import * as koPages from "@/content/ko/pages";
import { brandNames } from "./brand-names";
import { ENABLED_LOCALES, TRANSLATED_LOCALES } from "./translated-locales";

// Guards for translated copy (spec §7.7): messages/<locale>.json and
// content/<locale>/*.ts mirror Mongolian key for key, hold no Mongolian, and
// keep every public-copy rule (#9 brands, banned characters, register
// number) in every language. A locale is checked once it is in
// ENABLED_LOCALES (test/translated-locales.ts).

const root = path.resolve(import.meta.dirname, "..");

type Module = Record<string, unknown>;
const CONTENT: Record<Locale, Record<string, Module>> = {
  mn: {
    connectors: mnConnectors,
    faq: mnFaq,
    guides: mnGuides,
    pages: mnPages,
  },
  en: {
    connectors: enConnectors,
    faq: enFaq,
    guides: enGuides,
    pages: enPages,
  },
  zh: {
    connectors: zhConnectors,
    faq: zhFaq,
    guides: zhGuides,
    pages: zhPages,
  },
  ko: {
    connectors: koConnectors,
    faq: koFaq,
    guides: koGuides,
    pages: koPages,
  },
};

/** Every leaf value under `value`, keyed by its path ("home.hero.title",
 *  "guides.GUIDES[2].steps[0].body"). */
function leaves(
  value: unknown,
  at: string,
  out = new Map<string, unknown>(),
): Map<string, unknown> {
  if (Array.isArray(value)) {
    value.forEach((v, i) => leaves(v, `${at}[${i}]`, out));
  } else if (value !== null && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      leaves(v, at ? `${at}.${k}` : k, out);
    }
  } else {
    out.set(at, value);
  }
  return out;
}

function messageLeaves(locale: Locale): Map<string, unknown> {
  const file = path.join(root, "messages", `${locale}.json`);
  return leaves(JSON.parse(readFileSync(file, "utf8")), "");
}

/** The content modules' leaves. Only the exports Mongolian has are the
 *  contract; a translation may keep extra helpers (content/en's
 *  PAYMENTS_IN_MONGOLIA). */
function contentLeaves(locale: Locale): Map<string, unknown> {
  const out = new Map<string, unknown>();
  for (const [file, mn] of Object.entries(CONTENT.mn)) {
    for (const name of Object.keys(mn)) {
      leaves(CONTENT[locale][file]?.[name], `${file}.${name}`, out);
    }
  }
  return out;
}

const SOURCES = {
  messages: messageLeaves,
  content: contentLeaves,
} as const;

const CYRILLIC = /\p{Script=Cyrillic}/u;
const BANNED_CHARS = /[\u00AB\u00BB\u2020]/;

const BRANCHED = new Set(["plural", "select", "selectordinal"]);

/** What the code fills into a message, so a translation must keep exactly
 *  the same: ICU arguments ("{name}"), the branch keys of each
 *  plural/select ("{n,plural:one|other}") and rich-text tags ("<hl>").
 *  Branch text is copy, not arguments; arguments and tags inside a branch
 *  still count. */
function slots(message: string): string[] {
  const s = message;
  const out = new Set<string>();
  let i = 0;
  const skipSpace = () => {
    while (i < s.length && /\s/.test(s[i]!)) i++;
  };
  const word = () => {
    skipSpace();
    const start = i;
    while (i < s.length && !/[\s,{}]/.test(s[i]!)) i++;
    return s.slice(start, i);
  };
  // Message text up to an unmatched "}" or the end.
  const text = (): void => {
    while (i < s.length && s[i] !== "}") {
      const tag = /^<([A-Za-z][\w-]*)>/.exec(s.slice(i));
      if (s[i] === "{") argument();
      else if (tag) {
        out.add(`<${tag[1]}>`);
        i += tag[0].length;
      } else i++;
    }
  };
  // One "{…}" argument, i at its "{".
  const argument = (): void => {
    i++;
    const name = word();
    out.add(`{${name}}`);
    skipSpace();
    if (s[i] === ",") i++;
    const type = word();
    skipSpace();
    if (BRANCHED.has(type) && s[i] === ",") {
      i++;
      const keys: string[] = [];
      for (;;) {
        const key = word();
        skipSpace();
        if (key.startsWith("offset:")) continue;
        if (!key || s[i] !== "{") break;
        i++;
        text();
        i++;
        keys.push(key);
      }
      out.add(`{${name},${type}:${keys.sort().join("|")}}`);
    }
    // Skip to this argument's closing "}" (a number/date style, or the end).
    for (let depth = 1; i < s.length && depth > 0; i++) {
      if (s[i] === "{") depth++;
      else if (s[i] === "}") depth--;
    }
  };
  while (i < s.length) {
    text();
    i++;
  }
  return [...out].sort();
}

/** The one Cyrillic word allowed outside Mongolian: the language picker's
 *  own name for Mongolian. */
const withoutAllowedCyrillic = (s: string) => s.split(LOCALE_NAMES.mn).join("");

const strings = (m: Map<string, unknown>) =>
  [...m].filter((e): e is [string, string] => typeof e[1] === "string");

describe("Mongolian source copy", () => {
  it.each(Object.keys(SOURCES) as (keyof typeof SOURCES)[])(
    "%s: the walker finds the copy",
    (source) => {
      const mn = SOURCES[source]("mn");
      expect(mn.size).toBeGreaterThan(50);
      expect(strings(mn).length).toBe(mn.size);
    },
  );

  it("enables only languages translated from Mongolian, each once", () => {
    for (const l of ENABLED_LOCALES) {
      expect(TRANSLATED_LOCALES as readonly Locale[]).toContain(l);
    }
    expect(new Set(ENABLED_LOCALES).size).toBe(ENABLED_LOCALES.length);
  });
});

describe("slots()", () => {
  it("lists arguments and tags", () => {
    expect(slots("© {year} {company} <hl>a</hl> <link>{email}</link>")).toEqual(
      ["<hl>", "<link>", "{company}", "{email}", "{year}"],
    );
  });

  it("lists branch keys, not branch text, as slots", () => {
    expect(
      slots(
        "{n, plural, =0 {none} one {# item} other {{name} has <b>#</b> items}}",
      ),
    ).toEqual(["<b>", "{n,plural:=0|one|other}", "{name}", "{n}"]);
    expect(
      slots("{kind, select, card {Card} other {Other}} {d, date, short}"),
    ).toEqual(["{d}", "{kind,select:card|other}", "{kind}"]);
  });
});

for (const locale of TRANSLATED_LOCALES) {
  describe.skipIf(!ENABLED_LOCALES.includes(locale))(
    `${locale} translation`,
    () => {
      describe.each(Object.keys(SOURCES) as (keyof typeof SOURCES)[])(
        "%s",
        (source) => {
          const load = () => ({
            mn: SOURCES[source]("mn"),
            tr: SOURCES[source](locale),
          });

          it("has every Mongolian key and no other", () => {
            const { mn, tr } = load();
            expect([...tr.keys()].sort()).toEqual([...mn.keys()].sort());
          });

          // Even where Mongolian is empty: terms.legalNotice is "" in
          // Mongolian (it prevails) and the notice itself everywhere else.
          it("leaves no string empty", () => {
            const { mn, tr } = load();
            // A non-string leaf (a count, a flag) must equal Mongolian's.
            const bad = [...tr].filter(([k, v]) =>
              typeof v === "string" ? v.trim() === "" : v !== mn.get(k),
            );
            expect(bad.map(([k]) => k)).toEqual([]);
          });

          it("holds no Cyrillic (except the picker name Монгол)", () => {
            const hits = strings(load().tr).filter(([, v]) =>
              CYRILLIC.test(withoutAllowedCyrillic(v)),
            );
            expect(hits).toEqual([]);
          });

          it("holds no guillemet or dagger", () => {
            const hits = strings(load().tr).filter(([, v]) =>
              BANNED_CHARS.test(v),
            );
            expect(hits.map(([k]) => k)).toEqual([]);
          });

          it("names no brand but the six connectors (rule #9)", () => {
            const hits = strings(load().tr)
              .map(([k, v]) => [k, brandNames(v)] as const)
              .filter(([, names]) => names.length > 0);
            expect(hits.map(([k]) => k)).toEqual([]);
          });

          it("never shows the register number", () => {
            const hits = strings(load().tr).filter(([, v]) =>
              v.includes(COMPANY.registerNo),
            );
            expect(hits.map(([k]) => k)).toEqual([]);
          });

          if (source === "messages")
            it("keeps every ICU argument and rich-text tag", () => {
              const { mn, tr } = load();
              const drift = strings(mn)
                .filter(([k, v]) => {
                  const t = tr.get(k);
                  return typeof t === "string"
                    ? slots(t).join() !== slots(v).join()
                    : false;
                })
                .map(([k]) => k);
              expect(drift).toEqual([]);
            });
        },
      );
    },
  );
}

// Every TEMP fallback (en, zh and ko showing Mongolian) is gone once all
// three languages are on. Spelled in two halves so this file is not a hit.
const TEMP_MARKER = ["TEMP", "until translations"].join(" ");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? files(full) : [full];
  });
}

describe.skipIf(!TRANSLATED_LOCALES.every((l) => ENABLED_LOCALES.includes(l)))(
  "translation fallbacks",
  () => {
    it("leaves no TEMP marker in messages/, content/, i18n/ or lib/", () => {
      const hits = ["messages", "content", "i18n", "lib"]
        .flatMap((d) => files(path.join(root, d)))
        .filter((f) => readFileSync(f, "utf8").includes(TEMP_MARKER))
        .map((f) => path.relative(root, f));
      expect(hits).toEqual([]);
    });
  },
);

// Mongolian URLs serve Mongolian: a guide answer left in English (as
// /payments-in-mongolia was until B8) is caught here once English is on.
describe.skipIf(!ENABLED_LOCALES.includes("en"))("Mongolian guides", () => {
  it.each(mnGuides.GUIDES.map((g) => [g.slug, g.answer] as const))(
    "%s answers in Mongolian",
    (_slug, answer) => {
      expect(answer).toMatch(CYRILLIC);
    },
  );
});
