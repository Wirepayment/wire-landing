import type {
  ConnectorCopy,
  ConnectorId,
  ConnectorMode,
  ConnectorModeCopy,
} from "@/lib/connectors";

// English connector copy, translated from content/mn/connectors.ts (the
// source). Brand names stay in lib/connectors.ts and are never translated.
export const CONNECTOR_COPY: Record<ConnectorId, ConnectorCopy> = {
  qpay: {
    category: "QR code · bank apps",
    desc: "The buyer scans the QR code with a bank app, or on a phone opens the bank app directly and pays.",
  },
  paylink: {
    category: "Card payments",
    desc: "Pay with Visa, Mastercard or a domestic card.",
  },
  storepay: {
    category: "Installments · credit",
    desc: "The buyer splits a large purchase into installments.",
  },
  toki: {
    category: "E-wallet",
    desc: "The buyer scans a QR code, or a payment request goes to the Toki app by the buyer's phone number.",
  },
  monpay: {
    category: "E-wallet",
    desc: "Pay in the MonPay app by QR code or deeplink.",
  },
  pocket: {
    category: "Installments",
    desc: "The buyer scans a QR code in the Pocket app and pays in installments.",
  },
};

export const CONNECTOR_MODES: Record<ConnectorMode, ConnectorModeCopy> = {
  wire: {
    label: "Through Wire",
    short: "Through Wire",
    hint: "Submit your business details and sign Wire's agreement electronically. The connection goes live once the review approves it.",
  },
  byo: {
    label: "Your own agreement (BYO)",
    short: "BYO",
    hint: "Connect from the dashboard with your own agreement and keys from the payment operator. The money goes straight to your operator account; Wire never holds it.",
  },
};
