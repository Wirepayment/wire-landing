import type {
  ConnectorCopy,
  ConnectorId,
  ConnectorMode,
  ConnectorModeCopy,
} from "@/lib/connectors";

// Simplified Chinese connector copy, translated from content/mn/connectors.ts
// (the source). Brand names stay in lib/connectors.ts and are never
// translated.
export const CONNECTOR_COPY: Record<ConnectorId, ConnectorCopy> = {
  qpay: {
    category: "二维码 · 银行 App",
    desc: "买家用银行 App 扫描二维码付款；在手机上则可直接打开银行 App 付款。",
  },
  paylink: {
    category: "银行卡支付",
    desc: "支持使用 Visa、Mastercard 及本地银行卡付款。",
  },
  storepay: {
    category: "分期付款 · 信贷",
    desc: "买家可将大额购物分期支付。",
  },
  toki: {
    category: "电子钱包",
    desc: "买家扫描二维码，或按买家的手机号码向 Toki App 发送付款请求。",
  },
  monpay: {
    category: "电子钱包",
    desc: "通过二维码或深度链接（deeplink）在 MonPay App 中付款。",
  },
  pocket: {
    category: "分期付款",
    desc: "买家在 Pocket App 中扫描二维码，分期付款。",
  },
};

export const CONNECTOR_MODES: Record<ConnectorMode, ConnectorModeCopy> = {
  wire: {
    label: "通过 Wire",
    short: "通过 Wire",
    hint: "提交您的企业信息，并在线签署 Wire 的电子协议。审核批准后，连接即会启用。",
  },
  byo: {
    label: "使用自有协议（BYO）",
    short: "BYO",
    hint: "使用您与支付运营商签订的自有协议和密钥，在管理后台中完成连接。款项直接进入您在运营商处的账户，Wire 不经手资金。",
  },
};
