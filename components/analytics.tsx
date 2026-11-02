import Script from "next/script";

// GA4 measurement id (public by design — embedded in the client bundle).
const GA_ID = "G-3V73ZBNYLG";

/** GoogleAnalytics loads gtag.js after hydration on the public marketing site. */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
