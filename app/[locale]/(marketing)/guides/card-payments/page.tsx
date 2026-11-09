import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guides/card-payments");

export default function Page() {
  return <GuidePage path="/guides/card-payments" />;
}
