import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guides/payment-gateway");

export default function Page() {
  return <GuidePage path="/guides/payment-gateway" />;
}
