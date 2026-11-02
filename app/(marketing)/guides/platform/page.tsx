import { GuidePage } from "@/components/guide-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/guides/platform");

export default function Page() {
  return <GuidePage path="/guides/platform" />;
}
