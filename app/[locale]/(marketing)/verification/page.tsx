import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  Ban,
  Check,
  Lock,
  MessageSquare,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Hl } from "@/components/hl";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/home/section-heading";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata("/verification");

const promises = [
  {
    icon: Lock,
    title: "Шифрлэгдсэн хадгалалт",
    desc: "Иргэний мэдээлэл AES-256 шифрлэлттэй. Дэлгэцэд зөвхөн нэр + register дугаарын эхний болон сүүлийн хэсэг (masked) харагдана.",
  },
  {
    icon: UserCheck,
    title: "Нэг иргэн = нэг аккаунт",
    desc: "Нэг иргэний мэдээллээр зөвхөн нэг аккаунт баталгаажна — давхар бүртгэл, залилангаас сэргийлнэ.",
  },
  {
    icon: Ban,
    title: "Гуравдагч этгээдэд өгөхгүй",
    desc: "Таны мэдээллийг зар сурталчилгаанд ашиглахгүй, худалдахгүй. Зөвхөн KYC-д шаардлагатай хэмжээнд хэрэглэнэ.",
  },
];

function StepHead({
  chip,
  icon: Icon,
  line1,
  line2,
  copy,
  bullets,
}: {
  chip: string;
  icon: React.ComponentType<{ className?: string }>;
  line1: string;
  line2: string;
  copy: React.ReactNode;
  bullets: string[];
}) {
  return (
    <div>
      <span className="badge-pill">
        <Icon className="size-3.5 text-[var(--color-primary)]" />
        {chip}
      </span>
      <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)]">
        {line1}
        <br />
        <span className="display-dim">{line2}</span>
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
        {copy}
      </p>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* mock: the one-SMS phone verification */
function PhoneMock() {
  return (
    <div className="screen-card mx-auto w-full max-w-sm p-5">
      <p className="flex items-center gap-1.5 text-[12px] font-bold">
        <MessageSquare className="size-3.5 text-[var(--color-primary)]" />
        Утас баталгаажуулах
      </p>
      <div className="mt-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-3">
        <p className="text-[10px] text-[var(--color-faint)]">Таны дугаар</p>
        <p className="tabular text-[16px] font-bold">88** ** 07</p>
      </div>
      <div className="mt-2.5 flex justify-end">
        <div className="pill-glow max-w-[80%] rounded-2xl rounded-br-sm bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] px-3.5 py-2 text-[12px] text-white">
          WIRE 8kfq2
        </div>
      </div>
      <p className="mt-1 text-right text-[9px] text-[var(--color-faint)]">
        Богино дугаар руу илгээгдлээ
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--color-primary-soft)] px-3 py-2.5">
        <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <Check className="size-3" strokeWidth={3.5} />
        </span>
        <span className="text-[12px] font-semibold text-[var(--color-primary-deep)]">
          30 секундэд автоматаар танигдлаа
        </span>
      </div>
    </div>
  );
}

/* mock: the ДАН government SSO handoff */
function DanMock() {
  return (
    <div className="screen-card mx-auto w-full max-w-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold">
          <ShieldCheck className="size-3.5 text-[var(--color-primary)]" />
          ДАН — sso.gov.mn
        </span>
        <span className="rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-[9px] font-semibold text-[var(--color-primary)]">
          Төрийн систем
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="rounded-xl border border-[var(--color-border)] p-3">
          <p className="text-[10px] text-[var(--color-faint)]">Нэр</p>
          <p className="text-[13px] font-semibold">Б. Тэмүүлэн</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-3">
          <p className="text-[10px] text-[var(--color-faint)]">Регистр</p>
          <p className="tabular text-[13px] font-semibold">УК92******91</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-[var(--color-primary-soft)] px-3 py-2.5">
          <Lock className="size-3.5 text-[var(--color-primary-deep)]" />
          <span className="text-[11px] font-medium text-[var(--color-primary-deep)]">
            Wire таны нууц үгийг хэзээ ч харахгүй
          </span>
        </div>
      </div>
    </div>
  );
}

/** Verification — why and how Wire verifies every owner: phone (SMS) first,
 *  then citizen identity through the government SSO (ДАН). */
export default function VerificationPage() {
  return (
    <>
      <PageIntro
        badge="KYC · 2 алхам · ~2 минут"
        line1="Эзэмшигч бүр"
        line2="баталгаажсан."
        lead={
          <>
            Wire бол төлбөр хүлээн авах санхүүгийн үйлчилгээ. Тиймээс данс нээх
            бүр утас + иргэний баталгаажуулалт хийдэг —{" "}
            <Hl>таныг ч, таны хэрэглэгчдийг ч хамгаална</Hl>.
          </>
        }
      />

      {/* step 1 — phone */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <StepHead
              chip="Алхам 1 · Утас"
              icon={MessageSquare}
              line1="Утасны дугаар."
              line2="Нэг SMS."
              copy={
                <>
                  Дугаараа оруулаад, заасан богино дугаар руу{" "}
                  <Hl>нэг SMS илгээхэд л баталгаажна</Hl>. Код цээжлэх, апп
                  суулгах шаардлагагүй — таны өөрийн утаснаас илгээсэн мессеж
                  өөрөө баталгаа болно.
                </>
              }
              bullets={[
                "Нэг утасны дугаар = нэг аккаунт",
                "Ихэвчлэн 30 секундэд автоматаар танигдана",
                "Мэдэгдэл, чухал сэрэмжлүүлэг энэ дугаарт холбогдоно",
              ]}
            />
          </Reveal>
          <Reveal delay={120}>
            <PhoneMock />
          </Reveal>
        </div>
      </section>

      {/* step 2 — DAN */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <StepHead
              chip="Алхам 2 · ДАН"
              icon={ShieldCheck}
              line1="Иргэний баталгаажуулалт."
              line2="Төрийн ДАН-аар."
              copy={
                <>
                  Төрийн нэгдсэн нэвтрэлт ДАН (sso.gov.mn) руу шилжиж, өөрийн
                  зөвшөөрлөөр нэвтэрнэ.{" "}
                  <Hl>Wire таны нууц үгийг хэзээ ч харахгүй</Hl> — зөвхөн
                  баталгаажсан үр дүн (нэр, регистр) бидэнд ирдэг.
                </>
              }
              bullets={[
                "Албан ёсны төрийн систем — нэмэлт бичиг баримт илгээхгүй",
                "Нэг удаа, ~1 минут — дахин давтагдахгүй",
                "Гарын үсэгтэй (signed) суваг — өгөгдөл замдаа өөрчлөгдөхгүй",
              ]}
            />
          </Reveal>
          <Reveal delay={120} className="lg:order-1">
            <DanMock />
          </Reveal>
        </div>
      </section>

      {/* privacy promises */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <SectionHeading
            badge="Нууцлал"
            line1="Таны мэдээлэл"
            line2="таных хэвээр."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 110}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(10,10,10,0.04)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <p.icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {p.desc}
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
