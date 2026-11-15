import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// English blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
  "what-is-wire": {
    title: "What is Wire: every payment through one gateway",
    description: "Wire is a gateway for accepting QR, card, e-wallet and installment payments through one integration. A plain explanation of what it does and how it works.",
    lead: "Wire is a payment gateway that brings Mongolia's payment channels together in one place. You integrate once, accept QR, bank-app, card, e-wallet and installment payments, and see all your revenue in one dashboard.",
    sections: [
      { heading: "One integration, six channels", body: ["You do not build a separate technical integration for each channel. QPay, PayLink, Toki, MonPay, StorePay and Pocket Zero are live on Wire, and the buyer picks the one that suits them."], },
      { heading: "Two ways to use it", body: ["Choose what fits your business. You can use both at once."], items: ["Payment links: create one in the dashboard and send it by chat, post or email. No code.", "API: connect your website, app or system. REST API, ready-made SDKs and webhooks."], },
      { heading: "What you need to start", body: ["Sign-up is free and there is no monthly fee. Verify once with email, phone and DAN, activate your channels and start taking payments. A fee applies only to successful transactions."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Getting started guide", href: "/guide" }, { label: "Sign up", href: "https://app.wire.mn" }],
  },
  "who-is-wire-for": {
    title: "Who Wire is built for",
    description: "Online stores, small businesses, service providers, platforms and developers: a short look at who uses Wire and what for.",
    lead: "Wire is for anyone who takes payments. Whether you have a website, only a social media page, or a platform with many merchants, there is a way of using it that fits.",
    sections: [
      { heading: "A business without a website", body: ["Shops that sell through social pages, courses, services and freelancers use payment links. Create a link, send it to your customers and the payments come in. No programmer needed."], },
      { heading: "Online stores and apps", body: ["A business with a website or app connects through the API. The buyer picks a channel and pays on the Wire pay page, and your system receives the result by webhook."], },
      { heading: "Platforms and developers", body: ["For platforms serving many businesses and teams that build systems for clients:"], items: ["A platform registers its merchants with one key and creates payments on their behalf.", "A developer learns one API and builds an integration that works on every channel.", "Each merchant receives payments straight into its own account."], },
    ],
    links: [{ label: "Payment links", href: "/links" }, { label: "For developers", href: "/developers" }, { label: "For platforms", href: "/guides/platform" }],
  },
  "accept-payments-without-website": {
    title: "You can take payments without a website",
    description: "Create a payment link in the dashboard in seconds and send it by chat, post or email. Fixed or open amount, QR code, and a link you can reuse.",
    lead: "You do not need a website to take online payments. Create a payment link in the Wire dashboard and send it to your customers; they pay by QR, card or wallet, and you see every payment in real time.",
    sections: [
      { heading: "What a payment link is", body: ["A payment link leads to a pay page for your product or service. The customer opens it, picks a channel and pays. Many people can pay through the same link."], },
      { heading: "What you can set", body: ["Each link is set up for what you need:"], items: ["A fixed amount, or an open amount the buyer enters.", "A QR code and a copy button.", "Sharing to social channels with an image."], },
      { heading: "How you see the payments", body: ["Each payment appears in the dashboard in real time and you get a notification. One list shows when it was paid, how much, and through which channel."], },
    ],
    links: [{ label: "Payment links", href: "/links" }, { label: "Taking payments without a website", href: "/guides/payment-link" }],
  },
  "start-in-three-steps": {
    title: "Start taking payments in three steps",
    description: "Sign up and verify, activate your payment channels, then take payments by link or API: the three steps to getting started on Wire.",
    lead: "There are only three steps to taking payments on Wire: verify once, activate your channels, and get paid. Sign-up is free and every step is done in the dashboard.",
    sections: [
      { heading: "1. Sign up and verify", body: ["You complete three verifications once: email, phone and DAN. It takes about three minutes and you send no extra documents."], },
      { heading: "2. Activate your channels", body: ["Enter your business details and connect the account that receives your revenue. Wire reviews and approves QPay and PayLink, and you sign the agreement online. You connect the other channels with your own agreement and keys."], },
      { heading: "3. Get paid", body: ["Create a payment link and share it, or take your API key and connect your system. Your first payment shows in the dashboard as soon as it arrives."], },
    ],
    links: [{ label: "Getting started guide", href: "/guide" }, { label: "Verification", href: "/verification" }, { label: "Sign up", href: "https://app.wire.mn" }],
  },
  "no-monthly-fee": {
    title: "No monthly fee, only on successful transactions",
    description: "Sign-up, account connection and the dashboard are free on Wire. A fee applies only to successful transactions, and the rate is shown when you connect a channel.",
    lead: "Signing up, connecting your account and using the dashboard cost nothing on Wire. There is no monthly or usage fee, and a fee applies only to successful transactions.",
    sections: [
      { heading: "What is free", body: ["There is no charge for:"], items: ["Sign-up and verification.", "Connecting your account.", "The dashboard, reports and payment links."], },
      { heading: "What the fee is", body: ["The fee starts from 1%, depending on the channel you choose. The exact rate is shown in that channel's terms when you connect it. There are no hidden charges."], },
      { heading: "In a month with no transactions", body: ["In a month with no transactions you pay nothing. There is no cost while sales are low, so a new business can start without risk."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Accepting payments in Mongolia", href: "/payments-in-mongolia" }],
  },
  "one-dashboard": {
    title: "All your revenue on one screen",
    description: "A payment through any channel shows in one Wire dashboard in real time: transactions, invoices, refunds, reports and export.",
    lead: "Whether it came by QR, card or wallet, every payment shows in one Wire dashboard in real time. You do not sign in to each channel's system separately to reconcile.",
    sections: [
      { heading: "What you see", body: ["In one list:"], items: ["The amount, status, date and paying channel of every transaction.", "The history of invoices and refunds.", "An overview of revenue by channel and by source."], },
      { heading: "Filter, search, download", body: ["Filter transactions by status and search for the one you need. Download the list as a CSV or PDF file for your accountant."], },
      { heading: "Notifications", body: ["You get an email as soon as a payment arrives. If you have a system, it gets a webhook too. You choose which notifications to receive. Every amount is in tögrög, as a whole number."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Sign up", href: "https://app.wire.mn" }],
  },
  "payments-are-not-lost": {
    title: "Payments do not get lost: three layers of confirmation",
    description: "Wire confirms every payment in three ways: a webhook, an active check and a daily reconciliation. Here is why it takes three.",
    lead: "A buyer who has paid while the system never finds out is the most common problem in online payments. Wire checks every payment in three different ways, so when one is delayed another catches it.",
    sections: [
      { heading: "The three layers", body: ["Each layer covers the gap of the one before:"], items: ["Webhook: the channel tells Wire the payment arrived.", "Active check: if no notice came, Wire asks the channel itself.", "Daily reconciliation: payments still waiting are checked again."], },
      { heading: "How it reaches your system", body: ["Once a payment is confirmed, Wire sends your system a signed webhook. If it is not delivered, Wire tries again. Verifying the signature proves the notice really came from Wire."], },
      { heading: "What the buyer sees", body: ["The pay page checks the payment itself and shows the confirmation as soon as it succeeds. The buyer does not need to reload the page."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "For developers", href: "/developers" }],
  },
  "first-payment-in-ten-minutes": {
    title: "For developers: a first payment in 10 minutes",
    description: "REST API, SDKs in six languages, signed webhooks and idempotency: a short tour of what is ready for a developer integrating with Wire.",
    lead: "The Wire API takes three steps: create a payment, confirm it, and receive the result by webhook. One integration works on every channel, so you do not study each channel's API separately.",
    sections: [
      { heading: "What is ready", body: ["There is little to write from scratch:"], items: ["A REST API with an OpenAPI 3.1 definition.", "SDKs for Go, Python, Node.js, PHP, Ruby and .NET.", "Checkout SDKs for JavaScript and iOS."], },
      { heading: "Reliability", body: ["Every webhook carries an HMAC-SHA256 signature and is sent again if it is not delivered. With an Idempotency-Key, a repeated request never creates a second payment."], },
      { heading: "Where to start", body: ["The quickstart in the docs has copy-and-run requests up to a first payment. Take your API key from the dashboard and try it straight away."], },
    ],
    links: [{ label: "For developers", href: "/developers" }, { label: "Quickstart", href: "https://docs.wire.mn/en/docs/quickstart" }],
  },
  "how-your-data-is-protected": {
    title: "How your data is protected",
    description: "Every account owner on Wire is verified by email, phone and DAN. Personal data is stored encrypted and is never given to third parties.",
    lead: "Wire is a financial service for taking payments, so the owner of every account is verified. Your data is stored encrypted, and it is never used for advertising or sold.",
    sections: [
      { heading: "Three verifications", body: ["Done once, when you open an account:"], items: ["Email: a one-time code.", "Phone: one SMS from your own number.", "DAN: identity verification through the state single sign-on."], },
      { heading: "How the data is stored", body: ["Personal data is stored with AES-256 encryption. The screen shows only your name and part of your register number. When you sign in with DAN, Wire never sees your password."], },
      { heading: "Why it is this strict", body: ["One person's details verify only one account. That prevents duplicate sign-ups and fraud, and protects both you and your buyers."], },
    ],
    links: [{ label: "Verification", href: "/verification" }, { label: "Terms of service", href: "/terms" }],
  },
  "payments-for-platforms": {
    title: "For platforms: many merchants' payments through one integration",
    description: "A platform serving many businesses, such as a marketplace or SaaS, registers its merchants by API and creates payments on their behalf. The money goes straight to the merchant's account.",
    lead: "A platform serving many shops and businesses registers its merchants by API through the Wire platform module and creates payments on their behalf with one key. Each merchant receives payments straight into its own account.",
    sections: [
      { heading: "How it works", body: ["In four steps:"], items: ["Get a platform key.", "Register your merchants by API.", "Wire reviews and approves them.", "Create payments on a merchant's behalf and receive the result by webhook."], },
      { heading: "Where the money is", body: ["Money accumulates neither on the platform nor on Wire. Every payment goes straight to that merchant's connected account. Splitting a payment or withholding a platform fee is not possible."], },
      { heading: "Who it suits", body: ["It suits services where each user takes payments in its own name, such as online store builders, booking systems and sales platforms. To get started, get in touch with us."], },
    ],
    links: [{ label: "Payments for many merchants on a platform", href: "/guides/platform" }, { label: "For developers", href: "/developers" }],
  },
  "change-payment-method": {
    title: "Payers can now switch payment channel",
    description:
      "The Wire pay page now shows step-by-step instructions for each channel and lets a payer pay another way after an invoice is already open.",
    lead: "On the Wire pay page, a buyer who picks one channel and cannot complete the payment can now go back and choose another. Merchants do not need to change their integration.",
    sections: [
      {
        heading: "What changed",
        body: [
          "The pay page shows the channels in three groups: bank apps and cards, e-wallets, and installments. After choosing one, the buyer sees numbered steps written for that channel and a button that opens its app.",
          "The pay screen has a new button for paying another way. It returns to the choice of channels, and choosing a different one opens a new invoice.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "A buyer's bank app may not open, a wallet balance may be short, or an installment limit may not be approved. Until now that meant closing the pay page and starting the order again. Now the buyer carries on with another channel on the same page.",
        ],
      },
      {
        heading: "What changes for merchants",
        body: [
          "Nothing in the integration. It works at once for every merchant using payment links or the Wire pay page.",
        ],
        items: [
          "The webhook sent on a successful payment and the payment statuses are the same.",
          "The transaction list in the dashboard shows the channel the money actually came through.",
          "If two invoices for one order are both paid, Wire detects and records it, so the extra payment can be refunded.",
        ],
      },
    ],
    links: [
      { label: "Payment links", href: "/links" },
      { label: "Features", href: "/features" },
    ],
  },
  "six-channels-one-integration": {
    title: "Six payment channels through one integration",
    description:
      "QPay, PayLink, Toki, MonPay, StorePay and Pocket Zero: which are opened through Wire, which connect with your own agreement, and where the money goes.",
    lead: "Six payment channels are now live on Wire: QPay, PayLink, Toki, MonPay, StorePay and Pocket Zero. A merchant integrates once and chooses in the dashboard which channels to switch on.",
    sections: [
      {
        heading: "Six channels, four kinds",
        body: [
          "On the pay page the buyer picks whichever of your enabled channels suits them.",
        ],
        items: [
          "QPay: QR code and bank apps.",
          "PayLink: Visa, Mastercard and domestic cards.",
          "Toki, MonPay: e-wallets.",
          "StorePay, Pocket Zero: installments.",
        ],
      },
      {
        heading: "Two ways to connect",
        body: [
          "QPay and PayLink are opened through Wire: you send your business details, sign the agreement online, and the channel is activated after review.",
          "Toki, MonPay, StorePay and Pocket Zero are connected from the dashboard with your own operator agreement and keys. The money goes straight to your operator account; Wire never holds it.",
        ],
      },
      {
        heading: "Adding a channel changes no code",
        body: [
          "The payment API, the webhooks and payment links are the same for every channel. Switching on a new one adds nothing to your integration, and you see revenue by channel in one dashboard.",
        ],
      },
    ],
    links: [
      { label: "Features", href: "/features" },
      { label: "Getting started guide", href: "/guide" },
      { label: "Docs", href: "https://docs.wire.mn/en/docs" },
    ],
  },
  "automatic-failover": {
    title: "When a channel is down, the payment moves to the next one",
    description:
      "If an automatically routed payment channel does not respond, Wire creates the payment on the next active channel. When it switches, and when it never does.",
    lead: "When Wire chose the payment channel automatically and that channel is down, the payment moves to the next active channel by itself. The buyer sees the new channel's payment instructions, not an error.",
    sections: [
      {
        heading: "How it works",
        body: [
          "If you confirm a payment without naming a channel, Wire picks one of the channels you have switched on. If that channel is unreachable or failing on its side, Wire creates the payment on the next channel in the routing order. It switches this way at most twice.",
        ],
      },
      {
        heading: "When it does not switch",
        body: [
          "Failover protects against an outage only. The payment stays where it is in these cases:",
        ],
        items: [
          "You named the channel yourself.",
          "The channel declined the payment. That is a decision, not an outage.",
          "The buyer's phone number was already sent to the channel. A payment request may already be in their app.",
        ],
      },
      {
        heading: "What you need to do",
        body: [
          "Nothing. It works for every integration with two or more channels switched on that does not name a channel. The next_action in the API response is always the instruction to show the buyer.",
        ],
      },
    ],
    links: [
      { label: "For developers", href: "/developers" },
      { label: "API reference", href: "https://docs.wire.mn/en/docs/api" },
    ],
  },
};
