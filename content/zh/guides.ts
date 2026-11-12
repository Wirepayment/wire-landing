import { CONTACT } from "@/lib/company";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import type { Guide, GuideStep } from "@/lib/guides";

// Simplified Chinese answer pages, translated from content/mn/guides.ts (the
// source: same slugs, order, step and FAQ counts). docs.wire.mn has no
// Chinese edition, so docs links point at the English docs (/en/docs) and
// say so in their label.

const SIGNUP = { label: "开始使用", href: DASHBOARD_URL };

const FEE_ANSWER =
  "注册、账户绑定和管理后台全部免费，也没有月费。仅对成功交易收取手续费，视您选择的支付渠道而定，最低 1% 起。具体费率会在启用连接时，在该渠道的条款中明确列出。";

const SETTLEMENT_ANSWER =
  "收入将转入您绑定的银行账户。到账时间取决于所选支付渠道的条款。每笔交易都会实时显示在管理后台中。";

const ACCOUNT_STEPS: GuideStep[] = [
  {
    title: "注册并完成一次验证",
    body: "登录 app.wire.mn，完成账户所有人的电子邮件、手机及 DAN（蒙古国政府电子身份认证）验证。只需完成一次——之后无论开设多少企业或项目，都无需重复。",
  },
  {
    title: "启用服务商",
    body: "QPay、PayLink：在管理后台中选择服务商并填写表单（注册信息、地址、收款账户）。审核批准后，在线签署电子协议，连接即会启用。Toki、MonPay、StorePay、Pocket Zero：使用您与服务商签订的自有协议和密钥，在管理后台中完成连接。",
  },
];

