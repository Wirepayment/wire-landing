// Cross-app links. Landing (wire.mn) points to the dashboard app, which runs on
// its own domain (app.wire.mn). Configurable via env per environment.
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3001";

// Developer documentation (Fumadocs) runs on its own domain (docs.wire.mn).
// Defaults to the prod URL so no per-env build arg is required.
export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.wire.mn";
