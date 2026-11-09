import type { ReactNode } from "react";
import { Hl } from "@/components/hl";
import { UiLabel } from "@/components/ui-label";

/** RICH — the inline tags rich messages may use with `t.rich(key, RICH)`.
 *  Markup stays in the message, so a translator moves it with the words:
 *  `<hl>` mint highlight, `<ui>` on-screen label, `<b>`, `<em>`, `<code>`. */
export const RICH = {
  hl: (chunks: ReactNode) => <Hl>{chunks}</Hl>,
  ui: (chunks: ReactNode) => <UiLabel>{chunks}</UiLabel>,
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  code: (chunks: ReactNode) => <code>{chunks}</code>,
};