export const GUIDES: Guide[] = [
  {
    slug: "/guides/online-payment",
    label: "在网站上接受在线支付",
    badge: "指南",
    line1: "如何在您的网站上",
    line2: "接受在线支付？",
    answer:
      "在 Wire 注册并完成验证、启用服务商后，即可从您的网站将买家引导至 Wire 的支付页面，或通过 REST API 进行对接。买家通过您已启用的渠道（二维码、银行 App、银行卡等）付款，收入将转入您绑定的账户。您也可以直接使用现成的支付链接立即开始。",
    stepsTitle: "5 步完成首笔收款",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "创建项目并获取 API 密钥",
        body: "每个项目都有自己的 sk_live 密钥和一个 Webhook。密钥只显示一次，请保存到密码管理器中。",
      },
      {
        title: "将买家引导至支付页面",
        body: "在服务器端创建 PaymentIntent，为其开启 checkout session，并将买家引导至 pay.wire.mn 上的支付页面。该页面会自动显示二维码、银行 App 深度链接以及您已开启的其他渠道。",
      },
      {
        title: "通过 Webhook 确认",
        body: "付款成功后，您的服务器会收到 payment_intent.succeeded 事件。每个事件都带有 HMAC-SHA256 签名，请在验证其真实性后再确认订单。",
      },
    ],
    faqs: [
      {
        q: "我的网站需要使用什么技术？",
        a: "没有限制。Wire 是 REST API，任何编程语言或框架都可以调用。Go、Python、Node.js、PHP、Ruby、.NET 均提供现成的 SDK。",
      },
      {
        q: "没有程序员怎么办？",
        a: "只需在管理后台创建支付链接，并放到您的网站、聊天或帖子中即可——人人都能轻松上手。",
      },
      {
        q: "如何知道款项已到账？",
        a: "每笔交易都会实时显示在管理后台中，并发送电子邮件通知。如果您有服务器，带签名的 Webhook 事件会自动通知。",
      },
      {
        q: "支付页面的有效期是多久？",
        a: "默认在付款创建后 10 分钟内有效。如未付款，将自动取消。",
      },
      { q: "手续费是多少？", a: FEE_ANSWER },
      { q: "款项何时到账？", a: SETTLEMENT_ANSWER },
    ],
    related: [
      {
        label: "快速入门（英文文档）",
        href: `${DOCS_URL}/en/docs/quickstart`,
      },
      {
        label: "托管收银台（英文文档）",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "开发者", href: "/developers" },
      { label: "注册指南", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-link",
    label: "没有网站也能收款",
    badge: "现成链接",
    line1: "没有网站，",
    line2: "如何收款？",
    answer:
      "在 Wire 的管理后台中创建支付链接，然后通过 Messenger、Facebook 帖子、Instagram 或电子邮件发送给买家。买家点击链接后，即可通过二维码或银行 App 付款。无需网站，也无需程序员，一个链接即可多次收款。",
    stepsTitle: "通过链接收款的步骤",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "创建链接",
        body: "在管理后台的“支付链接”部分输入标题、付款说明和金额。金额可以固定，也可以开放，由买家自行输入。",
      },
      {
        title: "分享链接",
        body: "复制链接通过聊天发送、打印二维码，或分享到 Facebook、Instagram、LinkedIn。在社交网络上，会自动显示带有您的名称和金额的图片预览。",
      },
      {
        title: "跟踪收款",
        body: "每个链接的付款笔数和已收总额都会实时显示在管理后台中。您可以暂停链接，之后再重新开启。",
      },
    ],
    faqs: [
      {
        q: "一个链接可以供多人付款吗？",
        a: "可以。链接可重复使用，无需为每笔付款创建新链接。",
      },
      {
        q: "买家可以自行输入金额吗？",
        a: "可以。创建开放金额的链接后，由买家输入金额。您可以设置最低金额（适用于捐款、自愿付款）。",
      },
      {
        q: "买家会看到什么？",
        a: "您设置的付款说明（例如：订单 #1024）和金额。标题仅是您在管理后台中使用的名称。",
      },
      {
        q: "可以在店铺收银台使用链接吗？",
        a: "可以。打印链接的二维码并摆放出来，买家用手机扫码即可付款。",
      },
      {
        q: "通过链接的付款与通过 API 的付款有区别吗？",
        a: "没有。每笔通过链接的付款都会作为普通付款记录，汇总在同一份报表中，并同样发送 Webhook。",
      },
      { q: "手续费是多少？", a: FEE_ANSWER },
    ],
    related: [
      { label: "支付链接", href: "/links" },
      {
        label: "支付链接（英文文档）",
        href: `${DOCS_URL}/en/docs/guides/payment-links`,
      },
      { label: "注册指南", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/card-payments",
    label: "接受银行卡支付",
    badge: "银行卡支付",
    line1: "如何在蒙古国",
    line2: "接受银行卡支付？",
    answer:
      "Wire 的支付页面支持使用 Visa、Mastercard 及本地银行卡付款。在管理后台中启用 PayLink 银行卡支付渠道，并在项目中将其开启后，您的支付链接和收银台中就会出现银行卡支付选项，并与其他渠道一样在同一个管理后台中出具报表。",
    stepsTitle: "启用银行卡支付",
    steps: [
      {
        title: "注册并完成一次验证",
        body: "登录 app.wire.mn，完成账户所有人的电子邮件、手机及 DAN（蒙古国政府电子身份认证）验证。",
      },
      {
        title: "选择银行卡支付渠道",
        body: "在管理后台的“连接”部分选择银行卡支付渠道，并提交注册信息、地址和收款账户。",
      },
      {
        title: "审核与电子协议",
        body: "申请获批后，使用经 DAN 验证的信息在线签署该渠道的电子协议。协议签署后，连接即会启用。",
      },
      {
        title: "在项目中开启",
        body: "每个项目需自行开启要使用的连接。开启后，该项目的链接、收银台和 API 付款中都会提供银行卡支付。",
      },
    ],
    faqs: [
      {
        q: "可以使用哪些银行卡付款？",
        a: "Visa、Mastercard 及本地银行卡。",
      },
      {
        q: "可以同时提供银行卡和二维码支付吗？",
        a: "可以。项目中开启的所有连接都会显示在同一个支付页面上，由买家选择适合自己的方式。",
      },
      {
        q: "银行卡支付需要单独签订协议吗？",
        a: "需要，但全部在管理后台内完成：提交申请，获批后通过 DAN 在线签署电子协议。无需纸质文件，也无需前往办公室。",
      },
      {
        q: "银行卡支付的手续费是多少？",
        a: "仅对成功交易收取手续费。银行卡支付渠道的具体费率会在启用连接时，在协议条款中明确列出。",
      },
      { q: "款项何时到账？", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "功能", href: "/features" },
      {
        label: "启用服务商（英文文档）",
        href: `${DOCS_URL}/en/docs/guides/going-live`,
      },
      { label: "注册指南", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/qr-payments",
    label: "接入二维码支付",
    badge: "二维码支付",
    line1: "如何接入",
    line2: "二维码支付？",
    answer:
      "Wire 的支付页面会为每笔付款生成二维码和银行 App 深度链接。在电脑上，买家用手机扫描二维码；在手机上，则可直接打开银行 App 付款。通过一个连接，即可接受蒙古国各支付服务商的二维码支付。",
    stepsTitle: "二维码收款步骤",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "选择提供方式",
        body: "最简单的方式是现成的支付链接：打印或发送其二维码。如果您有网站或 App，可通过 API 创建付款，并将买家引导至 Wire 的支付页面。",
      },
      {
        title: "买家扫码付款",
        body: "买家使用银行 App 或钱包 App 扫描二维码。在手机上，深度链接会直接打开相应的 App。",
      },
      {
        title: "实时查看到账",
        body: "交易会实时显示在管理后台中，并通过电子邮件和 Webhook 通知您。",
      },
    ],
    faqs: [
      {
        q: "可以使用哪些 App 扫描二维码？",
        a: "您已启用的服务商所支持的银行 App 和电子钱包 App。",
      },
      {
        q: "可以把打印的二维码摆放在收银台吗？",
        a: "可以。支付链接的二维码可以打印。如果是开放金额的链接，由买家自行输入金额。",
      },
      {
        q: "在线订单的二维码有效期是多久？",
        a: "通过 API 创建的付款默认有效期为 10 分钟。如未付款，将自动取消。",
      },
      {
        q: "可以在移动 App 内使用吗？",
        a: "可以。在服务器端通过 REST API 创建付款。收银台提供 JavaScript 和 iOS SDK。",
      },
      { q: "手续费是多少？", a: FEE_ANSWER },
    ],
    related: [
      { label: "支付链接", href: "/links" },
      {
        label: "托管收银台（英文文档）",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "开发者", href: "/developers" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-gateway",
    label: "什么是支付网关",
    badge: "概念",
    line1: "什么是",
    line2: "支付网关？",
    answer:
      "支付网关是将您的企业与各支付服务商连接起来的中间层。您无需与每家服务商分别建立技术连接，只需与 Wire 对接一次，即可通过一个 API、一个管理后台接受银行 App、电子钱包、二维码、银行卡和分期付款。",
    stepsTitle: "付款如何流转",
    steps: [
      {
        title: "您创建付款",
        body: "通过支付链接，或通过 API 以蒙古图格里克（整数，不含小数）指定金额来创建付款。",
      },
      {
        title: "买家选择渠道",
        body: "Wire 的支付页面会集中显示您在项目中开启的所有渠道。",
      },
      {
        title: "服务商处理付款",
        body: "所选服务商处理付款，收入将转入您绑定的账户。",
      },
      {
        title: "Wire 确认状态",
        body: "服务商通知、主动查询和每日对账三重保障，确保付款不会丢失。结果会通过管理后台、电子邮件和 Webhook 送达您。",
      },
    ],
    points: {
      title: "与分别对接每家服务商相比",
      items: [
        "一个 API、一套 SDK——无需逐一研究每家服务商各不相同的接入方式",
        "一个管理后台——所有渠道的交易和报表集中在一处",
        "一个 Webhook——所有渠道的通知格式统一，并带有签名",
        "新增渠道无需修改代码——在管理后台中开启即可",
      ],
    },
    faqs: [
      {
        q: "Wire 可以接受哪些付款？",
        a: "二维码、银行 App（QPay）、银行卡（PayLink）、电子钱包（Toki、MonPay）、分期付款（StorePay、Pocket Zero）——即您所连接的蒙古国各支付服务商的渠道。",
      },
      {
        q: "需要与每家服务商签订协议吗？",
        a: "QPay、PayLink 的协议在管理后台内通过 DAN（蒙古国政府电子身份认证）在线签署。Toki、MonPay、StorePay、Pocket Zero 则使用您与服务商签订的自有协议。无论哪种情况，技术连接都只有一个——Wire。",
      },
      {
        q: "Wire 由谁运营？",
        a: "Buildry AI LLC。",
      },
      {
        q: "信息安全吗？",
        a: "个人信息采用 AES-256 加密存储，不会提供给第三方。每个 Webhook 都带有签名，可逐条验证通知的真实性。",
      },
      { q: "手续费是多少？", a: FEE_ANSWER },
    ],
    related: [
      { label: "功能", href: "/features" },
      { label: "开发者", href: "/developers" },
      { label: "身份验证", href: "/verification" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/platform",
    label: "平台的多商户收款",
    badge: "平台模块",
    line1: "如何通过一个 API",
    line2: "为多个商户收款？",
    answer:
      "服务众多店铺和企业的平台（电商市场、SaaS）可通过 Wire 的平台模块，使用 API 注册其商户并代其创建付款。每个商户的款项都直接进入其自有账户——资金既不会沉淀在平台，也不会沉淀在 Wire。",
    stepsTitle: "平台如何接入",
    steps: [
      {
        title: "获取平台密钥",
        body: "联系 Wire 注册您的平台。Wire 会为您颁发平台密钥——只显示一次。",
      },
      {
        title: "通过 API 注册商户",
        body: "通过 API 提交每个商户的注册信息（个人或机构）。字段与管理后台中的注册相同。",
      },
      {
        title: "Wire 审核批准",
        body: "每份申请都会经过 Wire 的审核。获批的商户即可通过自有账户收款。可通过 API 跟踪状态。",
      },
      {
        title: "代商户创建付款",
        body: "使用一个密钥即可为任一商户创建付款，并通过带签名的 Webhook 接收结果。",
      },
    ],
    faqs: [
      {
        q: "款项会进入哪里？",
        a: "直接进入每个商户自己绑定的账户。平台和 Wire 都不经手商户的资金。",
      },
      {
        q: "可以拆分付款并扣除平台佣金吗？",
        a: "不可以。不支持拆分付款或扣除佣金。平台的合作条款需与 Wire 另行商定。",
      },
      {
        q: "如果商户已在 Wire 注册怎么办？",
        a: "Wire 可以将其与现有注册合并，在这种情况下，您获得的商户 id 将继续有效。",
      },
      {
        q: "每个商户都需要进行验证吗？",
        a: "您通过 API 提交商户的注册信息，由 Wire 审核批准。",
      },
      {
        q: "如何开始？",
        a: `请发送邮件至 ${CONTACT.email}，介绍您的平台。`,
      },
    ],
    related: [
      { label: "开发者", href: "/developers" },
      { label: "什么是支付网关", href: "/guides/payment-gateway" },
    ],
    cta: { label: "联系我们", href: `mailto:${CONTACT.email}` },
  },
  {
    slug: "/payments-in-mongolia",
    label: "在蒙古国接受支付",
    badge: "指南",
    line1: "如何在蒙古国",
    line2: "接受在线支付？",
    answer:
      "Wire 是专为蒙古国打造的支付网关。蒙古国的企业或个人卖家在 app.wire.mn 注册，通过账户所有人的电子邮件、手机及 DAN（蒙古国政府电子身份认证）完成一次验证，并启用所需的支付服务商。之后，即可通过 Wire 的支付页面、支付链接或 REST API 收款。买家可使用银行 App、电子钱包、二维码、银行卡或分期付款渠道付款，款项直接进入企业的自有账户。",
    stepsTitle: "从注册到首笔收款",
    steps: [
      {
        title: "注册并完成一次验证",
        body: "登录 app.wire.mn，完成账户所有人的电子邮件、手机及 DAN 验证。只需完成一次——之后无论开设多少企业或项目，都无需重复。",
      },
      {
        title: "启用服务商",
        body: "QPay、PayLink：在管理后台中提交企业信息和收款账户。审核批准后，在线签署电子协议，连接即会启用。Toki、MonPay、StorePay、Pocket Zero：在管理后台中输入您与服务商签订的自有协议所对应的密钥。",
      },
      {
        title: "创建项目并获取 API 密钥",
        body: "每个项目都有自己的 sk_live 密钥和一个 Webhook endpoint。密钥只显示一次，请保存到密码管理器中。",
      },
      {
        title: "将买家引导至支付页面",
        body: "在服务器端创建 PaymentIntent，开启 checkout session，并将买家引导至 pay.wire.mn 上的支付页面。该页面会显示二维码、银行 App 深度链接以及您已开启的所有渠道。",
      },
      {
        title: "通过 Webhook 确认",
        body: "您的服务器会收到带有 HMAC-SHA256 签名的 payment_intent.succeeded 事件。验证签名后再履行订单。",
      },
    ],
    faqs: [
      {
        q: "买家可以使用哪些付款方式？",
        a: "二维码、银行 App（QPay），银行卡——Visa、Mastercard、本地银行卡（PayLink），电子钱包（Toki、MonPay），分期付款（StorePay、Pocket Zero）。QPay 和 PayLink 通过 Wire 接入；其他渠道则使用您与服务商签订的自有协议和密钥，在管理后台中连接。",
      },
      {
        q: "金额使用哪种货币？",
        a: "蒙古图格里克（MNT），以整数计——图格里克没有辅币单位。",
      },
      {
        q: "提供哪些语言的 SDK？",
        a: "服务器端提供 Go、Python、Node.js、PHP、Ruby、.NET，此外还有收银台的 JavaScript 和 iOS SDK。API 采用 OpenAPI 3.1 规范描述。",
      },
      { q: "手续费是多少？", a: FEE_ANSWER },
      {
        q: "没有网站也能收款吗？",
        a: "可以。在管理后台创建支付链接，通过聊天、帖子或电子邮件分享，或打印其二维码。",
      },
      {
        q: "Wire 由谁运营？",
        a: "Buildry AI LLC。",
      },
    ],
    related: [
      { label: "Wire 首页", href: "/" },
      { label: "开发者文档（英文）", href: `${DOCS_URL}/en/docs` },
      {
        label: "快速入门（英文文档）",
        href: `${DOCS_URL}/en/docs/quickstart`,
      },
    ],
    cta: SIGNUP,
  },
];
