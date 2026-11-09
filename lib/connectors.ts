import type { Locale } from "@/i18n/locales";
import * as mn from "@/content/mn/connectors";
import * as en from "@/content/en/connectors";
import * as zh from "@/content/zh/connectors";
import * as ko from "@/content/ko/connectors";

// The payment connectors live in production and open to every merchant. One
// source for the home grid, the features page, the FAQ and llms.txt, so the
// list cannot drift between them. Their copy per language (category, one
// line, connection modes) lives in content/<locale>/connectors.ts.
//
// Owner decision 2026-11-08: wire.mn names its connectors and shows their
// logos (an exception to the operator-agnostic rule, for this site only).
// Brand names are the same in every language and never translated.
// Competitor brands stay forbidden — test/brand-names.ts.

/** How a merchant connects: through Wire (business details, Wire's agreement,
 *  review) or with its own operator contract and keys (BYO). */
export type ConnectorMode = "wire" | "byo";

/** The payment-method group a connector belongs to on the features page. */
export type ConnectorGroup = "qr" | "card" | "wallet" | "installment";

export type ConnectorId =
  "qpay" | "paylink" | "storepay" | "toki" | "monpay" | "pocket";

export interface Connector {
  id: ConnectorId;
  name: string;
  group: ConnectorGroup;
  mode: ConnectorMode;
}

/** A connector's copy in one language. */
export interface ConnectorCopy {
  category: string;
  desc: string;
}

/** A connection mode's copy in one language. */
export interface ConnectorModeCopy {
  label: string;
  short: string;
  hint: string;
}

export type LocalizedConnector = Connector & ConnectorCopy;

export const CONNECTORS: readonly Connector[] = [
  { id: "qpay", name: "QPay", group: "qr", mode: "wire" },
  { id: "paylink", name: "PayLink", group: "card", mode: "wire" },
  { id: "storepay", name: "StorePay", group: "installment", mode: "byo" },
  { id: "toki", name: "Toki", group: "wallet", mode: "byo" },
  { id: "monpay", name: "MonPay", group: "wallet", mode: "byo" },
  { id: "pocket", name: "Pocket Zero", group: "installment", mode: "byo" },
];

const COPY: Record<
  Locale,
  {
    CONNECTOR_COPY: Record<ConnectorId, ConnectorCopy>;
    CONNECTOR_MODES: Record<ConnectorMode, ConnectorModeCopy>;
  }
> = { mn, en, zh, ko };

/** The connectors with their copy in one language. */
export function connectorsFor(locale: Locale): LocalizedConnector[] {
  const copy = COPY[locale].CONNECTOR_COPY;
  return CONNECTORS.map((c) => ({ ...c, ...copy[c.id] }));
}

/** The connection modes' copy in one language. */
export function connectorModesFor(
  locale: Locale,
): Record<ConnectorMode, ConnectorModeCopy> {
  return COPY[locale].CONNECTOR_MODES;
}

/** Path of a connector's logo under public/. */
export const connectorLogo = (id: string) => `/operators/${id}.png`;
