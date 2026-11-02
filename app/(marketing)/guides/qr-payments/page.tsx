import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guides/qr-payments");

export default function Page() {
  return <GuidePage path="/guides/qr-payments" />;
}
