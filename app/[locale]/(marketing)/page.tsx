import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { GetStarted } from "@/components/home/get-started";
import { Connectors } from "@/components/home/connectors";
import { FeatureBlocks } from "@/components/home/feature-blocks";
import {
  RoutingCard,
  ConsolidationCard,
} from "@/components/home/closing-cards";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/");
}

/** Home — the "clear sky" storyboard (billow-style reference): centered
 *  serif hero over a glowing cloud + dashboard screenshot, the five-minute
 *  start trio, the payment connectors grid, the platform feature blocks,
 *  two closing panels, FAQ and the cloud-band CTA. */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={homeJsonLd(locale)} />
      <Hero />
      <GetStarted />
      <Connectors />
      <FeatureBlocks />
      <RoutingCard />
      <ConsolidationCard />
      <Faq />
      <FinalCta />
    </>
  );
}
