// The payment connectors live in production and open to every merchant. One
// source for the home grid, the features page, the FAQ and llms.txt, so the
// list cannot drift between them.
//
// Owner decision 2026-11-08: wire.mn names its connectors and shows their
// logos (an exception to the operator-agnostic rule, for this site only).
// Competitor brands stay forbidden — test/brand-names.ts.
//
// Facts only: no fees, settlement times or limits that the operator has not
// published through Wire.

/** How a merchant connects: through Wire (business details, Wire's agreement,
 *  review) or with its own operator contract and keys (BYO). */
export type ConnectorMode = "wire" | "byo";

/** The payment-method group a connector belongs to on the features page. */
export type ConnectorGroup = "qr" | "card" | "wallet" | "installment";

export interface Connector {
  id: string;
  name: string;
  group: ConnectorGroup;
  category: string;
  desc: string;
  mode: ConnectorMode;
}

export const CONNECTORS: readonly Connector[] = [
  {
    id: "qpay",
    name: "QPay",
    group: "qr",
    category: "QR код · банкны апп",
    desc: "Худалдан авагч QR кодыг банкны аппаараа уншуулж, утсан дээр бол банкны аппаа шууд нээж төлнө.",
    mode: "wire",
  },
  {
    id: "paylink",
    name: "PayLink",
    group: "card",
    category: "Картын төлбөр",
    desc: "Visa, Mastercard болон дотоодын картаар төлөх сонголт.",
    mode: "wire",
  },
  {
    id: "storepay",
    name: "StorePay",
    group: "installment",
    category: "Хуваан төлөх · зээл",
    desc: "Их дүнтэй худалдан авалтыг худалдан авагч хувааж төлнө.",
    mode: "byo",
  },
  {
    id: "toki",
    name: "Toki",
    group: "wallet",
    category: "Цахим хэтэвч",
    desc: "QR уншуулж, эсвэл худалдан авагчийн утасны дугаараар Toki апп руу төлбөрийн хүсэлт илгээнэ.",
    mode: "byo",
  },
  {
    id: "monpay",
    name: "MonPay",
    group: "wallet",
    category: "Цахим хэтэвч",
    desc: "QR код эсвэл deeplink-ээр MonPay аппаар төлнө.",
    mode: "byo",
  },
  {
    id: "pocket",
    name: "Pocket Zero",
    group: "installment",
    category: "Хуваан төлөх",
    desc: "Худалдан авагч Pocket аппаараа QR уншуулж хувааж төлнө.",
    mode: "byo",
  },
];

export const CONNECTOR_MODES: Record<
  ConnectorMode,
  { label: string; short: string; hint: string }
> = {
  wire: {
    label: "Wire-ээр",
    short: "Wire-ээр",
    hint: "Бизнесийн мэдээллээ илгээж, Wire-ийн гэрээг цахимаар байгуулна. Хяналтаар батлагдсаны дараа холболт идэвхжинэ.",
  },
  byo: {
    label: "Өөрийн гэрээгээр (BYO)",
    short: "BYO",
    hint: "Оператортой байгуулсан өөрийн гэрээ, түлхүүрээрээ dashboard-аас холбоно. Мөнгө таны операторын данс руу шууд орж, Wire мөнгө барихгүй.",
  },
};

/** Path of a connector's logo under public/. */
export const connectorLogo = (id: string) => `/operators/${id}.png`;
