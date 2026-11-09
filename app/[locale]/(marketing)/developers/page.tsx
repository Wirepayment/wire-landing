import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  Code2,
  KeyRound,
  Layers,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hl } from "@/components/hl";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { ApiMock } from "@/components/home/feature-blocks";
import { FinalCta } from "@/components/home/final-cta";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata("/developers");

const devFeatures = [
  {
    icon: Code2,
    title: "REST API",
    desc: "PaymentIntent / Charge / Refund — таамаглахуйц resource загвар, OpenAPI 3.1.",
  },
  {
    icon: Boxes,
    title: "8 SDK",
    desc: "Go · Python · Node · PHP · Ruby · .NET + checkout JS/iOS — registry-д амьд.",
  },
  {
    icon: Webhook,
    title: "Webhook with signature",
    desc: "HMAC-SHA256, retry + dead-letter, тогтмол egress IP whitelist.",
  },
  {
    icon: Layers,
    title: "Платформ / reseller",
    desc: "Нэг түлхүүрээр олон merchant холболт хийж, нэг сувгаар төлбөр цуглуул.",
  },
  {
    icon: KeyRound,
    title: "Idempotency",
    desc: "Аюулгүй давталт — Idempotency-Key-ээр давхар цэнэглэлтээс сэргийлнэ.",
  },
];

/** Developers — the build surface: REST API, SDKs, webhooks, platform mode. */
export default function DevelopersPage() {
  return (
    <>
      <PageIntro
        badge="10 минутад эхний төлбөр"
        line1="Хөгжүүлэгчдэд"
        line2="зориулав."
        lead={
          <>
            Ойлгомжтой REST API, 6 хэл дээрх бэлэн SDK (Go, Python, Node, PHP,
            Ruby, .NET), төлбөр бүрийг автоматаар мэдэгдэх webhook —{" "}
            <Hl>холболтоо хэдхэн минутад эхлүүлнэ</Hl>.
          </>
        }
      >
        <Button asChild size="lg">
          <a href={DOCS_URL}>
            Баримт бичиг үзэх
            <ArrowRight />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={DASHBOARD_URL}>API key авах</a>
        </Button>
      </PageIntro>

      {/* one request → checkout */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <Reveal>
            <ApiMock />
          </Reveal>
        </div>
      </section>

      {/* build surface grid */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge="API · SDK · платформ"
            line1="Хүчтэй API."
            line2="Хялбар интеграц."
            lead="Цэвэр REST API, бэлэн SDK, signature бүхий webhook. Платформ нэг түлхүүрээр олон merchant холболт хийж, нэг сувгаар төлбөр цуглуулах боломжтой."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {devFeatures.map((f, i) => (
              <Reveal
                key={f.title}
                delay={(i % 3) * 90}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)] transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.35)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <f.icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
