import { CONTACT } from "@/lib/company";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import type { Guide, GuideStep } from "@/lib/guides";

// English answer pages, translated from content/mn/guides.ts (the source:
// same slugs, order, step and FAQ counts). /payments-in-mongolia keeps the
// wording of the former English /en/payments-in-mongolia page. Docs links
// point at the English docs (docs.wire.mn/en/docs).

const SIGNUP = { label: "Get started", href: DASHBOARD_URL };

const FEE_ANSWER =
  "Sign-up, connecting accounts and the dashboard are free, and there is no monthly fee. A fee applies only to successful transactions, starting from 1% depending on the payment channel you choose. The exact rate is shown in that channel's terms when you activate the connection.";

const SETTLEMENT_ANSWER =
  "The revenue goes to the bank account you connected. When it arrives depends on the terms of the payment channel you choose. Every transaction shows in the dashboard in real time.";

const ACCOUNT_STEPS: GuideStep[] = [
  {
    title: "Sign up and verify once",
    body: "Sign in at app.wire.mn and verify the owner's phone and DAN (state e-ID). It is done once — however many businesses or projects you open later, you are not asked again.",
  },
  {
    title: "Activate an operator",
    body: "QPay, PayLink: choose the operator in the dashboard and fill in the form (registration details, address, settlement account). After review approves it, the connection goes live as soon as you sign the agreement electronically. Toki, MonPay, StorePay, Pocket Zero: connect from the dashboard with your own agreement and keys from the operator.",
  },
];

