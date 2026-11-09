import type {
  ConnectorCopy,
  ConnectorId,
  ConnectorMode,
  ConnectorModeCopy,
} from "@/lib/connectors";

// Korean connector copy, translated from content/mn/connectors.ts (the
// source). Brand names stay in lib/connectors.ts and are never translated.
export const CONNECTOR_COPY: Record<ConnectorId, ConnectorCopy> = {
  qpay: {
    category: "QR 코드 · 은행 앱",
    desc: "구매자는 은행 앱으로 QR 코드를 스캔하거나, 휴대폰에서 은행 앱을 바로 열어 결제합니다.",
  },
  paylink: {
    category: "카드 결제",
    desc: "Visa, Mastercard 및 국내 카드로 결제합니다.",
  },
  storepay: {
    category: "분할 결제 · 신용",
    desc: "구매자는 고액 구매를 분할하여 결제합니다.",
  },
  toki: {
    category: "전자지갑",
    desc: "구매자가 QR 코드를 스캔하거나, 구매자의 휴대폰 번호로 Toki 앱에 결제 요청이 전송됩니다.",
  },
  monpay: {
    category: "전자지갑",
    desc: "MonPay 앱에서 QR 코드 또는 딥링크로 결제합니다.",
  },
  pocket: {
    category: "분할 결제",
    desc: "구매자는 Pocket 앱에서 QR 코드를 스캔하여 분할 결제합니다.",
  },
};

export const CONNECTOR_MODES: Record<ConnectorMode, ConnectorModeCopy> = {
  wire: {
    label: "Wire를 통한 연결",
    short: "Wire 경유",
    hint: "사업자 정보를 제출하고 Wire 계약에 전자 서명합니다. 심사에서 승인되면 연결이 활성화됩니다.",
  },
  byo: {
    label: "자체 계약(BYO)",
    short: "BYO",
    hint: "결제 사업자와 직접 맺은 계약과 키로 대시보드에서 연결합니다. 대금은 결제 사업자에 개설된 귀사 계정으로 바로 입금되며, Wire는 자금을 보관하지 않습니다.",
  },
};
