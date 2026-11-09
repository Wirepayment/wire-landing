import type {
  ConnectorCopy,
  ConnectorId,
  ConnectorMode,
  ConnectorModeCopy,
} from "@/lib/connectors";

// Mongolian connector copy (the source): what each connector is and how a
// merchant connects it. Names and logos stay in lib/connectors.ts — brand
// names are never translated. Facts only: no fees, settlement times or limits
// that the operator has not published through Wire.
export const CONNECTOR_COPY: Record<ConnectorId, ConnectorCopy> = {
  qpay: {
    category: "QR код · банкны апп",
    desc: "Худалдан авагч QR кодыг банкны аппаараа уншуулж, утсан дээр бол банкны аппаа шууд нээж төлнө.",
  },
  paylink: {
    category: "Картын төлбөр",
    desc: "Visa, Mastercard болон дотоодын картаар төлөх сонголт.",
  },
  storepay: {
    category: "Хуваан төлөх · зээл",
    desc: "Их дүнтэй худалдан авалтыг худалдан авагч хувааж төлнө.",
  },
  toki: {
    category: "Цахим хэтэвч",
    desc: "QR уншуулж, эсвэл худалдан авагчийн утасны дугаараар Toki апп руу төлбөрийн хүсэлт илгээнэ.",
  },
  monpay: {
    category: "Цахим хэтэвч",
    desc: "QR код эсвэл deeplink-ээр MonPay аппаар төлнө.",
  },
  pocket: {
    category: "Хуваан төлөх",
    desc: "Худалдан авагч Pocket аппаараа QR уншуулж хувааж төлнө.",
  },
};

export const CONNECTOR_MODES: Record<ConnectorMode, ConnectorModeCopy> = {
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
