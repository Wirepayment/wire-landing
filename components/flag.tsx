import Image from "next/image";
import type { Locale } from "@/i18n/locales";

/** Flag — the round flag for a language (public/flags/<locale>.png, kie.ai,
 *  96 px). Decorative: the language's own name always sits next to it. The
 *  faint ring keeps the Korean flag's light field from melting into the page. */
export function Flag({
  locale,
  className = "size-4",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <Image
      src={`/flags/${locale}.png`}
      alt=""
      aria-hidden
      width={96}
      height={96}
      className={`${className} shrink-0 rounded-full ring-1 ring-black/10`}
    />
  );
}
