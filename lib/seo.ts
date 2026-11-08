import type { Metadata, MetadataRoute } from "next";

// One registry for every public wire.mn page. Page metadata, canonical URLs,
// sitemap.xml and llms.txt all read from here, so a page cannot be listed in
// one place and missing (or titled differently) in another.
//
// `updated` is the date the page's content last changed (YYYY-MM-DD). Bump it
// when you edit the page's copy — search engines stop trusting lastmod that
// moves on every deploy.

export const SITE_URL = "https://wire.mn";
export const SITE_NAME = "WireMN";
export const DOCS_SITE_URL = "https://docs.wire.mn";

export const HOME_TITLE = "Wire — All-in-one Payment Gateway";
export const HOME_DESCRIPTION =
  "Бүх төлбөрөө нэг гарцаар. QPay, PayLink (карт), Toki, MonPay, StorePay, Pocket Zero — QR, карт, цахим хэтэвч, хуваан төлөх нэг холболтоор. Бэлэн линк эсвэл API, орлого нэг dashboard-д. All-in-one payment gateway for Mongolia.";

export interface PublicPage {
  path: string;
  title: string;
  description: string;
  priority: number;
  updated: string;
  /** Page language; Mongolian unless set. */
  lang?: "mn" | "en";
}

export const PUBLIC_PAGES = [
  {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    priority: 1,
    updated: "2026-11-08",
  },
  {
    path: "/features",
    title: "Боломжууд — нэг холболт, олон суваг",
    description:
      "QR, банкны апп, карт, цахим хэтэвч, хуваан төлөх — QPay, PayLink, Toki, MonPay, StorePay, Pocket Zero нэг API-аар. Бодит цагийн мэдэгдэл, тайлан, MNT бүрэн дэмжлэг.",
    priority: 0.9,
    updated: "2026-11-08",
  },
  {
    path: "/developers",
    title: "Хөгжүүлэгчдэд — API · SDK · webhook",
    description:
      "Цэвэр REST API, 6 хэл дээрх SDK + checkout JS/iOS, signature бүхий webhook. 10 минутад эхний төлбөрөө хүлээн ав.",
    priority: 0.9,
    updated: "2026-10-12",
  },
  {
    path: "/links",
    title: "Төлбөрийн линк — секундэд бэлэн",
    description:
      "Dashboard-аас төлбөрийн линк үүсгээд чат, пост, имэйлээр хуваалцаарай. QR код, зурагтай share — хэнд ч хялбар.",
    priority: 0.8,
    updated: "2026-09-09",
  },
  {
    path: "/guide",
    title: "Эхлэх гарын авлага — бүртгэлээс төлбөр хүлээн авах хүртэл",
    description:
      "Wire дээр бүртгүүлж, утас + ДАН баталгаажуулалт хийж, project үүсгээд операторын холболтоо идэвхжүүлэх бүрэн дараалал — 20 алхам, бодит дэлгэцтэй.",
    priority: 0.8,
    updated: "2026-09-09",
  },
  {
    path: "/verification",
    title: "Баталгаажуулалт — утас + ДАН (KYC)",
    description:
      "Wire дээр эзэмшигч бүр утасны дугаараа SMS-ээр, иргэний мэдээллээ төрийн ДАН системээр баталгаажуулдаг. Мэдээлэл шифрлэгдэж хадгалагдана.",
    priority: 0.7,
    updated: "2026-07-30",
  },
  {
    path: "/guides/online-payment",
    title: "Вэб сайтдаа онлайн төлбөр хэрхэн авах вэ",
    description:
      "Вэб сайт, апп-даа QR, банкны апп, карт, цахим хэтэвчийн төлбөрийг нэг холболтоор хүлээн ав — бүртгэлээс эхний төлбөр хүртэлх 5 алхам.",
    priority: 0.8,
    updated: "2026-11-08",
  },
  {
    path: "/guides/payment-link",
    title: "Вэб сайтгүйгээр төлбөр авах — төлбөрийн линк",
    description:
      "Facebook, Instagram, Messenger-ээр зардаг бол төлбөрийн линк үүсгээд хуваалц. Програмист хэрэггүй, нэг линкээр олон төлбөр авна.",
    priority: 0.8,
    updated: "2026-11-08",
  },
  {
    path: "/guides/card-payments",
    title: "Монголд картаар онлайн төлбөр хүлээн авах",
    description:
      "Visa, Mastercard болон дотоодын картаар төлбөр хүлээн ав. Картын connector-ыг dashboard-аас идэвхжүүлж, линк болон checkout дээрээ санал болго.",
    priority: 0.8,
    updated: "2026-11-08",
  },
  {
    path: "/guides/qr-payments",
    title: "QR төлбөрийг дэлгүүр, апп-даа нэвтрүүлэх",
    description:
      "Төлбөр бүрт QR код болон банкны апп-ын deeplink. Монголын төлбөрийн операторуудын QR төлбөрийг нэг холболтоор хүлээн ав.",
    priority: 0.8,
    updated: "2026-11-08",
  },
  {
    path: "/guides/payment-gateway",
    title: "Payment gateway гэж юу вэ — олон оператор, нэг холболт",
    description:
      "Payment gateway хэрхэн ажилладаг, оператор бүртэй тусад нь холбогдохоос юугаараа ялгаатай вэ. Нэг API, нэг dashboard, нэг webhook.",
    priority: 0.8,
    updated: "2026-11-08",
  },
  {
    path: "/guides/platform",
    title: "Платформ, marketplace-д олон мерчантын төлбөр нэг API-аар",
    description:
      "Мерчантуудаа API-аар бүртгүүлж, тэдний өмнөөс төлбөр үүсгэ. Мерчант бүр төлбөрөө өөрийн данс руу шууд авна.",
    priority: 0.7,
    updated: "2026-10-25",
  },
  {
    path: "/en",
    title: "Wire — payment gateway for Mongolia",
    description:
      "Accept bank-app, e-wallet, QR and card payments in Mongolia through one integration: payment links, hosted checkout, REST API and SDKs.",
    priority: 0.8,
    updated: "2026-11-08",
    lang: "en",
  },
  {
    path: "/en/payments-in-mongolia",
    title: "How to accept online payments in Mongolia",
    description:
      "Sign up, verify once, activate an operator and take payments in MNT with hosted checkout, payment links or the Wire REST API.",
    priority: 0.7,
    updated: "2026-11-08",
    lang: "en",
  },
  {
    path: "/terms",
    title: "Үйлчилгээний нөхцөл",
    description:
      "Wire (wire.mn) үйлчилгээний нөхцөл — бүртгэл, баталгаажуулалт (KYC), мэдээллийн хамгаалалт, төлбөрийн мэдээлэл, хэрэглэгчийн үүрэг.",
    priority: 0.4,
    updated: "2026-07-30",
  },
  {
    path: "/status",
    title: "Статус",
    description:
      "Wire-ийн үйлчилгээнүүдийн (API, dashboard, checkout, вэб сайт) одоогийн ажиллагаа.",
    priority: 0.3,
    updated: "2026-07-30",
  },
] as const satisfies readonly PublicPage[];

