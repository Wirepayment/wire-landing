import { setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";

export const metadata = pageMetadata("/guides/qr-payments");

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GuidePage path="/guides/qr-payments" />;
}
