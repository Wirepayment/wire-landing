import type { MetadataRoute } from "next";
import { ALLOWED_CRAWLERS } from "@/lib/crawlers";
import { SITE_URL } from "@/lib/seo";

/** robots.txt — everything on the marketing site is public. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...ALLOWED_CRAWLERS], allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
