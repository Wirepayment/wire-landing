import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/guides/card-payments");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GuidePage locale={locale} slug="/guides/card-payments" />;
}
