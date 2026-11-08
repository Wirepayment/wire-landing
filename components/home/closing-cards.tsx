import Image from "next/image";
import {
  ArrowRight,
  Check,
  Coins,
  CreditCard,
  Landmark,
  QrCode,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hl } from "@/components/hl";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { DASHBOARD_URL } from "@/lib/links";

/* ClosingCards — the reference's two big rounded panels:
 * 1) "Smart Insights"-style coming-soon split card → Wire's auto-routing;
 * 2) "Finally sorted" consolidation card → many integrations vs one connection. */

export function RoutingCard() {
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8">
        <Reveal className="grid overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_2px_6px_rgba(10,10,10,0.04),0_32px_80px_-40px_rgba(16,185,129,0.2)] lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-8 sm:p-12">
            <span className="badge-pill">
              <LogoMark className="size-3.5" />
              Удахгүй
            </span>
            <h3 className="display mt-5 text-[clamp(30px,4vw,44px)]">
              Авто-routing.
              <br />
              <span className="display-dim">Ухаалаг чиглүүлэлт.</span>
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              Гүйлгээ бүр хамгийн найдвартай суваг руу автоматаар чиглэнэ. Суваг
              саатвал дараагийн суваг руу шилжээд <Hl>гүйлгээ тасрахгүй</Hl> —
              зөвхөн холбогдсон систем л үүнийг хийж чадна.
            </p>
            <Button asChild size="lg" className="mt-7">
              <a href={DASHBOARD_URL}>
                Эхлэх
                <ArrowRight />
              </a>
            </Button>
          </div>

          <div className="relative m-4 overflow-hidden rounded-2xl lg:m-6">
            <Image
              src="/clouds/card-sky.jpg"
              alt=""
              width={640}
              height={640}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-[15%] top-[20%] h-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(79,240,192,0.55),transparent)] blur-2xl" />
            <div className="relative flex min-h-[320px] items-center justify-center p-6">
              <div className="screen-card w-full max-w-sm p-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)]">
                    <Zap className="size-3" />
                    Авто-routing
                  </span>
                  <span className="text-[10px] text-[var(--color-faint)]">
                    5с өмнө
                  </span>
                </div>
                <p className="mt-3 text-[14px] font-bold">
                  Гүйлгээ өөр суваг руу шилжлээ
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--color-muted)]">
                  Сонгосон суваг 3 секунд хариу өгөөгүй тул дараагийн идэвхтэй
                  суваг руу автоматаар чиглүүлэв. Гүйлгээ амжилттай.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["PAY-1024", "₮176,000", "Амжилттай"].map((c) => (
                    <span
                      key={c}
                      className="tabular rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] text-[var(--color-muted)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CHECKS = [
  "Нэг API, нэг signature, нэг dashboard",
  "Суваг нэмэхэд код өөрчлөхгүй",
  "Бүх гүйлгээ нэг тайланд",
] as const;

const RAILS = [
  { icon: QrCode, label: "QR төлбөр" },
  { icon: Landmark, label: "Банкны апп" },
  { icon: CreditCard, label: "Карт" },
  { icon: Wallet, label: "Цахим хэтэвч" },
  { icon: Coins, label: "Хуваан төлөх" },
] as const;

export function ConsolidationCard() {
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8">
        <Reveal className="grid overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_2px_6px_rgba(10,10,10,0.04),0_32px_80px_-40px_rgba(16,185,129,0.2)] lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col items-start justify-center p-8 sm:p-12">
            <h3 className="display text-[clamp(30px,4vw,44px)]">
              Олон интеграц биш.
              <br />
              <span className="display-dim">Нэг холболт.</span>
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              Оператор бүрд тусдаа интеграц барьж байсныг Wire{" "}
              <Hl>нэг холболтоор орлуулна</Hl>.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-[15px] font-semibold">
                Орлуулна:
              </span>
              <div className="flex gap-1.5">
                {RAILS.map((r) => (
                  <span
                    key={r.label}
                    title={r.label}
                    className="flex size-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]"
                  >
                    <r.icon className="size-4" />
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-2.5">
              {CHECKS.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[300px] bg-[var(--color-surface)]/40">
            {/* a dashboard crop sliding off-frame, like the reference */}
            <div className="screen-card absolute top-10 left-8 w-[560px] max-w-none p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Нийт орлого", "₮586,173,000"],
                  ["Хүлээгдэж буй", "₮14,891,000"],
                  ["Дундаж гүйлгээ", "₮26,000"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="rounded-xl border border-[var(--color-border)] p-3"
                  >
                    <p className="text-[9px] text-[var(--color-faint)]">{l}</p>
                    <p className="tabular mt-1 text-[15px] font-bold">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ["Банкны апп", "₮312,400,000", "53%"],
                  ["Цахим хэтэвч", "₮188,050,000", "32%"],
                  ["QR төлбөр", "₮85,723,000", "15%"],
                ].map(([ch, amt, share]) => (
                  <div key={ch} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[11px] text-[var(--color-muted)]">
                      {ch}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-elevated)]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#2fd695,#059669)]"
                        style={{ width: share }}
                      />
                    </div>
                    <span className="tabular w-24 shrink-0 text-right text-[11px] font-semibold">
                      {amt}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-[var(--color-faint)]">
                Бүх суваг · нэг тайлан · 2026-07
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
