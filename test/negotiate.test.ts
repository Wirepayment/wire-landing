import { describe, it, expect } from "vitest";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  LOCALE_NAMES,
  isLocale,
} from "@/i18n/locales";
import { isBot, landingRedirect, localeFromCountry } from "@/i18n/negotiate";
import { ALLOWED_CRAWLERS } from "@/lib/crawlers";

const BROWSER =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";

type Req = Parameters<typeof landingRedirect>[0];

function req(over: Partial<Req>): Req {
  return {
    method: "GET",
    pathname: "/",
    search: "",
    cookie: undefined,
    country: null,
    userAgent: BROWSER,
    ...over,
  };
}

describe("locales", () => {
  it("lists mn, en, zh, ko with mn as the default", () => {
    expect(LOCALES).toEqual(["mn", "en", "zh", "ko"]);
    expect(DEFAULT_LOCALE).toBe("mn");
  });

  it("maps each locale to its html lang", () => {
    expect(HTML_LANG).toEqual({ mn: "mn", en: "en", zh: "zh-Hans", ko: "ko" });
  });

  it("names each language in its own script", () => {
    expect(LOCALE_NAMES).toEqual({
      mn: "Монгол",
      en: "English",
      zh: "中文",
      ko: "한국어",
    });
  });

  it("recognises only the four locales", () => {
    for (const l of LOCALES) expect(isLocale(l)).toBe(true);
    for (const x of ["", "EN", "fr", "zh-Hans", undefined, null, 1, {}]) {
      expect(isLocale(x)).toBe(false);
    }
  });
});

describe("localeFromCountry", () => {
  it.each([
    ["MN", "mn"],
    ["CN", "zh"],
    ["TW", "zh"],
    ["HK", "zh"],
    ["mo", "zh"],
    ["KR", "ko"],
    ["kr", "ko"],
    ["ZZ", "en"],
    ["US", "en"],
    ["", "mn"],
    ["  ", "mn"],
    [null, "mn"],
    [undefined, "mn"],
  ] as const)("%j → %s", (country, want) => {
    expect(localeFromCountry(country)).toBe(want);
  });
});

describe("isBot", () => {
  it("treats every allowed crawler as a bot", () => {
    for (const name of ALLOWED_CRAWLERS) {
      expect(isBot(`Mozilla/5.0 (compatible; ${name}/1.0)`)).toBe(true);
    }
  });

  it.each([
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
    "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)",
    "Mozilla/5.0 (compatible; Daum/4.1; +http://cs.daum.net/faq/15/4118.html)",
    "facebookexternalhit/1.1",
    "Mozilla/5.0 (compatible; Yahoo! Slurp)",
    "some-crawler/0.1",
  ])("%s is a bot", (ua) => {
    expect(isBot(ua)).toBe(true);
  });

  it("does not treat browsers or a missing UA as bots", () => {
    expect(isBot(BROWSER)).toBe(false);
    expect(isBot(null)).toBe(false);
    expect(isBot("")).toBe(false);
  });
});

describe("landingRedirect", () => {
  it.each<[string, Partial<Req>, string | null]>([
    [
      "GET /features, US",
      { pathname: "/features", country: "US" },
      "/en/features",
    ],
    ["GET /, CN", { country: "CN" }, "/zh"],
    ["GET /, KR", { country: "KR" }, "/ko"],
    ["GET /, MN", { country: "MN" }, null],
    ["GET /, empty country", { country: "" }, null],
    ["GET /, no country header", { country: null }, null],
    ["GET /, ZZ", { country: "ZZ" }, "/en"],
    [
      "deep link keeps the query",
      {
        pathname: "/guides/qr-payments",
        search: "?utm_source=fb",
        country: "US",
      },
      "/en/guides/qr-payments?utm_source=fb",
    ],
    [
      "prefixed /en/features, CN",
      { pathname: "/en/features", country: "CN" },
      null,
    ],
    ["prefixed /zh, MN", { pathname: "/zh", country: "MN" }, null],
    ["prefixed /ko/, US", { pathname: "/ko/", country: "US" }, null],
    [
      "prefixed /mn/features, US",
      { pathname: "/mn/features", country: "US" },
      null,
    ],
    [
      "segment that only starts like a locale is not a prefix",
      { pathname: "/english", country: "US" },
      "/en/english",
    ],
    // Ruling 23: a saved choice wins over the URL's (unprefixed = Mongolian)
    // language; a saved Mongolian choice wins over the IP.
    ["cookie mn beats country US", { cookie: "mn", country: "US" }, null],
    ["cookie mn, no country", { cookie: "mn" }, null],
    ["cookie ko, GET /", { cookie: "ko" }, "/ko"],
    ["cookie ko beats country US", { cookie: "ko", country: "US" }, "/ko"],
    [
      "cookie en beats country MN",
      { cookie: "en", country: "MN", pathname: "/features" },
      "/en/features",
    ],
    [
      "cookie zh keeps the query",
      { cookie: "zh", pathname: "/links", search: "?a=1" },
      "/zh/links?a=1",
    ],
    [
      "cookie zh, bot",
      { cookie: "zh", userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1)" },
      null,
    ],
    [
      "cookie en, prefixed /zh/features",
      { cookie: "en", pathname: "/zh/features" },
      null,
    ],
    ["cookie en, POST /", { cookie: "en", method: "POST" }, null],
    [
      "cookie en, HEAD /",
      { cookie: "en", method: "HEAD", country: "MN" },
      "/en",
    ],
    ["garbage cookie counts as absent", { cookie: "xx", country: "US" }, "/en"],
    ["empty cookie counts as absent", { cookie: "", country: "CN" }, "/zh"],
    ["garbage cookie, country MN", { cookie: "EN", country: "MN" }, null],
    [
      "Googlebot from US",
      {
        country: "US",
        userAgent:
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      null,
    ],
    ["Baiduspider from CN", { country: "CN", userAgent: "Baiduspider" }, null],
    ["POST /, US", { method: "POST", country: "US" }, null],
    [
      "HEAD /features, US",
      { method: "HEAD", pathname: "/features", country: "US" },
      "/en/features",
    ],
  ])("%s", (_name, over, want) => {
    expect(landingRedirect(req(over))).toBe(want);
  });
});
