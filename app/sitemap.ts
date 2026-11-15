import type { MetadataRoute } from "next";
import { blogSitemapEntries } from "@/lib/blog";
import { sitemapEntries } from "@/lib/seo";

/** sitemap.xml for the marketing pages (the only public, indexable surface on
 *  wire.mn — dashboard/admin/checkout are auth- or token-gated). The docs
 *  site publishes its own at docs.wire.mn/sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [...sitemapEntries(), ...blogSitemapEntries()];
}
