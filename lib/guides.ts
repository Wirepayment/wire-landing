import { CONTACT } from "@/lib/company";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";

// Answer pages: each one answers a single question merchants (or AI answer
// engines on their behalf) actually ask. The copy is the page, the FAQPage
// JSON-LD and the llms.txt entry at once — one source, so they never drift.
//
// Facts only from what wire.mn, docs.wire.mn and the checkout already say in
// public. Connector names (lib/connectors.ts) are allowed on wire.mn since the
// owner's 2026-11-08 decision; competitor brand names are not. No invented
// numbers: the only fee fact is the home FAQ's "1%-иас эхэлнэ".

export interface GuideStep {
  title: string;
  body: string;
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideLink {
  label: string;
  href: string;
}

export interface Guide {
  path: string;
  lang: "mn" | "en";
  /** Footer / breadcrumb label. */
  label: string;
  badge: string;
  line1: string;
  line2: string;
  /** The short, direct answer — the paragraph an AI answer would quote. */
  answer: string;
  stepsTitle: string;
  steps: GuideStep[];
  points?: { title: string; items: string[] };
  faqs: GuideFaq[];
  related: GuideLink[];
  cta: GuideLink;
}

const SIGNUP = { label: "Эхлэх", href: DASHBOARD_URL };

const FEE_ANSWER =
  "Бүртгэл, данс холболт, dashboard үнэ төлбөргүй, сарын төлбөр байхгүй. Шимтгэл зөвхөн амжилттай гүйлгээнээс тооцогдох бөгөөд сонгосон connector-оос хамаарч 1%-иас эхэлнэ. Тодорхой хувь нь холболт идэвхжүүлэх үед тухайн сувгийн нөхцөлд ил харагдана.";

const SETTLEMENT_ANSWER =
  "Орлого таны холбосон банкны данс руу шилжинэ. Хугацаа нь сонгосон connector-ийн нөхцөлөөс хамаарна. Гүйлгээ бүр dashboard-д бодит цагт харагдана.";

const ACCOUNT_STEPS: GuideStep[] = [
  {
    title: "Бүртгүүлж, нэг удаа баталгаажуулна",
    body: "app.wire.mn-д нэвтэрч, эзэмшигчийн утас болон ДАН (төрийн цахим танилт) баталгаажуулалтыг хийнэ. Энэ нь нэг л удаа — дараа нь хэдэн ч бизнес, project нээсэн дахин шаардахгүй.",
  },
  {
    title: "Оператороо идэвхжүүлнэ",
    body: "QPay, PayLink: dashboard-аас оператороо сонгож маягт бөглөнө (бүртгэлийн мэдээлэл, хаяг, орлого хүлээн авах данс). Хяналтаар батлагдсаны дараа цахим гэрээ байгуулмагц холболт идэвхжинэ. Toki, MonPay, StorePay, Pocket Zero: оператортой байгуулсан өөрийн гэрээ, түлхүүрээрээ dashboard-аас холбоно.",
  },
];

export const GUIDES: Guide[] = [
  {
    path: "/guides/online-payment",
    lang: "mn",
    label: "Вэб сайтдаа онлайн төлбөр авах",
    badge: "Гарын авлага",
    line1: "Вэб сайтдаа онлайн",
    line2: "төлбөр хэрхэн авах вэ?",
    answer:
      "Wire-д бүртгүүлж баталгаажуулаад, оператороо идэвхжүүлсний дараа вэб сайтаасаа Wire-ийн төлбөрийн хуудас руу чиглүүлэх эсвэл REST API-аар холбогдоно. Худалдан авагч таны идэвхжүүлсэн сувгаар (QR, банкны апп, карт г.м.) төлж, орлого таны холбосон данс руу орно. Бэлэн төлбөрийн линкээр ч шууд эхэлж болно.",
    stepsTitle: "Эхний төлбөр хүртэлх 5 алхам",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Project үүсгэж API key авна",
        body: "Project бүр өөрийн sk_live нууц түлхүүр, нэг webhook-той. Түлхүүр ганц удаа харагдах тул нууц үгийн менежерт хадгална.",
      },
      {
        title: "Төлбөрийн хуудас руу чиглүүлнэ",
        body: "Сервер талдаа PaymentIntent үүсгээд түүнд checkout session нээж, худалдан авагчийг pay.wire.mn дээрх төлбөрийн хуудас руу илгээнэ. Хуудас QR код, банкны апп-ын deeplink болон таны асаасан бусад сувгийг өөрөө харуулна.",
      },
      {
        title: "Webhook-оор баталгаажуулна",
        body: "Төлбөр амжилттай болмогц таны сервер payment_intent.succeeded event хүлээн авна. Event бүр HMAC-SHA256 гарын үсэгтэй тул жинхэнэ эсэхийг шалгаад захиалгаа баталгаажуулна.",
      },
    ],
    faqs: [
      {
        q: "Вэб сайт маань ямар технологи дээр байх ёстой вэ?",
        a: "Хамаагүй. Wire бол REST API тул ямар ч хэл, framework-оос дуудна. Go, Python, Node.js, PHP, Ruby, .NET дээр бэлэн SDK бий.",
      },
      {
        q: "Програмист байхгүй бол яах вэ?",
        a: "Dashboard-аас төлбөрийн линк үүсгээд вэб сайт, чат, пост дээрээ байрлуулахад хангалттай — хэнд ч хялбар.",
      },
      {
        q: "Төлбөр орсныг яаж мэдэх вэ?",
        a: "Гүйлгээ бүр dashboard-д бодит цагт харагдаж, имэйл мэдэгдэл ирнэ. Сервертэй бол гарын үсэгтэй webhook event-ээр автоматаар мэдэгдэнэ.",
      },
      {
        q: "Төлбөрийн хуудас хэр удаан хүчинтэй вэ?",
        a: "Анхдагч байдлаар төлбөр үүссэнээс хойш 10 минут. Төлөгдөөгүй бол автоматаар цуцлагдана.",
      },
      { q: "Шимтгэл хэд вэ?", a: FEE_ANSWER },
      { q: "Мөнгө хэзээ данс руу орох вэ?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "Quickstart (docs)", href: `${DOCS_URL}/docs/quickstart` },
      {
        label: "Hosted checkout (docs)",
        href: `${DOCS_URL}/docs/guides/hosted-checkout`,
      },
      { label: "Хөгжүүлэгчдэд", href: "/developers" },
      { label: "Бүртгэлийн гарын авлага", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    path: "/guides/payment-link",
    lang: "mn",
    label: "Вэб сайтгүйгээр төлбөр авах",
    badge: "Бэлэн линк",
    line1: "Вэб сайтгүйгээр",
    line2: "төлбөр хэрхэн авах вэ?",
    answer:
      "Wire-ийн dashboard-аас төлбөрийн линк үүсгээд Messenger, Facebook пост, Instagram эсвэл имэйлээр илгээнэ. Худалдан авагч линк дээр дараад QR эсвэл банкны апп-аар төлнө. Вэб сайт, програмист хэрэггүй, нэг линкээр олон төлбөр авч болно.",
    stepsTitle: "Линкээр төлбөр авах алхмууд",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Линк үүсгэнэ",
        body: "Dashboard-ын Төлбөрийн линк хэсэгт гарчиг, гүйлгээний утга, дүнгээ оруулна. Дүн нь тогтсон, эсвэл худалдан авагч өөрөө оруулах нээлттэй байж болно.",
      },
      {
        title: "Хуваалцана",
        body: "Линкээ хуулж чатаар илгээх, QR кодыг хэвлэх эсвэл Facebook, Instagram, LinkedIn-д хуваалцана. Нийгмийн сүлжээнд таны нэр, дүн бүхий зурагтай preview автоматаар харагдана.",
      },
      {
        title: "Төлбөрөө хянана",
        body: "Линк бүрийн төлөлтийн тоо, цуглуулсан нийт дүн dashboard-д бодит цагт харагдана. Линкээ түр унтрааж, дараа нь дахин асааж болно.",
      },
    ],
    faqs: [
      {
        q: "Нэг линкээр олон хүн төлж болох уу?",
        a: "Тийм. Линк дахин ашиглагддаг тул төлөлт бүрд шинэ линк үүсгэх шаардлагагүй.",
      },
      {
        q: "Худалдан авагч дүнгээ өөрөө оруулж болох уу?",
        a: "Тийм. Нээлттэй дүнтэй линк үүсгэвэл худалдан авагч дүнгээ оруулна. Доод дүн тавьж болно (хандив, чөлөөт төлбөр).",
      },
      {
        q: "Худалдан авагчид юу харагдах вэ?",
        a: "Таны тохируулсан гүйлгээний утга (жишээ нь: Захиалга #1024) болон дүн. Гарчиг нь зөвхөн таны dashboard доторх нэр.",
      },
      {
        q: "Линкийг дэлгүүрийн касс дээр ашиглаж болох уу?",
        a: "Тийм. Линкийн QR кодыг хэвлэж байрлуулбал худалдан авагч утсаараа уншуулж төлнө.",
      },
      {
        q: "Линкээр хийсэн төлбөр API-ийнхаас ялгаатай юу?",
        a: "Үгүй. Линкээр хийсэн төлбөр бүр ердийн төлбөр болж бүртгэгдэнэ, нэг тайланд нэгдэж, webhook ч адил илгээгдэнэ.",
      },
      { q: "Шимтгэл хэд вэ?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Төлбөрийн линк", href: "/links" },
      {
        label: "Төлбөрийн линк (docs)",
        href: `${DOCS_URL}/docs/guides/payment-links`,
      },
      { label: "Бүртгэлийн гарын авлага", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    path: "/guides/card-payments",
    lang: "mn",
    label: "Картаар төлбөр авах",
    badge: "Картын төлбөр",
    line1: "Монголд картаар",
    line2: "төлбөр хэрхэн авах вэ?",
    answer:
      "Wire-ийн төлбөрийн хуудас Visa, Mastercard болон дотоодын картаар төлөх сонголттой. PayLink картын connector-ыг dashboard-аасаа идэвхжүүлж project дээрээ асаахад таны төлбөрийн линк болон checkout дээр картаар төлөх сонголт гарч, бусад сувгийн адил нэг dashboard-д тайлагнагдана.",
    stepsTitle: "Картын төлбөр идэвхжүүлэх",
    steps: [
      {
        title: "Бүртгүүлж, нэг удаа баталгаажуулна",
        body: "app.wire.mn-д нэвтэрч эзэмшигчийн утас болон ДАН баталгаажуулалтыг хийнэ.",
      },
      {
        title: "Картын connector-ыг сонгоно",
        body: "Dashboard-ын Холболтууд хэсгээс картын connector-ыг сонгож бүртгэлийн мэдээлэл, хаяг, орлого хүлээн авах дансаа илгээнэ.",
      },
      {
        title: "Хяналт ба цахим гэрээ",
        body: "Хүсэлт батлагдсаны дараа тухайн connector-ийн гэрээг ДАН баталгаажсан мэдээллээрээ цахимаар байгуулна. Гэрээ байгуулмагц холболт идэвхжинэ.",
      },
      {
        title: "Project дээрээ асаана",
        body: "Project бүр ашиглах холболтоо өөрөө асаана. Асаасны дараа тухайн project-ийн линк, checkout, API төлбөрт карт санал болгогдоно.",
      },
    ],
    faqs: [
      {
        q: "Ямар картаар төлж болох вэ?",
        a: "Visa, Mastercard болон дотоодын картаар.",
      },
      {
        q: "Карт болон QR-ыг нэг дор санал болгож болох уу?",
        a: "Тийм. Project дээр асаасан бүх холболт нэг төлбөрийн хуудсанд гарч, худалдан авагч өөрт тохирохыг сонгоно.",
      },
      {
        q: "Картын төлбөрт тусдаа гэрээ хийх үү?",
        a: "Тийм, гэхдээ бүгд dashboard дотор: хүсэлтээ илгээж, батлагдсаны дараа ДАН-аар цахим гэрээ байгуулна. Цаас, оффис руу явах шаардлагагүй.",
      },
      {
        q: "Картын шимтгэл хэд вэ?",
        a: "Шимтгэл зөвхөн амжилттай гүйлгээнээс тооцогдоно. Картын connector-ийн тодорхой хувь нь холболт идэвхжүүлэх үед гэрээний нөхцөлд ил харагдана.",
      },
      { q: "Мөнгө хэзээ данс руу орох вэ?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "Боломжууд", href: "/features" },
      {
        label: "Оператор идэвхжүүлэх (docs)",
        href: `${DOCS_URL}/docs/guides/going-live`,
      },
      { label: "Бүртгэлийн гарын авлага", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    path: "/guides/qr-payments",
    lang: "mn",
    label: "QR төлбөр нэвтрүүлэх",
    badge: "QR төлбөр",
    line1: "QR төлбөрийг",
    line2: "хэрхэн нэвтрүүлэх вэ?",
    answer:
      "Wire-ийн төлбөрийн хуудас төлбөр бүрт QR код болон банкны апп-ын deeplink үүсгэнэ. Компьютер дээр худалдан авагч QR-ыг утсаараа уншуулж, утсан дээр банкны апп-аа шууд нээж төлнө. Нэг холболтоор Монголын төлбөрийн операторуудын QR төлбөрийг хүлээн авна.",
    stepsTitle: "QR төлбөр хүлээн авах алхмууд",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Хэрхэн санал болгохоо сонгоно",
        body: "Хамгийн хялбар нь бэлэн төлбөрийн линк: QR-ыг нь хэвлэх эсвэл илгээнэ. Вэб сайт, апп-тай бол API-аар төлбөр үүсгээд Wire-ийн төлбөрийн хуудас руу чиглүүлнэ.",
      },
      {
        title: "Худалдан авагч уншуулж төлнө",
        body: "Худалдан авагч QR-ыг банкны эсвэл хэтэвчийн апп-аараа уншуулна. Утсан дээр бол deeplink-ээр апп нь шууд нээгдэнэ.",
      },
      {
        title: "Төлбөр орсныг шууд харна",
        body: "Гүйлгээ dashboard-д бодит цагт гарч, имэйл болон webhook-оор мэдэгдэнэ.",
      },
    ],
    faqs: [
      {
        q: "QR-ыг ямар апп-аар уншуулж болох вэ?",
        a: "Таны идэвхжүүлсэн операторын дэмждэг банкны болон цахим хэтэвчийн апп-уудаар.",
      },
      {
        q: "Хэвлэсэн QR касс дээр байрлуулж болох уу?",
        a: "Тийм. Төлбөрийн линкийн QR кодыг хэвлэж болно. Нээлттэй дүнтэй линк бол худалдан авагч дүнгээ өөрөө оруулна.",
      },
      {
        q: "Онлайн захиалгын QR хэр удаан хүчинтэй вэ?",
        a: "API-аар үүсгэсэн төлбөр анхдагч байдлаар 10 минут хүчинтэй. Төлөгдөөгүй бол автоматаар цуцлагдана.",
      },
      {
        q: "Мобайл апп дотроо ашиглаж болох уу?",
        a: "Тийм. Сервер талдаа REST API-аар төлбөр үүсгэнэ. Checkout-ийн JavaScript болон iOS SDK бэлэн.",
      },
      { q: "Шимтгэл хэд вэ?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Төлбөрийн линк", href: "/links" },
      {
        label: "Hosted checkout (docs)",
        href: `${DOCS_URL}/docs/guides/hosted-checkout`,
      },
      { label: "Хөгжүүлэгчдэд", href: "/developers" },
    ],
    cta: SIGNUP,
  },
  {
    path: "/guides/payment-gateway",
    lang: "mn",
    label: "Payment gateway гэж юу вэ",
    badge: "Ойлголт",
    line1: "Payment gateway",
    line2: "гэж юу вэ?",
    answer:
      "Payment gateway бол таны бизнесийг төлбөрийн операторуудтай холбодог давхарга. Оператор бүртэй тусад нь техникийн холболт хийхийн оронд Wire-тэй нэг удаа холбогдоод банкны апп, цахим хэтэвч, QR, карт, хуваан төлөх төлбөрийг нэг API, нэг dashboard-аар хүлээн авна.",
    stepsTitle: "Төлбөр хэрхэн дамждаг вэ",
    steps: [
      {
        title: "Та төлбөр үүсгэнэ",
        body: "Төлбөрийн линк, эсвэл API-аар дүнгээ төгрөгөөр (бутархайгүй) өгч төлбөр үүсгэнэ.",
      },
      {
        title: "Худалдан авагч сувгаа сонгоно",
        body: "Wire-ийн төлбөрийн хуудас таны project дээр асаасан бүх сувгийг нэг дор харуулна.",
      },
      {
        title: "Оператор төлбөрийг гүйцэтгэнэ",
        body: "Сонгосон оператор төлбөрийг боловсруулж, орлого таны холбосон данс руу шилжинэ.",
      },
      {
        title: "Wire статусыг баталгаажуулна",
        body: "Операторын мэдэгдэл, идэвхтэй шалгалт, өдөр тутмын тулгалт гэсэн гурван давхар баталгаагаар төлбөр алдагдахгүй. Үр дүн нь dashboard, имэйл, webhook-оор танд хүрнэ.",
      },
    ],
    points: {
      title: "Оператор бүртэй тусад нь холбогдохтой харьцуулбал",
      items: [
        "Нэг API, нэг SDK — оператор бүрийн өөр өөр холболтыг судлах шаардлагагүй",
        "Нэг dashboard — бүх сувгийн гүйлгээ, тайлан нэг дор",
        "Нэг webhook — бүх сувгийн мэдэгдэл нэг форматтай, гарын үсэгтэй",
        "Шинэ суваг нэмэхэд код өөрчлөхгүй — dashboard-аас асаахад л болно",
      ],
    },
    faqs: [
      {
        q: "Wire ямар төлбөр хүлээн авах вэ?",
        a: "QR код, банкны апп (QPay), карт (PayLink), цахим хэтэвч (Toki, MonPay), хуваан төлөх (StorePay, Pocket Zero) — таны холбосон Монголын төлбөрийн операторуудын сувгууд.",
      },
      {
        q: "Оператор бүртэй гэрээ хийх үү?",
        a: "QPay, PayLink-ийн гэрээг dashboard дотроос ДАН-аар цахимаар байгуулна. Toki, MonPay, StorePay, Pocket Zero-д оператортой байгуулсан өөрийн гэрээгээ ашиглана. Аль ч тохиолдолд техникийн холболт нь ганцхан — Wire.",
      },
      {
        q: "Wire-ийг хэн ажиллуулдаг вэ?",
        a: "Билдрай Эй Ай ХХК.",
      },
      {
        q: "Мэдээлэл аюулгүй юу?",
        a: "Иргэний мэдээлэл AES-256 шифрлэлттэй хадгалагдаж, гуравдагч этгээдэд өгөхгүй. Webhook бүр гарын үсэгтэй тул мэдэгдэл бүрийг баталгаатай шалгаж болно.",
      },
      { q: "Шимтгэл хэд вэ?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Боломжууд", href: "/features" },
      { label: "Хөгжүүлэгчдэд", href: "/developers" },
      { label: "Баталгаажуулалт", href: "/verification" },
    ],
    cta: SIGNUP,
  },
  {
    path: "/guides/platform",
    lang: "mn",
    label: "Платформд олон мерчантын төлбөр",
    badge: "Платформ модуль",
    line1: "Олон мерчантын төлбөрийг",
    line2: "нэг API-аар хэрхэн авах вэ?",
    answer:
      "Олон дэлгүүр, бизнес үйлчилдэг платформ (marketplace, SaaS) Wire-ийн платформ модулиар мерчантуудаа API-аар бүртгүүлж, тэдний өмнөөс төлбөр үүсгэнэ. Мерчант бүр төлбөрөө өөрийн данс руугаа шууд авна — мөнгө платформ дээр ч, Wire дээр ч хуримтлагдахгүй.",
    stepsTitle: "Платформ хэрхэн холбогдох вэ",
    steps: [
      {
        title: "Платформын түлхүүр авна",
        body: "Wire-тэй холбогдож платформоо бүртгүүлнэ. Wire танд платформын нууц түлхүүр олгоно — ганц удаа харагдана.",
      },
      {
        title: "Мерчантаа API-аар бүртгүүлнэ",
        body: "Мерчант бүрийн бүртгэлийн мэдээллийг (хувь хүн эсвэл байгууллага) API-аар илгээнэ. Талбарууд нь dashboard-ын бүртгэлтэй ижил.",
      },
      {
        title: "Wire хянаж баталгаажуулна",
        body: "Хүсэлт бүр Wire-ийн хяналтаар орно. Батлагдсан мерчант өөрийн дансаараа төлбөр хүлээн авах боломжтой болно. Статусыг API-аар хянана.",
      },
      {
        title: "Мерчантын өмнөөс төлбөр үүсгэнэ",
        body: "Нэг түлхүүрээр аль ч мерчантдаа төлбөр үүсгэж, үр дүнг гарын үсэгтэй webhook-оор хүлээн авна.",
      },
    ],
    faqs: [
      {
        q: "Мөнгө хаашаа орох вэ?",
        a: "Мерчант бүрийн өөрийн холбосон данс руу шууд. Платформ болон Wire мерчантын мөнгийг барьдаггүй.",
      },
      {
        q: "Төлбөрийг хувааж, платформын шимтгэл суутгаж болох уу?",
        a: "Үгүй. Төлбөр хуваах, шимтгэл суутгах боломж байхгүй. Платформын нөхцөлийг Wire-тэй тусад нь тохирно.",
      },
      {
        q: "Мерчант Wire-д аль хэдийн бүртгэлтэй бол яах вэ?",
        a: "Wire байгаа бүртгэлтэй нь нэгтгэж болох бөгөөд энэ тохиолдолд таны авсан мерчантын id хэвээр ажиллана.",
      },
      {
        q: "Мерчант бүр баталгаажуулалт хийх үү?",
        a: "Мерчантын бүртгэлийн мэдээллийг API-аар илгээж, Wire хянан батална.",
      },
      {
        q: "Хэрхэн эхлэх вэ?",
        a: `${CONTACT.email} хаягаар платформынхоо тухай бичиж холбогдоно уу.`,
      },
    ],
    related: [
      { label: "Хөгжүүлэгчдэд", href: "/developers" },
      { label: "Payment gateway гэж юу вэ", href: "/guides/payment-gateway" },
    ],
    cta: { label: "Холбогдох", href: `mailto:${CONTACT.email}` },
  },
  {
    path: "/en",
    lang: "en",
    label: "Wire in English",
    badge: "Payment gateway for Mongolia",
    line1: "Every payment,",
    line2: "one gateway.",
    answer:
      "Wire is a payment gateway for businesses in Mongolia. One integration accepts payments through Mongolian payment operators — QR and bank apps (QPay), cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero) — with ready-made payment links or a REST API, and all revenue in one dashboard.",
    stepsTitle: "What you get",
    steps: [
      {
        title: "Payment links",
        body: "Create a link in seconds, share it in chat, social posts or email, or print its QR code. Fixed or buyer-entered amounts, reusable for many payments.",
      },
      {
        title: "Hosted checkout",
        body: "Redirect buyers to a Wire-hosted page that shows a QR code, bank-app deeplinks and every channel you switched on, and cancels unpaid payments automatically.",
      },
      {
        title: "REST API and SDKs",
        body: "PaymentIntent, Charge and Refund resources described by OpenAPI 3.1, with SDKs for Go, Python, Node.js, PHP, Ruby and .NET and idempotency keys for safe retries.",
      },
      {
        title: "Signed webhooks",
        body: "Every payment event is signed with HMAC-SHA256, retried on failure and sent from fixed egress IPs you can allow-list.",
      },
      {
        title: "Platform module",
        body: "Marketplaces and SaaS platforms onboard many merchants through one platform key; each merchant is paid straight into its own bank account.",
      },
      {
        title: "One dashboard",
        body: "Transactions, invoices and refunds from every channel in one place, in Mongolian tögrög, with CSV and PDF export.",
      },
    ],
    faqs: [
      {
        q: "Is there a sign-up or monthly fee?",
        a: "No. Sign-up, connecting accounts and the dashboard are free. A fee applies only to successful transactions, starting from 1% depending on the connector.",
      },
      {
        q: "How do I start?",
        a: "Sign up at app.wire.mn, verify the owner once with phone and DAN (Mongolia's national e-ID), connect a payout bank account and activate an operator. Then use payment links or the API.",
      },
      {
        q: "Do I need a developer?",
        a: "No. Payment links work from the dashboard alone. The API and SDKs are there when you want to integrate checkout into a website or app.",
      },
      {
        q: "Is my data safe?",
        a: "Personal data is stored encrypted with AES-256 and not shared with third parties. Every webhook carries a signature so you can verify each notification.",
      },
    ],
    related: [
      {
        label: "How to accept payments in Mongolia",
        href: "/en/payments-in-mongolia",
      },
      { label: "Developer docs (English)", href: `${DOCS_URL}/en/docs` },
      { label: "Wire (Монгол)", href: "/" },
    ],
    cta: { label: "Get started", href: DASHBOARD_URL },
  },
  {
    path: "/en/payments-in-mongolia",
    lang: "en",
    label: "Accept payments in Mongolia",
    badge: "Guide",
    line1: "How to accept online",
    line2: "payments in Mongolia",
    answer:
      "Wire is a payment gateway for Mongolia. A business or individual seller in Mongolia signs up at app.wire.mn, verifies the owner once (phone and DAN, the national e-ID), activates the payment operators it wants, and then takes payments through hosted checkout, payment links or a REST API. Buyers pay with bank apps, e-wallets, QR, cards or buy-now-pay-later, and the money goes to the business's own account.",
    stepsTitle: "From sign-up to the first payment",
    steps: [
      {
        title: "Sign up and verify once",
        body: "Sign in at app.wire.mn and verify the owner's phone and DAN identity. It is done once, however many businesses or projects you open later.",
      },
      {
        title: "Activate an operator",
        body: "For QPay or PayLink, submit your business details and payout bank account in the dashboard; after review you sign the agreement electronically and the connection goes live. For Toki, MonPay, StorePay or Pocket Zero, enter the keys from your own contract with the operator.",
      },
      {
        title: "Create a project and API key",
        body: "Each project has its own sk_live secret key and one webhook endpoint. The key is shown once — store it in a password manager.",
      },
      {
        title: "Send buyers to checkout",
        body: "Create a PaymentIntent on your server, open a checkout session and redirect the buyer to the hosted page on pay.wire.mn, which shows the QR code, bank-app deeplinks and every channel you switched on.",
      },
      {
        title: "Confirm with a webhook",
        body: "Your server receives payment_intent.succeeded, signed with HMAC-SHA256. Verify the signature, then fulfil the order.",
      },
    ],
    faqs: [
      {
        q: "Which payment methods can buyers use?",
        a: "QR and bank apps (QPay), cards — Visa, Mastercard and domestic cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero). QPay and PayLink are connected through Wire; the others with your own operator contract and keys, entered in the dashboard.",
      },
      {
        q: "What currency are amounts in?",
        a: "Mongolian tögrög (MNT), as whole numbers — MNT has no minor unit.",
      },
      {
        q: "Which languages have SDKs?",
        a: "Go, Python, Node.js, PHP, Ruby and .NET on the server, plus checkout SDKs for JavaScript and iOS. The API is described by an OpenAPI 3.1 spec.",
      },
      {
        q: "What does it cost?",
        a: "Sign-up, connecting accounts and the dashboard are free and there is no monthly fee. A fee applies only to successful transactions, starting from 1% depending on the connector; the exact rate is shown when you activate it.",
      },
      {
        q: "Can I take payments without a website?",
        a: "Yes. Create a payment link in the dashboard and share it in chat, social posts or email, or print its QR code.",
      },
      {
        q: "Who operates Wire?",
        a: "Buildry AI LLC (Билдрай Эй Ай ХХК).",
      },
    ],
    related: [
      { label: "Wire in English", href: "/en" },
      { label: "Developer docs (English)", href: `${DOCS_URL}/en/docs` },
      { label: "Quickstart", href: `${DOCS_URL}/en/docs/quickstart` },
    ],
    cta: { label: "Get started", href: DASHBOARD_URL },
  },
];

export function guide(path: string): Guide {
  const g = GUIDES.find((x) => x.path === path);
  if (!g) throw new Error(`unknown guide: ${path}`);
  return g;
}
