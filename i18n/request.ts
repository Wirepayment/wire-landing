import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./locales";
import { routing } from "./routing";
import mn from "@/messages/mn.json";

export type Messages = typeof mn;

// TEMP until translations: en, zh and ko show the Mongolian copy.
const MESSAGES: Record<Locale, Messages> = { mn, en: mn, zh: mn, ko: mn };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return { locale, messages: MESSAGES[locale] };
});
