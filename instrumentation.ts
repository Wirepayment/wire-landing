import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? "production",
    release: process.env.NEXT_PUBLIC_GIT_SHA,
    tracesSampleRate: 0.1,
    // Sentry v11 dropped sendDefaultPii for dataCollection, whose defaults
    // collect user info, cookies, headers, bodies and query params. Wire sends
    // none of it: session tokens ride in cookies and bodies carry payment data
    // (CLAUDE.md rule #2). test/sentry-data-collection.test.ts holds the line.
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
      genAI: { inputs: false, outputs: false },
      mcp: { inputs: false, outputs: false },
      databaseQueryData: false,
      queues: false,
      stackFrameVariables: false,
    },
    initialScope: { tags: { app: "landing" } },
  });
}

export const onRequestError = Sentry.captureRequestError;
