import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/usePathname: hrefs are written without a locale prefix and
// gain /en, /zh or /ko on those pages.
export const { Link, usePathname, getPathname } = createNavigation(routing);
