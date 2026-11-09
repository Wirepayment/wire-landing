import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

// Pages that render outside [locale] (the 404) still resolve the root
// opengraph-image against the real site.
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

// The real root layout is app/[locale]/layout.tsx (it owns <html lang>).
// This pass-through exists because app/not-found.tsx needs a layout above it.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
