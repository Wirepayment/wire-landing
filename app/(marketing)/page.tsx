import { Hero } from "@/components/home/hero";
import { GetStarted } from "@/components/home/get-started";
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

export const metadata = pageMetadata("/");

/** Home — the "clear sky" storyboard (billow-style reference): centered
 *  serif hero over a glowing cloud + dashboard screenshot, the five-minute
 *  start trio, the platform feature blocks, two closing panels, FAQ and the
 *  cloud-band CTA. */
export default function LandingPage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <GetStarted />
      <FeatureBlocks />
      <RoutingCard />
      <ConsolidationCard />
      <Faq />
      <FinalCta />
    </>
  );
}
