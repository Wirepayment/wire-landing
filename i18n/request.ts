import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./locales";
import { routing } from "./routing";
import mn from "@/messages/mn.json";
import en from "@/messages/en.json";

export type Messages = typeof mn;

// TEMP until translations: zh and ko show the Mongolian copy.
const MESSAGES: Record<Locale, Messages> = { mn, en, zh: mn, ko: mn };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return { locale, messages: MESSAGES[locale] };
});
