import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  BellRing,
  Coins,
  Landmark,
  RefreshCw,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hl } from "@/components/hl";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { FinalCta } from "@/components/home/final-cta";
import { DASHBOARD_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata("/features");

const rails = [
  {
    icon: Landmark,
    group: "Банк",
    items: "Банкны апп · Шилжүүлэг",
    desc: "Худалдан авагч өөрийн банкны аппаараа шууд төлнө.",
  },
  {
    icon: Wallet,
    group: "Хэтэвч / PSP",
    items: "Цахим хэтэвч · QR төлбөр",
    desc: "QR уншуулаад л болоо — хамгийн түгээмэл урсгал.",
  },
  {
    icon: Coins,
    group: "Зээл / NBFI",
    items: "Хуваан төлөх · BNPL",
    desc: "Худалдан авагч хуваан төлж, та дүнгээ бүтнээр авна.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Авто-routing",
    desc: "Төлбөр бүр амжилтын магадлал, хурдаар хамгийн тохиромжтой суваг руу автоматаар чиглэнэ.",
  },
  {
    icon: RefreshCw,
    title: "3 давхар баталгаа",
    desc: "Webhook + идэвхтэй шалгалт + өдөр тутмын тулгалт — төлбөр алдагдахгүй.",
  },
  {
    icon: BellRing,
    title: "Бодит цагийн мэдэгдэл",
    desc: "Төлбөр орж ирмэгц имэйл + webhook. Сонголтоо өөрөө удирдана.",
  },
  {
    icon: BarChart3,
    title: "Тайлан, түүх",
    desc: "Гүйлгээ, нэхэмжлэх, буцаалт — бүгд нэг dashboard-д, шүүж хайж болно.",
  },
  {
    icon: Banknote,
    title: "MNT бүрэн дэмжлэг",
    desc: "Бүх дүн төгрөгөөр, бутархайгүй. Тооцоо нийлэхэд төөрөгдөлгүй.",
  },
  {
    icon: ShieldCheck,
    title: "Баталгаажсан экосистем",
    desc: "Эзэмшигч бүр утас + ДАН-аар баталгаажсан — найдвартай түншүүдтэй ажиллана.",
  },
];

/** Features — what the unified gateway gives a merchant, beyond the API. */
export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        badge="Нэг гэрээ · нэг интеграц"
        line1="Бүх суваг,"
        line2="нэг холболтод."
        lead={
          <>
            Банкны апп, цахим хэтэвч, хуваан төлөх зээл — худалдан авагч аль нь
            ч сонгосон, <Hl>та нэг л холболт удирдана</Hl>.
          </>
        }
      >
        <Button asChild size="lg">
          <a href={DASHBOARD_URL}>
            Эхлэх
            <ArrowRight />
          </a>
        </Button>
      </PageIntro>

      {/* rails */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <div className="grid gap-5 md:grid-cols-3">
            {rails.map((r, i) => (
              <Reveal
                key={r.group}
                delay={i * 110}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-30px_rgba(16,185,129,0.18)]"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <r.icon className="size-5" />
                </span>
                <p className="mt-4 text-[12px] font-semibold tracking-wide text-[var(--color-faint)] uppercase">
                  {r.group}
                </p>
                <h3 className="display mt-1 text-[21px]">{r.items}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {r.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* feature grid */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge="Боломжууд"
            line1="API-гаас цаашхи"
            line2="бүх зүйл."
            lead="Олон оператортой тус тусад нь гэрээ хийж, тус бүрд нь холболт барих шаардлагагүй — нэг л холболт хангалттай."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
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
