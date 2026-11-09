import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/logo";
import { pageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/company";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/status");
}

type Health = "operational" | "degraded" | "down";

interface Component {
  name: "api" | "dashboard" | "checkout" | "website";
  url: string;
  detail: string;
}

// Public surfaces to probe. Overridable via env for staging; defaults target
// production. A reachable response (even a redirect) counts as operational.
const COMPONENTS: Component[] = [
  {
    name: "api",
    url: process.env.STATUS_API_URL ?? "https://api.wire.mn/healthz",
    detail: "api.wire.mn",
  },
  {
    name: "dashboard",
    url: process.env.STATUS_DASHBOARD_URL ?? "https://app.wire.mn",
    detail: "app.wire.mn",
  },
  {
    name: "checkout",
    url: process.env.STATUS_CHECKOUT_URL ?? "https://pay.wire.mn",
    detail: "pay.wire.mn",
  },
  {
    name: "website",
    url: process.env.STATUS_LANDING_URL ?? "https://wire.mn",
    detail: "wire.mn",
  },
];

async function probe(url: string): Promise<{ health: Health; ms: number }> {
  const start = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
      signal: ctrl.signal,
    });
    const ms = Date.now() - start;
    // 2xx/3xx = reachable; 5xx = degraded.
    if (res.status >= 500) return { health: "degraded", ms };
    return { health: "operational", ms };
  } catch {
    return { health: "down", ms: Date.now() - start };
  } finally {
    clearTimeout(timer);
  }
}

const DOT: Record<Health, string> = {
  operational: "var(--color-success)",
  degraded: "var(--color-warning)",
  down: "var(--color-coral)",
};

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common, nav] = await Promise.all([
    getTranslations("status"),
    getTranslations("common"),
    getTranslations("nav"),
  ]);
  const components = await Promise.all(
    COMPONENTS.map(async (c) => ({ ...c, ...(await probe(c.url)) })),
  );

  const overall: Health = components.some((c) => c.health === "down")
    ? "down"
    : components.some((c) => c.health === "degraded")
      ? "degraded"
      : "operational";

  const overallText = t(`overall.${overall}`);

  const checkedAt = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Ulaanbaatar",
  })
    .format(new Date())
    .replace(",", "");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-[var(--color-border)]">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5">
          <Link href="/" aria-label={nav("homeAria")}>
            <Logo />
          </Link>
          <span className="text-sm text-[var(--color-muted)]">
            {common("status")}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10">
        <h1 className="display text-center text-[clamp(28px,4vw,40px)]">
          {t("heading")}
        </h1>
        <div
          className="mt-8 flex items-center gap-3 rounded-2xl border p-5"
          style={{
            borderColor:
              overall === "operational"
                ? "color-mix(in srgb, var(--color-success) 35%, transparent)"
                : "color-mix(in srgb, var(--color-warning) 35%, transparent)",
            background:
              overall === "operational"
                ? "var(--color-primary-soft)"
                : "color-mix(in srgb, var(--color-warning) 8%, transparent)",
          }}
        >
          <span
            className="size-3 shrink-0 rounded-full"
            style={{ background: DOT[overall] }}
          />
          <div>
            <p className="font-semibold">{overallText}</p>
            <p className="text-sm text-[var(--color-muted)]">
              {t("checked", { checkedAt })}
            </p>
          </div>
        </div>

        <ul className="screen-card mt-6 divide-y divide-[var(--color-border)] overflow-hidden">
          {components.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-3 px-5 py-4"
            >
              <div>
                <p className="font-medium">{t(`components.${c.name}`)}</p>
                <p className="tabular text-xs text-[var(--color-muted)]">
                  {c.detail}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {c.health === "operational" && (
                  <span className="tabular text-xs text-[var(--color-muted)]">
                    {c.ms}ms
                  </span>
                )}
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: DOT[c.health] }}
                />
                <span className="text-sm">{t(`health.${c.health}`)}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-[var(--color-faint)]">
          {t.rich("footer", {
            email: CONTACT.email,
            link: (chunks) => (
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </main>
    </div>
  );
}
