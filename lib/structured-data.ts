import { COMPANY, CONTACT } from "@/lib/company";
import { FAQS } from "@/lib/faq";
import type { Guide } from "@/lib/guides";
import {
  HOME_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  publicPage,
  type PublicPath,
} from "@/lib/seo";

// schema.org graph for the home page. Facts only — no ratings, reviews or
// prices that the page itself does not state (Google treats invented ones as
// spam, and AI answers would repeat them).

const ORG_ID = `${SITE_URL}/#organization`;

export function homeJsonLd() {
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
        inLanguage: "mn",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Wire — payment gateway",
        serviceType: "Payment gateway",
        description: HOME_DESCRIPTION,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Mongolia" },
        url: SITE_URL,
        termsOfService: `${SITE_URL}/terms`,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** An answer page: the page itself, where it sits, and its visible FAQ. */
export function guideJsonLd(g: Guide) {
  const page = publicPage(g.path as PublicPath);
  const url = absoluteUrl(g.path);
  const en = g.lang === "en";
  const crumbs = [
    { name: en ? "Home" : "Нүүр", url: absoluteUrl(en ? "/en" : "/") },
    ...(g.path === "/en" ? [] : [{ name: g.label, url }]),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        description: page.description,
        inLanguage: g.lang,
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
