import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Hl } from "@/components/hl";
import { LogoMark } from "@/components/logo";
import { DASHBOARD_URL } from "@/lib/links";

/* FinalCta — the closing cloud band: app-icon tile, big serif line, the
 * capability checklist with "Удахгүй / Roadmap" pills, one blue CTA. */

type Item = { label: string; soon?: string };

const COLUMNS: Item[][] = [
  [
    { label: "Төлбөрийн линк" },
    { label: "Реал цагийн dashboard" },
    { label: "QR төлбөр" },
    { label: "Олон төсөл, олон данс" },
  ],
  [
    { label: "REST API + SDK" },
    { label: "Webhook + signature" },
    { label: "Idempotency" },
    { label: "Платформ модуль" },
  ],
  [
    { label: "Авто-routing", soon: "Удахгүй" },
    { label: "Картын төлбөр" },
    { label: "Тайлан экспорт" },
    { label: "Smart insights", soon: "Roadmap" },
  ],
];

export function FinalCta() {
  return (
    <section className="bg-[var(--color-background)] px-3 pb-4 sm:px-5">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[32px]">
        <Image
          src="/clouds/cta-clouds.jpg"
          alt=""
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/80" />

        <div className="relative mx-auto w-full max-w-4xl px-5 py-20 text-center sm:py-28">
          <Reveal className="flex justify-center">
            <span className="flex size-16 items-center justify-center rounded-[20px] border border-white/70 bg-white/90 shadow-[0_12px_36px_-8px_rgba(16,185,129,0.35)] backdrop-blur">
              <LogoMark className="size-9" />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display mt-7 text-[clamp(36px,5.5vw,64px)]">
              Бүх төлбөрөө нэг гарцаар.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              Бүртгэл үнэгүй. Дансаа холбоод л төлбөр хүлээн авч эхэлнэ —{" "}
              <Hl>шимтгэл зөвхөн амжилттай гүйлгээнээс</Hl>.
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-12">
            <div className="grid gap-x-8 gap-y-3 text-left sm:grid-cols-3">
              {COLUMNS.map((col, ci) => (
                <ul key={ci} className="space-y-3">
                  {col.map((it) => (
                    <li key={it.label} className="flex items-center gap-2.5">
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                          it.soon
                            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                            : "bg-[var(--color-primary)] text-white"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3.5} />
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          it.soon
                            ? "text-[var(--color-faint)]"
                            : "text-[var(--color-foreground)]"
                        }`}
                      >
                        {it.label}
                      </span>
                      {it.soon ? (
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-muted)] shadow-[0_1px_2px_rgba(10,10,10,0.08)]">
                          {it.soon}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240} className="mt-12">
            <Button asChild size="lg">
              <a href={DASHBOARD_URL}>
                Эхлэх
                <ArrowRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
