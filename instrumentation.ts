import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? "production",
    release: process.env.NEXT_PUBLIC_GIT_SHA,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
    initialScope: { tags: { app: "landing" } },
  });
}

export const onRequestError = Sentry.captureRequestError;
