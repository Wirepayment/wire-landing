import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Inline an empty PostCSS config so Vite doesn't try to load the app's
  // Tailwind v4 postcss.config.mjs (unparseable in this node-env test run).
  css: { postcss: {} },
  test: {
    environment: "node",
    // next-intl's ESM imports "next/server" bare, which Node's resolver
    // rejects (next has no exports map); let Vite resolve it instead.
    server: { deps: { inline: ["next-intl"] } },
  },
  resolve: { alias: { "@": path.resolve(import.meta.dirname, ".") } },
});