export type PublicPath = (typeof PUBLIC_PAGES)[number]["path"];

export function publicPage(path: PublicPath): PublicPage {
  const page = PUBLIC_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`unknown public page: ${path}`);
  return page;
}

// The share card from app/opengraph-image.tsx. A page that sets its own
// `openGraph` replaces the root's wholesale, file-based image included, so
// every page names it explicitly.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "wire.mn — All-in-one Payment Gateway",
};

// Pages that are each other's language version. Only the home page has a
// counterpart; the answer pages are written per language, not translated.
const LANGUAGE_PAIRS: Record<string, { mn: string; en: string }> = {
  "/": { mn: "/", en: "/en" },
  "/en": { mn: "/", en: "/en" },
};

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Metadata for a public page: its own canonical URL and share card. Without
 *  this, every page inherited the root layout's canonical (the homepage) and
 *  told search engines it was a duplicate of `/`. */
export function pageMetadata(path: PublicPath): Metadata {
  const page = publicPage(path);
  const url = absoluteUrl(page.path);
  const isHome = page.path === "/";
  const en = page.lang === "en";
  const pair = LANGUAGE_PAIRS[page.path];
  return {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: {
      canonical: url,
      ...(pair
        ? {
            languages: {
              mn: absoluteUrl(pair.mn),
              en: absoluteUrl(pair.en),
              "x-default": absoluteUrl(pair.mn),
            },
          }
        : {}),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: en ? "en_US" : "mn_MN",
      url,
      title: page.title,
      description: page.description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [SHARE_IMAGE.url],
    },
  };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: new Date(`${p.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
