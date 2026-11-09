import type { Metadata } from "next";
import { JetBrains_Mono, Comfortaa } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics";
import { HTML_LANG, LOCALES, isLocale } from "@/i18n/locales";
import {
  HOME_DESCRIPTION as DESCRIPTION,
  HOME_TITLE as TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  variable: "--font-comfortaa",
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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // Lets next-intl read the locale without request headers (static pages).
  setRequestLocale(locale);
  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${comfortaa.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
