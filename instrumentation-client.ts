import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? "production",
    release: process.env.NEXT_PUBLIC_GIT_SHA,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
    // Drop mobile in-app browser (Facebook/Instagram/WeChat WebView) injected-script
    // noise — these throw inside the host app's scripts, not ours, and aren't actionable.
    ignoreErrors: [
      /webkit\.messageHandlers/i,
      /messageHandlers\.navigation/i,
      /Java object is gone/i,
      /enableButtonsClickedMetaDataLogging/i,
      "ResizeObserver loop completed with undelivered notifications",
      "ResizeObserver loop limit exceeded",
    ],
    // Drop errors thrown by browser extensions. They run inside our page but
    // are not our code, and the SDK strips every origin to `app:///` before the
    // event leaves the browser, so by the time an issue reaches Sentry it is
    // indistinguishable from ours (2026-09: `executors/200.js` "M_ID" TypeError
    // from one extension was ~90 % of frontend volume). denyUrls is evaluated
    // before that rewrite, so the scheme patterns still match here.
    denyUrls: [
      /^chrome-extension:\/\//i,
      /^moz-extension:\/\//i,
      /^safari(-web)?-extension:\/\//i,
      /^ms-browser-extension:\/\//i,
      // Belt and braces for the same file when injected from an http(s) host:
      // nothing of ours lives outside `/_next/`.
      /\/executors\/\d+\.js$/i,
    ],
    initialScope: { tags: { app: "landing" } },
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
