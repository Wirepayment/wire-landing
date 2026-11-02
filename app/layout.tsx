import type { Metadata } from "next";
import {
  Playfair_Display,
  Rubik,
  JetBrains_Mono,
  Comfortaa,
} from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics";
import {
  HOME_DESCRIPTION as DESCRIPTION,
  HOME_TITLE as TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif-display",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  variable: "--font-comfortaa",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · WireMN" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "WireMN",
    "Wire",
    "wire.mn",
    "payment gateway",
    "Монгол төлбөр",
    "цахим хэтэвч",
    "BNPL",
    "payment API",
    "merchant",
    "Buildry",
  ],
  authors: [{ name: "Buildry" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mn"
      className={`${playfair.variable} ${rubik.variable} ${jetbrains.variable} ${comfortaa.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
      <GoogleAnalytics />
    </html>
  );
}
