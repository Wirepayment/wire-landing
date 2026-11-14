import { COMPANY, CONTACT } from "@/lib/company";
import { faqsFor } from "@/lib/faq";
import type { Guide } from "@/lib/guides";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  localizedPath,
  pagesFor,
  publicPage,
  siteFor,
  type PublicPath,
} from "@/lib/seo";
import { HTML_LANG, LOCALES, type Locale } from "@/i18n/locales";

// schema.org graph for the home page, in the page's language. Facts only — no ratings, reviews or
// prices that the page itself does not state (Google treats invented ones as
// spam, and AI answers would repeat them).

const ORG_ID = `${SITE_URL}/#organization`;

export function homeJsonLd(locale: Locale) {
  const home = pagesFor(locale)["/"];
  const url = absoluteUrl(localizedPath(locale, "/"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Wire",
        alternateName: [SITE_NAME, "wire.mn"],
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        areaServed: { "@type": "Country", name: "Mongolia" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT.email,
          telephone: CONTACT.phone,
          areaServed: "MN",
          availableLanguage: ["mn", "en"],
        },
        parentOrganization: {
          "@type": "Organization",
          name: COMPANY.nameEn,
          alternateName: COMPANY.nameMn,
          url: "https://buildry.cloud",
          sameAs: [CONTACT.facebook],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: LOCALES.map((l) => HTML_LANG[l]),
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Wire — payment gateway",
        serviceType: "Payment gateway",
        description: home.description,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Mongolia" },
        url,
        termsOfService: absoluteUrl(localizedPath(locale, "/terms")),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: HTML_LANG[locale],
        mainEntity: faqsFor(locale).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** An answer page: the page itself, where it sits, and its visible FAQ. */
export function guideJsonLd(locale: Locale, g: Guide) {
  const page = publicPage(g.slug);
  const copy = pagesFor(locale)[g.slug];
  const url = absoluteUrl(localizedPath(locale, g.slug));
  const crumbs = [
    {
      name: siteFor(locale).homeCrumb,
      url: absoluteUrl(localizedPath(locale, "/")),
    },
    { name: g.label, url },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: HTML_LANG[locale],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORG_ID },
        dateModified: page.updated,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** A plain public page (features, developers, links, the guide, verification,
 *  terms, status): the page itself and where it sits under the home page.
 *  No FAQPage here — these pages show no FAQ, and structured data only
 *  restates what a visitor can read. */
export function pageJsonLd(locale: Locale, path: PublicPath) {
  const page = publicPage(path);
  const copy = pagesFor(locale)[path];
  const url = absoluteUrl(localizedPath(locale, path));
  const crumbs = [
    {
      name: siteFor(locale).homeCrumb,
      url: absoluteUrl(localizedPath(locale, "/")),
    },
    { name: copy.title, url },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: HTML_LANG[locale],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORG_ID },
        dateModified: page.updated,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      },
    ],
  };
}
