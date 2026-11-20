import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// English blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
  "aml-agent": {
    title: "Wire's AML agent: income only to the owner's own account",
    description: "The Wire platform's AML agent checks every business's registration and receiving account against DAN, so income cannot be routed to someone else's account. If you register for someone else, the real owner confirms with DAN.",
    lead: "Wire now runs an AML agent. It checks each business's registration and receiving bank account against DAN to make sure the money goes only to the business's real owner.",
    sections: [
      { heading: "What the AML agent checks", body: ["Every registration and account is checked for three things:"], items: ["For a sole trader, the receiving account is in the owner's own DAN-verified name.", "For an organisation, the account is in the organisation's name.", "The owner named in the registration (a person's register, an organisation's director) matches the DAN of the person registering."] },
      { heading: "Registering on someone else's behalf", body: ["You may register a family member's or partner's business, but the real owner named in the registration must confirm it: Wire gives you a secret link to send them. They do not need a Wire account or a sign-in; they only confirm with DAN. When the register matches, the business passes to the real owner and you keep running it as a team member. Anyone else who opens the link is rejected."] },
      { heading: "Running a business as a team", body: ["Several people can run one business. Team members work like the owner, except deleting (projects, accounts, links, keys, members), which is the owner's alone. The owner and members add people with an invite link."] },
      { heading: "Fixing a wrong account", body: ["Add your account in your own name on the dashboard's Accounts page: it becomes the default at once and income starts landing there. The old account in someone else's name is locked: its payment history is kept, but it can never again be made the default or chosen for a payment."] },
      { heading: "Why it is needed", body: ["Under anti-money-laundering and counter-terrorist-financing requirements, a payment service provider must know a business's real owner and keep income from passing through accounts in other people's names. The AML agent does this check automatically, to the same standard for every registration."] },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Sign up", href: "https://app.wire.mn" }],
  },
  "smart-insights": {
    title: "The dashboard now draws conclusions from your payments",
    description: "Besides charts, the Wire dashboard now shows short findings drawn from your own payments: how revenue changed, which channel converts better, and when most payments come in.",
    lead: "The Overview page of the dashboard has a new Insights section. It turns your own payments in the chosen period into a few short sentences, so you know what changed without reading it off the charts.",
    sections: [
      { heading: "What it tells you", body: ["It shows only what applies to the period:"], items: ["How much revenue rose or fell compared with the period before.", "Which channel's payments are paid more often.", "Which payment link brought most of the revenue.", "Which day of the week and which hours bring the most payments.", "The share of people who opened the pay page and left without choosing a channel."], },
      { heading: "How it is worked out", body: ["Every finding comes from your own payments, from exactly the numbers the charts use. Nothing is compared with other merchants' data. With few payments it stays silent, so a handful of payments never produces a wrong conclusion."], },
      { heading: "Where to find it", body: ["On the Overview page of the dashboard, under the revenue chart. Change the period and the findings follow it. No setup is needed."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Sign up", href: "https://app.wire.mn" }],
  },
  "expired-pay-links": {
    title: "An expired payment link now says so clearly",
    description: "A pay page whose time has run out, or whose order was canceled, now shows a clear expired notice instead of a choice of channels.",
    lead: "When a buyer opened an old payment link, the page used to show the choice of channels and then fail when they tried to pay. Now the page says straight away that it has expired.",
    sections: [
      { heading: "What changed", body: ["If the payment has expired or the order was canceled, the pay page shows no choice of channels and no QR code. It shows a notice that the link has expired instead."], },
      { heading: "Why it matters", body: ["Old links stay behind in chats and emails. A buyer who opened one days later and tried to pay got an error that explained nothing. Now they understand at once what happened."], },
      { heading: "What changes for merchants", body: ["Nothing to do."], items: ["Valid links and pay pages work as before.", "A buyer who sees the expired notice asks you for a new link.", "Reusable payment links are the same: every payment opens a new page."], },
    ],
    links: [{ label: "Payment links", href: "/links" }, { label: "Features", href: "/features" }],
  },
  "wire-in-four-languages": {
    title: "Wire is now in four languages",
    description: "wire.mn is available in Mongolian, English, Chinese and Korean, and the dashboard in Mongolian and English. How to choose a language and what is translated.",
    lead: "wire.mn can now be read in four languages: Mongolian, English, Chinese and Korean. The dashboard is in Mongolian and English. Choose a language at the top of the page and the site opens in it next time.",
    sections: [
      { heading: "What is translated", body: ["Every page of the site has the same content in all four languages: features, the getting started guide, the FAQ and the blog."], },
      { heading: "How to choose a language", body: ["Pick it from the language switcher at the top of the page. The choice is remembered and the site opens in that language next time. The addresses of the Mongolian pages have not changed."], },
      { heading: "Who it is for", body: ["Foreign nationals doing business in Mongolia, and teams working with partners abroad, can read about Wire and sign up in their own language. Developer documentation is in Mongolian and English. Agreement texts remain in Mongolian."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Docs", href: "https://docs.wire.mn/en/docs" }],
  },
  "connect-your-own-channel": {
    title: "Connect a channel you have your own agreement with",
    description: "Connect your own agreement and keys with Toki, MonPay, StorePay or Pocket Zero from the Wire dashboard and take those payments alongside your other channels.",
    lead: "If you have your own agreement with Toki, MonPay, StorePay or Pocket Zero, enter your keys in the Wire dashboard and that channel is connected directly. The money goes to your operator account; Wire never holds it.",
    sections: [
      { heading: "How to connect", body: ["In three steps:"], items: ["Sign an agreement with the operator and get your keys.", "Enter the keys in the Channels section of the dashboard.", "Wire checks the keys and the channel is activated."], },
      { heading: "Where the money goes", body: ["A payment goes straight to your operator account. Wire never holds the money: it creates the payment and tells you the result."], },
      { heading: "What comes together", body: ["A channel with your own agreement works like any other. The buyer sees all channels together on the pay page, and you see every transaction in one dashboard. The keys are stored encrypted."], },
    ],
    links: [{ label: "Features", href: "/features" }, { label: "Getting started guide", href: "/guide" }],
  },
  "channel-amount-limits": {
    title: "Payers see a channel's amount limits up front",
    description: "Some payment channels have a minimum or maximum amount. The Wire pay page shows a channel that does not fit, with the reason, so the payer picks another straight away.",
    lead: "Some payment channels accept only payments above or below a certain amount. Wire checks this before a payment is created and shows a channel that does not fit on the pay page, with the reason.",
    sections: [
      { heading: "What the payer sees", body: ["If the amount is outside a channel's limits, that channel is shown as unavailable on the pay page and says which amounts it works for. The payer picks another channel without hitting an error."], },
      { heading: "What the merchant sees", body: ["When you create a payment link, the dashboard warns you if the amount is outside a channel's limits. The limits of a channel with your own agreement are shown on that channel's page."], },
      { heading: "If you use the API", body: ["A payment that names no channel is routed automatically to one whose limits it fits. If you name the channel yourself and the amount does not fit, the API answers with a specific error code."], },
    ],
    links: [{ label: "For developers", href: "/developers" }, { label: "API reference", href: "https://docs.wire.mn/en/docs/api" }],
  },
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
