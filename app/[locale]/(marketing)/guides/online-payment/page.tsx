import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guides/online-payment");

export default function Page() {
  return <GuidePage path="/guides/online-payment" />;
}
