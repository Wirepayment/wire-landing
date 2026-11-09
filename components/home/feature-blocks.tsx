import { ArrowRight, Check, Copy, Link2, QrCode } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { RICH } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";

/* FeatureBlocks — the platform story: a big centered serif intro, then
 * three "heading left / copy right / full-width screen" blocks exactly in
 * the reference's rhythm (payment links, the API, live notifications). */

function BlockHead({
  line1,
  line2,
  copy,
}: {
  line1: string;
  line2: string;
  copy: React.ReactNode;
}) {
  return (
    <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_1fr]">
      <Reveal>
        <h3 className="display text-[clamp(30px,4.2vw,48px)]">
          {line1}
          <br />
          <span className="display-dim">{line2}</span>
        </h3>
      </Reveal>
      <Reveal delay={100} className="lg:justify-self-end lg:pb-2">
        <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
          {copy}
        </p>
      </Reveal>
    </div>
  );
}

/* ── mock: payment-link builder ── */
export async function LinkMock() {
  const t = await getTranslations("home.featureBlocks.linkMock");
  return (
    <div className="screen-card grid gap-0 overflow-hidden md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-3 border-b border-[var(--color-border)] p-6 md:border-r md:border-b-0">
        <p className="text-[12px] font-bold">{t("title")}</p>
        <div>
          <p className="text-[10px] text-[var(--color-faint)]">{t("name")}</p>
          <div className="mt-1 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-[12px]">
            {t("nameValue")}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-[var(--color-faint)]">{t("amount")}</p>
          <div className="tabular mt-1 rounded-lg border border-[var(--color-primary)] bg-white px-3 py-2 text-[12px] font-semibold ring-2 ring-[var(--color-primary-soft)]">
            ₮25,000
          </div>
        </div>
        <div className="pill-glow w-fit rounded-full bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] px-4 py-2 text-[11px] font-semibold text-white">
          {t("create")}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 bg-[var(--color-surface)]/50 p-6">
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white py-1.5 pr-1.5 pl-4 shadow-[0_2px_8px_rgba(10,10,10,0.06)]">
          <Link2 className="size-3.5 text-[var(--color-primary)]" />
          <span className="tabular text-[12px] font-semibold">
            wire.mn/l/8kfq2
          </span>
          <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)]">
            <Copy className="size-3" />
            {t("copy")}
          </span>
        </div>
        <div className="flex size-28 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_24px_-12px_rgba(10,10,10,0.2)]">
          <QrCode
            className="size-16 text-[var(--color-foreground)]"
            strokeWidth={1.2}
          />
        </div>
        <p className="text-[10px] text-[var(--color-faint)]">{t("share")}</p>
      </div>
    </div>
  );
}

/* ── mock: one API, checkout ── */
const CODE = [
  { t: "POST /v1/payment_intents", c: "text-emerald-300" },
  { t: "{", c: "text-white/70" },
  { t: '  "amount": 49900,', c: "text-white/70" },
  { t: '  "currency": "MNT",', c: "text-white/70" },
  { t: '  "description": "ORD-1024"', c: "text-white/70" },
  { t: "}", c: "text-white/70" },
  { t: "→ 200 OK", c: "text-emerald-300" },
  { t: '  "status": "requires_payment_method"', c: "text-white/50" },
] as const;

export async function ApiMock() {
  const t = await getTranslations("home.featureBlocks.apiMock");
  return (
    <div className="screen-card grid gap-0 overflow-hidden md:grid-cols-[1.2fr_1fr]">
      <div className="bg-[var(--color-ink)] p-6">
        <div className="flex items-center gap-1.5 pb-4">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <pre className="tabular overflow-x-auto text-[11.5px] leading-6">
          {CODE.map((l) => (
            <div key={l.t} className={l.c}>
              {l.t}
            </div>
          ))}
        </pre>
      </div>
      <div className="flex items-center justify-center bg-[var(--color-surface)]/50 p-6">
        <div className="w-full max-w-[240px] rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[0_12px_32px_-16px_rgba(10,10,10,0.25)]">
          <p className="text-[10px] text-[var(--color-faint)]">
            {t("amountDue")}
          </p>
          <p className="tabular text-[22px] font-bold">₮49,900</p>
          <div className="mt-3 space-y-1.5">
            {(["bankApp", "wallet", "qr"] as const).map((c, i) => (
              <div
                key={c}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[11px] font-medium ${
                  i === 0
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]/60 text-[var(--color-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-muted)]"
                }`}
              >
                {t(`channels.${c}`)}
                <span
                  className={`flex size-3.5 items-center justify-center rounded-full border ${
                    i === 0
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border-strong)]"
                  }`}
                >
                  {i === 0 ? (
                    <Check className="size-2" strokeWidth={4} />
                  ) : null}
                </span>
              </div>
            ))}
          </div>
          <div className="pill-glow mt-3 rounded-full bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] py-2 text-center text-[11px] font-semibold text-white">
            {t("pay")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── mock: live webhook feed ── */
const EVENTS = [
  { e: "payment.succeeded", ref: "ORD-1024", t: "14:05:12", ok: true },
  { e: "payment.succeeded", ref: "ORD-1023", t: "13:47:03", ok: true },
  { e: "payment.expired", ref: "ORD-1019", t: "12:30:44", ok: false },
] as const;

async function WebhookMock() {
  const t = await getTranslations("home.featureBlocks.webhookMock");
  return (
    <div className="screen-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
        <p className="text-[12px] font-bold">{t("title")}</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          {t("verified")}
        </span>
      </div>
      {EVENTS.map((ev) => (
        <div
          key={ev.ref}
          className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3 last:border-b-0"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`size-2 shrink-0 rounded-full ${ev.ok ? "bg-emerald-500" : "bg-amber-400"}`}
            />
            <span className="tabular truncate text-[12px] font-semibold">
              {ev.e}
            </span>
            <span className="tabular hidden text-[11px] text-[var(--color-faint)] sm:inline">
              {ev.ref}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="tabular text-[10px] text-[var(--color-faint)]">
              {ev.t}
            </span>
            <span className="rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)]">
              {t("delivered")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function FeatureBlocks() {
  const t = await getTranslations("home.featureBlocks");
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <SectionHeading
          badge={t("badge")}
          line1={t("line1")}
          line2={t("line2")}
          lead={t.rich("lead", RICH)}
        />
        <Reveal delay={150} className="mt-8 text-center">
          <Button asChild size="lg">
            <a href={DASHBOARD_URL}>
              {t("start")}
              <ArrowRight />
            </a>
          </Button>
        </Reveal>

        <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
          <div>
            <BlockHead
              line1={t("links.line1")}
              line2={t("links.line2")}
              copy={t.rich("links.copy", RICH)}
            />
            <Reveal delay={120} className="mt-8">
              <LinkMock />
            </Reveal>
          </div>

          <div>
            <BlockHead
              line1={t("api.line1")}
              line2={t("api.line2")}
              copy={t.rich("api.copy", RICH)}
            />
            <Reveal delay={120} className="mt-8">
              <ApiMock />
            </Reveal>
            <Reveal delay={200} className="mt-5">
              <a
                href={DOCS_URL}
                className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-75"
              >
                {t("docsLink")}
              </a>
            </Reveal>
          </div>

          <div>
            <BlockHead
              line1={t("webhooks.line1")}
              line2={t("webhooks.line2")}
              copy={t.rich("webhooks.copy", RICH)}
            />
            <Reveal delay={120} className="mt-8">
              <WebhookMock />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
