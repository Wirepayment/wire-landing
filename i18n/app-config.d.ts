import type { Locale } from "./locales";
import type { Messages } from "./request";

// Type-safe locales and message keys: a missing key fails typecheck.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
