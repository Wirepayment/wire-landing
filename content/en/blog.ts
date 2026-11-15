import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// English blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
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
