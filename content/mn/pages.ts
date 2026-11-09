import type { PageCopy, PublicPath, SiteCopy } from "@/lib/seo";

// Mongolian title and description of every public page (the source). Page
// metadata, sitemap.xml and llms.txt read them through lib/seo.ts.
export const PAGES: Record<PublicPath, PageCopy> = {
  "/": {
    title: "Wire — All-in-one Payment Gateway",
    description:
      "Бүх төлбөрөө нэг гарцаар. QPay, PayLink (карт), Toki, MonPay, StorePay, Pocket Zero — QR, карт, цахим хэтэвч, хуваан төлөх нэг холболтоор. Бэлэн линк эсвэл API, орлого нэг dashboard-д. All-in-one payment gateway for Mongolia.",
  },
  "/features": {
    title: "Боломжууд — нэг холболт, олон суваг",
    description:
      "QR, банкны апп, карт, цахим хэтэвч, хуваан төлөх — QPay, PayLink, Toki, MonPay, StorePay, Pocket Zero нэг API-аар. Бодит цагийн мэдэгдэл, тайлан, MNT бүрэн дэмжлэг.",
  },
  "/developers": {
    title: "Хөгжүүлэгчдэд — API · SDK · webhook",
    description:
      "Цэвэр REST API, 6 хэл дээрх SDK + checkout JS/iOS, signature бүхий webhook. 10 минутад эхний төлбөрөө хүлээн ав.",
  },
  "/links": {
    title: "Төлбөрийн линк — секундэд бэлэн",
    description:
      "Dashboard-аас төлбөрийн линк үүсгээд чат, пост, имэйлээр хуваалцаарай. QR код, зурагтай share — хэнд ч хялбар.",
  },
  "/guide": {
    title: "Эхлэх гарын авлага — бүртгэлээс төлбөр хүлээн авах хүртэл",
    description:
      "Wire дээр бүртгүүлж, утас + ДАН баталгаажуулалт хийж, project үүсгээд операторын холболтоо идэвхжүүлэх бүрэн дараалал — 20 алхам, бодит дэлгэцтэй.",
  },
  "/verification": {
    title: "Баталгаажуулалт — утас + ДАН (KYC)",
    description:
      "Wire дээр эзэмшигч бүр утасны дугаараа SMS-ээр, иргэний мэдээллээ төрийн ДАН системээр баталгаажуулдаг. Мэдээлэл шифрлэгдэж хадгалагдана.",
  },
  "/guides/online-payment": {
    title: "Вэб сайтдаа онлайн төлбөр хэрхэн авах вэ",
    description:
      "Вэб сайт, апп-даа QR, банкны апп, карт, цахим хэтэвчийн төлбөрийг нэг холболтоор хүлээн ав — бүртгэлээс эхний төлбөр хүртэлх 5 алхам.",
  },
  "/guides/payment-link": {
    title: "Вэб сайтгүйгээр төлбөр авах — төлбөрийн линк",
    description:
      "Facebook, Instagram, Messenger-ээр зардаг бол төлбөрийн линк үүсгээд хуваалц. Програмист хэрэггүй, нэг линкээр олон төлбөр авна.",
  },
  "/guides/card-payments": {
    title: "Монголд картаар онлайн төлбөр хүлээн авах",
    description:
      "Visa, Mastercard болон дотоодын картаар төлбөр хүлээн ав. Картын connector-ыг dashboard-аас идэвхжүүлж, линк болон checkout дээрээ санал болго.",
  },
  "/guides/qr-payments": {
    title: "QR төлбөрийг дэлгүүр, апп-даа нэвтрүүлэх",
    description:
      "Төлбөр бүрт QR код болон банкны апп-ын deeplink. Монголын төлбөрийн операторуудын QR төлбөрийг нэг холболтоор хүлээн ав.",
  },
  "/guides/payment-gateway": {
    title: "Payment gateway гэж юу вэ — олон оператор, нэг холболт",
    description:
      "Payment gateway хэрхэн ажилладаг, оператор бүртэй тусад нь холбогдохоос юугаараа ялгаатай вэ. Нэг API, нэг dashboard, нэг webhook.",
  },
  "/guides/platform": {
    title: "Платформ, marketplace-д олон мерчантын төлбөр нэг API-аар",
    description:
      "Мерчантуудаа API-аар бүртгүүлж, тэдний өмнөөс төлбөр үүсгэ. Мерчант бүр төлбөрөө өөрийн данс руу шууд авна.",
  },
  // TEMP until translations (B8 writes the Mongolian version): English copy
  // of content/en/pages.ts.
  "/payments-in-mongolia": {
    title: "How to accept online payments in Mongolia",
    description:
      "Sign up, verify once, activate an operator and take payments in MNT with hosted checkout, payment links or the Wire REST API.",
  },
  "/terms": {
    title: "Үйлчилгээний нөхцөл",
    description:
      "Wire (wire.mn) үйлчилгээний нөхцөл — бүртгэл, баталгаажуулалт (KYC), мэдээллийн хамгаалалт, төлбөрийн мэдээлэл, хэрэглэгчийн үүрэг.",
  },
  "/status": {
    title: "Статус",
    description:
      "Wire-ийн үйлчилгээнүүдийн (API, dashboard, checkout, вэб сайт) одоогийн ажиллагаа.",
  },
};

export const SITE: SiteCopy = {
  /** Site-wide <meta name="keywords">. */
  keywords: [
    "WireMN",
    "Wire",
    "wire.mn",
    "payment gateway",
    "Монгол төлбөр",
    "цахим хэтэвч",
    "BNPL",
    "payment API",
    "merchant",
    "Buildry",
  ],
  /** The one-paragraph summary at the top of this language's llms.txt part. */
  summary:
    "Wire бол Монголын бизнесүүдэд зориулсан төлбөрийн гарц (payment gateway): QR код, банкны апп, карт, цахим хэтэвч, хуваан төлөх зэрэг Монголын төлбөрийн операторуудаар нэг холболтоор төлбөр хүлээн авна. Бэлэн төлбөрийн линк эсвэл REST API, орлого нэг dashboard-д.",
  /** The home page's name in breadcrumbs (JSON-LD). */
  homeCrumb: "Нүүр",
};
