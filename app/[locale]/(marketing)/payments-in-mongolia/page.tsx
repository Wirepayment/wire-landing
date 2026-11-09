import { setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";

export const metadata = pageMetadata("/en/payments-in-mongolia");

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GuidePage path="/en/payments-in-mongolia" />;
}
