import type { Metadata } from "next";
import { JetBrains_Mono, Comfortaa } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  isLocale,
  type Locale,
} from "@/i18n/locales";
import { OG_LOCALE, SITE_NAME, SITE_URL, pagesFor, siteFor } from "@/lib/seo";

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

/** Defaults for every page in this language; each page overrides title,
 *  description, URL and openGraph through pageMetadata(). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const { title, description } = pagesFor(locale)["/"];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s · WireMN" },
    description,
    applicationName: SITE_NAME,
    keywords: siteFor(locale).keywords,
    authors: [{ name: "Buildry" }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
  // Client components read only these namespaces (NavLinks, MobileNav);
  // everything else renders on the server and stays out of the page payload.
  const { common, nav } = await getMessages();
  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${comfortaa.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider messages={{ common, nav }}>
          {children}
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
