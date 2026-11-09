import type { PageCopy, PublicPath, SiteCopy } from "@/lib/seo";

// Simplified Chinese title and description of every public page, translated
// from content/mn/pages.ts (the source).
export const PAGES: Record<PublicPath, PageCopy> = {
  "/": {
    title: "Wire——一站式支付网关",
    description:
      "所有支付，尽在一个网关。QPay、PayLink（银行卡）、Toki、MonPay、StorePay、Pocket Zero——二维码、银行卡、电子钱包、分期付款，一个连接全部接入。现成链接或 API，收入尽在一个管理后台。蒙古国一站式支付网关。",
  },
  "/features": {
    title: "功能——一个连接，多种渠道",
    description:
      "二维码、银行 App、银行卡、电子钱包、分期付款——QPay、PayLink、Toki、MonPay、StorePay、Pocket Zero 通过一个 API 接入。实时通知、报表、全面支持蒙古图格里克（MNT）。",
  },
  "/developers": {
    title: "开发者——API · SDK · Webhook",
    description:
      "简洁的 REST API、6 种语言的 SDK + checkout JS/iOS、带签名的 Webhook。10 分钟完成首笔收款。",
  },
  "/links": {
    title: "支付链接——秒级生成",
    description:
      "在管理后台中创建支付链接，并通过聊天、社交媒体帖子或电子邮件分享。支持二维码和带图片预览的分享——人人都能轻松上手。",
  },
  "/guide": {
    title: "入门指南——从注册到开始收款",
    description:
      "在 Wire 上注册、完成手机 + DAN（蒙古国政府电子身份认证）验证、创建项目并启用运营商连接的完整流程——20 个步骤，附真实界面截图。",
  },
  "/verification": {
    title: "身份验证——手机 + DAN（KYC）",
    description:
      "在 Wire 上，每位所有者都通过短信验证手机号码，并通过蒙古国政府 DAN 电子身份认证系统验证个人身份信息。信息均加密存储。",
  },
  "/guides/online-payment": {
    title: "如何在网站上接受在线支付",
    description:
      "在您的网站或 App 中，通过一个连接接受二维码、银行 App、银行卡和电子钱包付款——从注册到首笔收款只需 5 步。",
  },
  "/guides/payment-link": {
    title: "没有网站也能收款——支付链接",
    description:
      "如果您在 Facebook、Instagram、Messenger 上销售，只需创建支付链接并分享。无需程序员，一个链接即可多次收款。",
  },
  "/guides/card-payments": {
    title: "在蒙古国接受在线银行卡支付",
    description:
      "接受 Visa、Mastercard 及本地银行卡付款。在管理后台中启用银行卡支付渠道，即可在您的链接和收银台中提供银行卡支付。",
  },
  "/guides/qr-payments": {
    title: "为您的店铺或 App 接入二维码支付",
    description:
      "每笔付款都提供二维码和银行 App 深度链接。通过一个连接，接受蒙古国各支付运营商的二维码支付。",
  },
  "/guides/payment-gateway": {
    title: "什么是支付网关——多家运营商，一个连接",
    description:
      "支付网关如何运作，与分别对接每家运营商有何不同。一个 API、一个管理后台、一个 Webhook。",
  },
  "/guides/platform": {
    title: "平台与电商市场：通过一个 API 为多个商户收款",
    description:
      "通过 API 注册您的商户，并代其创建付款。每个商户的款项都直接进入其自有账户。",
  },
  "/payments-in-mongolia": {
    title: "如何在蒙古国接受在线支付",
    description:
      "注册并完成一次验证，然后启用运营商。通过支付页面、支付链接或 Wire REST API，以蒙古图格里克（MNT）收款。",
  },
  "/terms": {
    title: "服务条款",
    description:
      "Wire（wire.mn）服务条款——账户、身份验证（KYC）、信息保护、支付信息与用户义务。",
  },
  "/status": {
    title: "状态",
    description: "Wire 各项服务（API、管理后台、收银台、网站）的当前运行状态。",
  },
};

export const SITE: SiteCopy = {
  /** Site-wide <meta name="keywords">. */
  keywords: [
    "WireMN",
    "Wire",
    "wire.mn",
    "支付网关",
    "蒙古国支付",
    "电子钱包",
    "BNPL",
    "支付 API",
    "商户",
    "Buildry",
  ],
  /** The one-paragraph summary at the top of this language's llms.txt part. */
  summary:
    "Wire 是为蒙古国企业打造的支付网关：通过一个连接，经由蒙古国各支付运营商接受二维码、银行 App、银行卡、电子钱包、分期付款等付款。提供现成的支付链接或 REST API，所有收入尽在一个管理后台。",
  /** The home page's name in breadcrumbs (JSON-LD). */
  homeCrumb: "首页",
};
