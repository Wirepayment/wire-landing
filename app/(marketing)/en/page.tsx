import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/en");

export default function Page() {
  return <GuidePage path="/en" />;
}
