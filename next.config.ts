import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Content-Security-Policy for the landing surface (GA4, no auth).
// See docs/superpowers/specs/2026-06-06-csp-per-app-design.md.
// 'unsafe-inline' keeps static rendering; COEP intentionally omitted.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // Sentry session-replay compression runs in a blob-URL web worker.
  "worker-src 'self' blob:",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "img-src 'self' data: https://www.google-analytics.com",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Own repo since the 2026-11-01 split: trace from the app root.
  outputFileTracingRoot: import.meta.dirname,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

// tunnelRoute proxies Sentry events through same-origin /monitoring, so the CSP
// connect-src stays 'self' — no Sentry ingest domain is added.
export default withSentryConfig(nextConfig, {
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
