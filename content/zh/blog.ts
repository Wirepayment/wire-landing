import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// Chinese blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
  "change-payment-method": {
    title: "付款人现在可以更换支付渠道",
    description:
      "Wire 支付页面现在为每个渠道显示分步说明，并且在账单已经生成之后，付款人仍可以改用其他渠道付款。",
    lead: "在 Wire 支付页面上，买家选了一个渠道却无法完成付款时，现在可以返回渠道列表并选择另一个渠道继续付款，不必重新下单。商户无需修改任何接入。",
    sections: [
      {
        heading: "有哪些变化",
        body: [
          "支付页面把渠道分成三组显示：银行应用和银行卡、电子钱包、分期付款。选定之后，买家会看到针对该渠道编写的编号步骤，以及打开对应应用的按钮。",
          "付款界面新增了改用其他渠道付款的按钮。点击后回到渠道选择，选择另一个渠道会生成新的账单。",
        ],
      },
      {
        heading: "为什么需要",
        body: [
          "买家的银行应用可能打不开，钱包余额可能不足，分期额度也可能未获批准。以前遇到这种情况，只能关闭支付页面并重新下单。现在可以在同一页面上改用其他渠道继续付款。",
        ],
      },
      {
        heading: "对商户有什么影响",
        body: [
          "接入方式没有任何变化。所有使用支付链接或 Wire 支付页面的商户都会立即生效。",
        ],
        items: [
          "付款成功时发送的 webhook 和支付状态保持不变。",
          "控制台的交易列表显示资金实际进入的渠道。",
          "如果同一订单的两张账单都被支付，Wire 会发现并记录，多付的款项可以退回。",
        ],
      },
    ],
    links: [
      { label: "支付链接", href: "/links" },
      { label: "功能", href: "/features" },
    ],
  },
  "six-channels-one-integration": {
    title: "一次接入，六个支付渠道",
    description:
      "QPay、PayLink、Toki、MonPay、StorePay 和 Pocket Zero：哪些通过 Wire 开通，哪些用自己的协议连接，资金进入哪里。",
    lead: "Wire 上现在有六个支付渠道在运行：QPay、PayLink、Toki、MonPay、StorePay 和 Pocket Zero。商户只需接入一次，然后在控制台选择启用哪些渠道。",
    sections: [
      {
        heading: "六个渠道，四种类型",
        body: ["买家在支付页面上从您启用的渠道中选择适合自己的一个。"],
        items: [
          "QPay：二维码和银行应用。",
          "PayLink：Visa、Mastercard 和本地银行卡。",
          "Toki、MonPay：电子钱包。",
          "StorePay、Pocket Zero：分期付款。",
        ],
      },
      {
        heading: "两种连接方式",
        body: [
          "QPay 和 PayLink 通过 Wire 开通：提交企业信息，在线签署协议，审核通过后渠道即被激活。",
          "Toki、MonPay、StorePay 和 Pocket Zero 使用您与服务商签订的协议和密钥，在控制台中连接。资金直接进入您在服务商的账户，Wire 不经手资金。",
        ],
      },
      {
        heading: "新增渠道无需改代码",
        body: [
          "创建支付的 API、webhook 和支付链接对所有渠道都相同。启用新渠道不需要在接入中增加任何内容，并且可以在同一个控制台按渠道查看收入。",
        ],
      },
    ],
    links: [
      { label: "功能", href: "/features" },
      { label: "入门指南", href: "/guide" },
      { label: "Docs", href: "https://docs.wire.mn/en/docs" },
    ],
  },
  "automatic-failover": {
    title: "渠道故障时，付款自动转到下一个渠道",
    description:
      "自动路由选择的支付渠道没有响应时，Wire 会在下一个可用渠道上创建付款。本文说明何时切换、何时绝不切换。",
    lead: "当支付渠道由 Wire 自动选择而该渠道出现故障时，付款会自行转到下一个可用渠道。买家看到的是新渠道的付款说明，而不是错误提示。",
    sections: [
      {
        heading: "工作原理",
        body: [
          "确认付款时如果没有指定渠道，Wire 会从您启用的渠道中选择一个。如果该渠道无法连接或其自身出错，Wire 会在路由顺序中的下一个渠道上创建付款。这样的切换最多进行两次。",
        ],
      },
      {
        heading: "何时不会切换",
        body: ["切换只针对渠道故障。以下情况付款不会转到其他渠道："],
        items: [
          "您自己指定了渠道。",
          "渠道拒绝了这笔付款。这是决定，不是故障。",
          "买家的手机号已经发送给该渠道。付款请求可能已经出现在买家的应用中。",
        ],
      },
      {
        heading: "需要做什么",
        body: [
          "什么都不用做。只要启用了两个或更多渠道，并且没有指定渠道，每个接入都会生效。API 响应中的 next_action 始终是应当展示给买家的说明。",
        ],
      },
    ],
    links: [
      { label: "开发者", href: "/developers" },
      { label: "API 参考", href: "https://docs.wire.mn/en/docs/api" },
    ],
  },
};
