import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// Chinese blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
  "what-is-wire": {
    title: "Wire 是什么：所有付款走一个网关",
    description: "Wire 是一个支付网关，一次接入即可接受二维码、银行卡、电子钱包和分期付款。本文用通俗的方式说明它做什么、如何运作。",
    lead: "Wire 是把蒙古国各支付渠道集中到一处的支付网关。您只需接入一次，就能接受二维码、银行应用、银行卡、电子钱包和分期付款，并在同一个控制台查看全部收入。",
    sections: [
      { heading: "一次接入，六个渠道", body: ["无需为每个渠道单独做技术对接。QPay、PayLink、Toki、MonPay、StorePay 和 Pocket Zero 已在 Wire 上运行，买家可以选择适合自己的渠道。"], },
      { heading: "两种使用方式", body: ["选择适合您业务的方式，也可以两种同时使用。"], items: ["支付链接：在控制台创建，通过聊天、帖子或邮件发送，无需写代码。", "API：接入您的网站、应用或系统，提供 REST API、现成的 SDK 和 webhook。"], },
      { heading: "开始需要什么", body: ["注册免费，没有月费。用邮箱、手机和 DAN 完成一次验证，启用渠道后即可开始收款。只对成功的交易收取手续费。"], },
    ],
    links: [{ label: "功能", href: "/features" }, { label: "入门指南", href: "/guide" }, { label: "注册", href: "https://app.wire.mn" }],
  },
  "who-is-wire-for": {
    title: "Wire 适合哪些人使用",
    description: "网店、小型企业、服务提供者、平台和开发者：简要说明哪些人在使用 Wire，以及用它来做什么。",
    lead: "只要需要收款，Wire 就适合您。无论您有自己的网站、只有社交媒体主页，还是一个拥有众多商户的平台，都有与之相适应的使用方式，不需要为此改变现有的经营方式。",
    sections: [
      { heading: "没有网站的商家", body: ["通过社交主页销售的店铺、课程、服务和自由职业者使用支付链接。创建链接并发给客户，款项即可到账，不需要程序员。"], },
      { heading: "网店和应用", body: ["拥有网站或应用的商家通过 API 接入。买家在 Wire 支付页面上选择渠道并付款，您的系统通过 webhook 收到结果。"], },
      { heading: "平台和开发者", body: ["面向服务众多商家的平台，以及为客户开发系统的团队："], items: ["平台用一个密钥注册旗下商户，并代表他们创建付款。", "开发者只需学习一套 API，就能完成适用于所有渠道的接入。", "每个商户的款项直接进入其自己的账户。"], },
    ],
    links: [{ label: "支付链接", href: "/links" }, { label: "开发者", href: "/developers" }, { label: "平台", href: "/guides/platform" }],
  },
  "accept-payments-without-website": {
    title: "没有网站也可以收款",
    description: "在控制台几秒钟内创建支付链接，通过聊天、帖子或邮件发送。支持固定金额或开放金额、二维码，链接可以重复使用。",
    lead: "在线收款不一定需要网站。在 Wire 控制台创建支付链接并发给客户，他们可以用二维码、银行卡或钱包付款，每一笔付款您都能实时看到，不需要任何开发工作。",
    sections: [
      { heading: "什么是支付链接", body: ["支付链接通向您的商品或服务的支付页面。客户打开后选择渠道并付款。同一个链接可以供多人付款。"], },
      { heading: "可以设置什么", body: ["每个链接都可以按需要设置："], items: ["固定金额，或由买家自行输入的开放金额。", "二维码和复制按钮。", "带图片分享到社交渠道。"], },
      { heading: "如何查看付款", body: ["每笔付款都会实时出现在控制台，并发送通知。在一个列表中即可看到付款时间、金额和使用的渠道。"], },
    ],
    links: [{ label: "支付链接", href: "/links" }, { label: "没有网站如何收款", href: "/guides/payment-link" }],
  },
  "start-in-three-steps": {
    title: "三个步骤，开始在线收款",
    description: "注册并验证、启用支付渠道、通过链接或 API 收款：在 Wire 上开始的三个步骤。",
    lead: "在 Wire 上开始收款只有三个步骤：完成一次验证、启用渠道、开始收款。注册免费，所有步骤都在控制台中完成，不需要线下办理任何手续，也不需要安装任何软件。",
    sections: [
      { heading: "1. 注册并验证", body: ["一次完成邮箱、手机和 DAN 三项验证。大约需要三分钟，无需另外提交文件。"], },
      { heading: "2. 启用渠道", body: ["填写企业信息并绑定收款账户。QPay 和 PayLink 由 Wire 审核批准，并在线签署协议。其他渠道使用您自己的协议和密钥连接。"], },
      { heading: "3. 开始收款", body: ["创建支付链接并分享，或者获取 API 密钥接入您的系统。第一笔付款到账后立即显示在控制台。"], },
    ],
    links: [{ label: "入门指南", href: "/guide" }, { label: "验证", href: "/verification" }, { label: "注册", href: "https://app.wire.mn" }],
  },
  "no-monthly-fee": {
    title: "没有月费，只对成功交易收费",
    description: "在 Wire 上注册、绑定账户和使用控制台都是免费的。只对成功的交易收取手续费，费率在连接渠道时明确显示。",
    lead: "在 Wire 上注册、绑定账户和使用控制台都不收费。没有月费，也没有使用费，只对成功的交易收取手续费。交易没有成功，就不会产生任何费用，账单上也不会出现意外的项目。",
    sections: [
      { heading: "哪些是免费的", body: ["以下项目不收费："], items: ["注册和验证。", "绑定账户。", "控制台、报表和支付链接。"], },
      { heading: "手续费是多少", body: ["手续费根据所选渠道从 1% 起。具体费率在连接渠道时显示在该渠道的条款中，没有隐藏费用。"], },
      { heading: "没有交易的月份", body: ["没有交易的月份不需要支付任何费用。销售较少时不会产生成本，新企业可以没有风险地起步。"], },
    ],
    links: [{ label: "功能", href: "/features" }, { label: "在蒙古国收款", href: "/payments-in-mongolia" }],
  },
  "one-dashboard": {
    title: "所有收入在一个界面",
    description: "通过任何渠道到账的付款都会实时显示在同一个 Wire 控制台：交易、账单、退款、报表和导出。",
    lead: "无论是通过二维码、银行卡还是钱包到账，每一笔付款都会实时显示在同一个 Wire 控制台。您不必分别登录各个渠道的系统去对账，也不必手工汇总不同来源的数据。",
    sections: [
      { heading: "可以看到什么", body: ["在一个列表中："], items: ["每笔交易的金额、状态、日期和付款渠道。", "账单和退款的历史记录。", "按渠道和来源分类的收入概览。"], },
      { heading: "筛选、搜索、下载", body: ["按状态筛选交易并搜索所需的记录。可以把列表下载为 CSV 或 PDF 文件交给会计。"], },
      { heading: "通知", body: ["付款到账后立即发送邮件通知。如果您有系统，还会收到 webhook。接收哪些通知由您自己设置。所有金额均以图格里克计，为整数。"], },
    ],
    links: [{ label: "功能", href: "/features" }, { label: "注册", href: "https://app.wire.mn" }],
  },
  "payments-are-not-lost": {
    title: "付款不会丢失：三层确认",
    description: "Wire 用三种方式确认每一笔付款：webhook、主动查询和每日对账。本文说明为什么需要三层。",
    lead: "买家已经付款而系统却不知道，是在线支付中最常见的问题。Wire 用三种不同的方式检查每一笔付款，其中一种延迟时，另一种会把它补上，因此付款不会被遗漏。",
    sections: [
      { heading: "三层确认", body: ["每一层都弥补上一层的缺口："], items: ["Webhook：渠道通知 Wire 付款已到账。", "主动查询：如果没有收到通知，Wire 会主动向渠道查询。", "每日对账：对仍在等待的付款再次核对。"], },
      { heading: "如何到达您的系统", body: ["付款确认后，Wire 会向您的系统发送带签名的 webhook。如果未送达，会再次尝试。验证签名可以证明通知确实来自 Wire。"], },
      { heading: "买家看到什么", body: ["支付页面会自行检查付款，成功后立即显示确认信息。买家不需要刷新页面。"], },
    ],
    links: [{ label: "功能", href: "/features" }, { label: "开发者", href: "/developers" }],
  },
  "first-payment-in-ten-minutes": {
    title: "面向开发者：10 分钟完成第一笔付款",
    description: "REST API、六种语言的 SDK、带签名的 webhook 和幂等性：简要介绍接入 Wire 时开发者可以直接使用的内容。",
    lead: "Wire 的 API 分为三步：创建付款、确认付款、通过 webhook 接收结果。一次接入适用于所有渠道，因此不必分别研究每个渠道的 API，也不必为每个渠道维护一套代码。",
    sections: [
      { heading: "已经准备好的内容", body: ["需要从头编写的内容很少："], items: ["REST API，附带 OpenAPI 3.1 定义。", "Go、Python、Node.js、PHP、Ruby 和 .NET 的 SDK。", "适用于 JavaScript 和 iOS 的 checkout SDK。"], },
      { heading: "可靠性", body: ["每个 webhook 都带有 HMAC-SHA256 签名，未送达时会重新发送。使用 Idempotency-Key 后，即使请求重复，也不会重复创建付款。"], },
      { heading: "从哪里开始", body: ["文档中的 quickstart 提供了可以直接复制运行的请求，一直到完成第一笔付款。从控制台获取 API 密钥即可马上尝试。"], },
    ],
    links: [{ label: "开发者", href: "/developers" }, { label: "Quickstart", href: "https://docs.wire.mn/en/docs/quickstart" }],
  },
  "how-your-data-is-protected": {
    title: "您的信息如何受到保护",
    description: "Wire 上的每位账户所有者都通过邮箱、手机和 DAN 验证。个人信息加密存储，不会提供给第三方。",
    lead: "Wire 是用于收款的金融服务，因此每个账户的所有者都经过验证。您的信息以加密方式存储，不会用于广告，也不会被出售。只在身份验证所必需的范围内使用这些信息。",
    sections: [
      { heading: "三项验证", body: ["开户时完成一次："], items: ["邮箱：一次性验证码。", "手机：用自己的号码发送一条短信。", "DAN：通过国家统一登录系统进行身份验证。"], },
      { heading: "信息如何存储", body: ["个人信息使用 AES-256 加密存储。界面上只显示姓名和登记号的一部分。通过 DAN 登录时，Wire 永远看不到您的密码。"], },
      { heading: "为什么这样严格", body: ["一个人的信息只能验证一个账户。这可以防止重复注册和欺诈，同时保护您和您的买家。"], },
    ],
    links: [{ label: "验证", href: "/verification" }, { label: "服务条款", href: "/terms" }],
  },
  "payments-for-platforms": {
    title: "面向平台：一次接入处理众多商户的付款",
    description: "服务众多商家的平台（如电商平台、SaaS）通过 API 注册商户，并代表他们创建付款。资金直接进入商户的账户。",
    lead: "服务众多店铺和企业的平台，可以通过 Wire 的平台模块用 API 注册旗下商户，并用一个密钥代表他们创建付款。每个商户的款项直接进入其自己的账户，不经过平台。",
    sections: [
      { heading: "如何运作", body: ["共四个步骤："], items: ["获取平台密钥。", "通过 API 注册商户。", "Wire 审核并批准。", "代表商户创建付款，并通过 webhook 接收结果。"], },
      { heading: "资金在哪里", body: ["资金既不会留在平台上，也不会留在 Wire 上。每笔付款直接进入该商户绑定的账户。不支持拆分付款或扣留平台手续费。"], },
      { heading: "适合谁", body: ["适合每个用户都以自己的名义收款的服务，例如建店工具、预订系统和销售平台。如需开始，请与我们联系。"], },
    ],
    links: [{ label: "平台上众多商户的付款", href: "/guides/platform" }, { label: "开发者", href: "/developers" }],
  },
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