export const GUIDES: Guide[] = [
  {
    slug: "/guides/online-payment",
    label: "Accept online payments on your website",
    badge: "Guide",
    line1: "How do you accept online",
    line2: "payments on your website?",
    answer:
      "Sign up with Wire, verify, and activate an operator; then send buyers from your website to Wire's payment page, or connect through the REST API. Buyers pay through the channels you activated (QR, bank apps, cards and so on), and the revenue goes to the account you connected. You can also start straight away with a ready-made payment link.",
    stepsTitle: "5 steps to the first payment",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Create a project and get an API key",
        body: "Each project has its own sk_live secret key and one webhook. The key is shown only once, so store it in a password manager.",
      },
      {
        title: "Send buyers to the payment page",
        body: "On your server, create a PaymentIntent, open a checkout session for it and send the buyer to the payment page on pay.wire.mn. The page itself shows the QR code, bank-app deeplinks and the other channels you switched on.",
      },
      {
        title: "Confirm with a webhook",
        body: "As soon as a payment succeeds, your server receives a payment_intent.succeeded event. Every event is signed with HMAC-SHA256, so check that it is genuine, then confirm the order.",
      },
    ],
    faqs: [
      {
        q: "What technology does my website need?",
        a: "Any. Wire is a REST API, so you can call it from any language or framework. Ready-made SDKs exist for Go, Python, Node.js, PHP, Ruby and .NET.",
      },
      {
        q: "What if I have no developer?",
        a: "Create a payment link in the dashboard and place it on your website, in chat or in your posts — easy for anyone.",
      },
      {
        q: "How do I know a payment came in?",
        a: "Every transaction shows in the dashboard in real time, and you get an email notification. If you have a server, signed webhook events tell it automatically.",
      },
      {
        q: "How long is the payment page valid?",
        a: "By default, 10 minutes after the payment is created. If it is not paid, it is canceled automatically.",
      },
      { q: "What is the fee?", a: FEE_ANSWER },
      { q: "When does the money reach my account?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "Quickstart (docs)", href: `${DOCS_URL}/en/docs/quickstart` },
      {
        label: "Hosted checkout (docs)",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "For developers", href: "/developers" },
      { label: "Getting started guide", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-link",
    label: "Take payments without a website",
    badge: "Payment links",
    line1: "How do you take payments",
    line2: "without a website?",
    answer:
      "Create a payment link in the Wire dashboard and send it by Messenger, in a Facebook post, on Instagram or by email. The buyer taps the link and pays by QR or bank app. No website and no developer needed, and one link can take many payments.",
    stepsTitle: "Taking payments with a link",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Create the link",
        body: "In the Payment links section of the dashboard, enter a title, a payment description and the amount. The amount can be fixed, or open for the buyer to enter.",
      },
      {
        title: "Share it",
        body: "Copy the link and send it in chat, print its QR code, or share it on Facebook, Instagram or LinkedIn. On social networks, an image preview with your name and the amount shows automatically.",
      },
      {
        title: "Track your payments",
        body: "The number of payments and the total collected for each link show in the dashboard in real time. You can pause a link and switch it back on later.",
      },
    ],
    faqs: [
      {
        q: "Can many people pay with one link?",
        a: "Yes. A link is reusable, so you do not need a new link for each payment.",
      },
      {
        q: "Can the buyer enter the amount?",
        a: "Yes. With an open-amount link, the buyer enters the amount. You can set a minimum (for donations or pay-what-you-want).",
      },
      {
        q: "What does the buyer see?",
        a: "The payment description you set (for example: Order #1024) and the amount. The title is only the name inside your dashboard.",
      },
      {
        q: "Can I use a link at a shop counter?",
        a: "Yes. Print the link's QR code and put it up; buyers scan it with their phone and pay.",
      },
      {
        q: "Is a link payment different from an API payment?",
        a: "No. Every link payment is recorded as an ordinary payment, appears in the same report, and sends the same webhooks.",
      },
      { q: "What is the fee?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Payment links", href: "/links" },
      {
        label: "Payment links (docs)",
        href: `${DOCS_URL}/en/docs/guides/payment-links`,
      },
      { label: "Getting started guide", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/card-payments",
    label: "Accept card payments",
    badge: "Card payments",
    line1: "How do you accept card",
    line2: "payments in Mongolia?",
    answer:
      "Wire's payment page lets buyers pay with Visa, Mastercard and domestic cards. Activate the PayLink card payment channel in your dashboard and switch it on for your project: a pay-by-card option then appears on your payment links and checkout, and card payments are reported in the same dashboard as every other channel.",
    stepsTitle: "Turning on card payments",
    steps: [
      {
        title: "Sign up and verify once",
        body: "Sign in at app.wire.mn and verify the owner's phone and DAN (state e-ID).",
      },
      {
        title: "Choose the card payment channel",
        body: "In the Connections section of the dashboard, choose the card payment channel and submit your registration details, address and settlement account.",
      },
      {
        title: "Review and electronic agreement",
        body: "Once the request is approved, sign that channel's agreement electronically with your DAN-verified details. As soon as the agreement is signed, the connection goes live.",
      },
      {
        title: "Switch it on for your project",
        body: "Each project switches on the connections it uses. Once it is on, cards are offered on that project's links, checkout and API payments.",
      },
    ],
    faqs: [
      {
        q: "Which cards can buyers pay with?",
        a: "Visa, Mastercard and domestic cards.",
      },
      {
        q: "Can I offer cards and QR together?",
        a: "Yes. Every connection switched on for the project appears on one payment page, and the buyer picks what suits them.",
      },
      {
        q: "Do card payments need a separate agreement?",
        a: "Yes, but it all happens in the dashboard: you submit a request and, once it is approved, sign the agreement electronically with DAN. No paperwork and no office visit.",
      },
      {
        q: "What is the card fee?",
        a: "A fee applies only to successful transactions. The exact rate for the card payment channel is shown in the agreement terms when you activate the connection.",
      },
      { q: "When does the money reach my account?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "Features", href: "/features" },
      {
        label: "Activating an operator (docs)",
        href: `${DOCS_URL}/en/docs/guides/going-live`,
      },
      { label: "Getting started guide", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/qr-payments",
    label: "Add QR payments",
    badge: "QR payments",
    line1: "How do you add",
    line2: "QR payments?",
    answer:
      "Wire's payment page creates a QR code and bank-app deeplinks for every payment. On a computer the buyer scans the QR code with their phone; on a phone they open their bank app directly and pay. One connection accepts QR payments from Mongolia's payment operators.",
    stepsTitle: "Taking QR payments",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "Choose how to offer it",
        body: "The easiest way is a ready-made payment link: print or send its QR code. If you have a website or app, create the payment through the API and send the buyer to Wire's payment page.",
      },
      {
        title: "The buyer scans and pays",
        body: "The buyer scans the QR code with a bank or wallet app. On a phone, the deeplink opens the app directly.",
      },
      {
        title: "See the payment arrive",
        body: "The transaction appears in the dashboard in real time, and you are notified by email and webhook.",
      },
    ],
    faqs: [
      {
        q: "Which apps can scan the QR code?",
        a: "The bank and e-wallet apps supported by the operator you activated.",
      },
      {
        q: "Can I put a printed QR code at the counter?",
        a: "Yes. You can print a payment link's QR code. With an open-amount link, the buyer enters the amount.",
      },
      {
        q: "How long is a QR code for an online order valid?",
        a: "A payment created through the API is valid for 10 minutes by default. If it is not paid, it is canceled automatically.",
      },
      {
        q: "Can I use it inside a mobile app?",
        a: "Yes. Create the payment on your server with the REST API. Checkout SDKs for JavaScript and iOS are available.",
      },
      { q: "What is the fee?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Payment links", href: "/links" },
      {
        label: "Hosted checkout (docs)",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "For developers", href: "/developers" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-gateway",
    label: "What is a payment gateway",
    badge: "Explainer",
    line1: "What is a",
    line2: "payment gateway?",
    answer:
      "A payment gateway is the layer that connects your business to payment operators. Instead of building a separate technical connection to each operator, you connect to Wire once and accept bank-app, e-wallet, QR, card and installment payments through one API and one dashboard.",
    stepsTitle: "How a payment flows",
    steps: [
      {
        title: "You create a payment",
        body: "Create a payment with a payment link, or through the API with the amount in tögrög (whole numbers).",
      },
      {
        title: "The buyer picks a channel",
        body: "Wire's payment page shows every channel switched on for your project in one place.",
      },
      {
        title: "The operator processes the payment",
        body: "The chosen operator processes the payment, and the revenue goes to the account you connected.",
      },
      {
        title: "Wire confirms the status",
        body: "Three layers of confirmation — the operator's notification, active checks and daily reconciliation — make sure no payment gets lost. The result reaches you through the dashboard, email and webhook.",
      },
    ],
    points: {
      title: "Compared with connecting to each operator separately",
      items: [
        "One API, one SDK — no need to learn each operator's different connection",
        "One dashboard — transactions and reports from every channel in one place",
        "One webhook — notifications from every channel in one format, signed",
        "No code changes to add a channel — just switch it on in the dashboard",
      ],
    },
    faqs: [
      {
        q: "Which payments does Wire accept?",
        a: "QR code and bank apps (QPay), cards (PayLink), e-wallets (Toki, MonPay) and installments (StorePay, Pocket Zero) — the channels of the Mongolian payment operators you connect.",
      },
      {
        q: "Do I need an agreement with each operator?",
        a: "For QPay and PayLink, you sign the agreement electronically with DAN (state e-ID) inside the dashboard. For Toki, MonPay, StorePay and Pocket Zero, you use your own agreement with the operator. Either way there is only one technical connection — Wire.",
      },
      {
        q: "Who operates Wire?",
        a: "Buildry AI LLC.",
      },
      {
        q: "Is my data safe?",
        a: "Personal data is stored encrypted with AES-256 and not shared with third parties. Every webhook is signed, so you can verify each notification.",
      },
      { q: "What is the fee?", a: FEE_ANSWER },
    ],
    related: [
      { label: "Features", href: "/features" },
      { label: "For developers", href: "/developers" },
      { label: "Verification", href: "/verification" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/platform",
    label: "Payments for many merchants on a platform",
    badge: "Platform module",
    line1: "How do you take payments for",
    line2: "many merchants through one API?",
    answer:
      "A platform that serves many shops or businesses (a marketplace or SaaS) uses Wire's platform module to register its merchants through the API and create payments on their behalf. Each merchant is paid straight into its own account — the money builds up neither on the platform nor at Wire.",
    stepsTitle: "How a platform connects",
    steps: [
      {
        title: "Get a platform key",
        body: "Contact Wire and register your platform. Wire gives you a platform secret key — it is shown only once.",
      },
      {
        title: "Register merchants through the API",
        body: "Send each merchant's registration details (individual or organisation) through the API. The fields are the same as in dashboard registration.",
      },
      {
        title: "Wire reviews and approves",
        body: "Every request goes through Wire's review. An approved merchant can take payments into its own account. Track the status through the API.",
      },
      {
        title: "Create payments on the merchant's behalf",
        body: "With one key, create payments for any of your merchants and receive the results as signed webhooks.",
      },
    ],
    faqs: [
      {
        q: "Where does the money go?",
        a: "Straight into each merchant's own connected account. Neither the platform nor Wire holds the merchant's money.",
      },
      {
        q: "Can the payment be split to deduct a platform fee?",
        a: "No. Splitting payments and deducting fees are not available. The platform's terms are agreed with Wire separately.",
      },
      {
        q: "What if a merchant is already registered with Wire?",
        a: "Wire can merge it with the existing registration; in that case the merchant id you received keeps working.",
      },
      {
        q: "Does every merchant go through verification?",
        a: "You send the merchant's registration details through the API, and Wire reviews and approves them.",
      },
      {
        q: "How do I start?",
        a: `Write to ${CONTACT.email} about your platform.`,
      },
    ],
    related: [
      { label: "For developers", href: "/developers" },
      { label: "What is a payment gateway", href: "/guides/payment-gateway" },
    ],
    cta: { label: "Contact us", href: `mailto:${CONTACT.email}` },
  },
  {
    slug: "/payments-in-mongolia",
    label: "Accept payments in Mongolia",
    badge: "Guide",
    line1: "How to accept online",
    line2: "payments in Mongolia",
    answer:
      "Wire is a payment gateway for Mongolia. A business or individual seller in Mongolia signs up at app.wire.mn, verifies the owner's phone and DAN (state e-ID) once, activates the payment operators it wants, and then takes payments through hosted checkout, payment links or a REST API. Buyers pay with bank apps, e-wallets, QR, cards or buy-now-pay-later, and the money goes to the business's own account.",
    stepsTitle: "From sign-up to the first payment",
    steps: [
      {
        title: "Sign up and verify once",
        body: "Sign in at app.wire.mn and verify the owner's phone and DAN (state e-ID). It is done once, however many businesses or projects you open later.",
      },
      {
        title: "Activate an operator",
        body: "For QPay or PayLink, submit your business details and payout bank account in the dashboard; after review you sign the agreement electronically and the connection goes live. For Toki, MonPay, StorePay or Pocket Zero, enter the keys from your own contract with the operator.",
      },
      {
        title: "Create a project and API key",
        body: "Each project has its own sk_live secret key and one webhook endpoint. The key is shown once — store it in a password manager.",
      },
      {
        title: "Send buyers to checkout",
        body: "Create a PaymentIntent on your server, open a checkout session and redirect the buyer to the hosted page on pay.wire.mn, which shows the QR code, bank-app deeplinks and every channel you switched on.",
      },
      {
        title: "Confirm with a webhook",
        body: "Your server receives payment_intent.succeeded, signed with HMAC-SHA256. Verify the signature, then fulfil the order.",
      },
    ],
    faqs: [
      {
        q: "Which payment methods can buyers use?",
        a: "QR and bank apps (QPay), cards — Visa, Mastercard and domestic cards (PayLink), e-wallets (Toki, MonPay) and buy-now-pay-later (StorePay, Pocket Zero). QPay and PayLink are connected through Wire; the others with your own operator contract and keys, entered in the dashboard.",
      },
      {
        q: "What currency are amounts in?",
        a: "Mongolian tögrög (MNT), as whole numbers — MNT has no minor unit.",
      },
      {
        q: "Which languages have SDKs?",
        a: "Go, Python, Node.js, PHP, Ruby and .NET on the server, plus checkout SDKs for JavaScript and iOS. The API is described by an OpenAPI 3.1 spec.",
      },
      {
        q: "What does it cost?",
        a: "Sign-up, connecting accounts and the dashboard are free and there is no monthly fee. A fee applies only to successful transactions, starting from 1% depending on the payment channel; the exact rate is shown when you activate it.",
      },
      {
        q: "Can I take payments without a website?",
        a: "Yes. Create a payment link in the dashboard and share it in chat, social posts or email, or print its QR code.",
      },
      {
        q: "Who operates Wire?",
        a: "Buildry AI LLC.",
      },
    ],
    related: [
      { label: "Wire in English", href: "/" },
      { label: "Developer docs (English)", href: `${DOCS_URL}/en/docs` },
      { label: "Quickstart", href: `${DOCS_URL}/en/docs/quickstart` },
    ],
    cta: { label: "Get started", href: DASHBOARD_URL },
  },
];
