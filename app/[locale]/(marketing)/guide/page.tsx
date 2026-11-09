import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { KeyRound, PlugZap, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/page-intro";
import { FinalCta } from "@/components/home/final-cta";
import { UiLabel } from "@/components/ui-label";

export const metadata: Metadata = pageMetadata("/guide");

/* Steps are a real sequence — the numbering carries the order a new merchant
 * actually walks. Screenshots ship pre-masked (register, address, keys). */
type Step = {
  n: number;
  title: string;
  desc: React.ReactNode;
  img: string;
  w: number;
  h: number;
  caption: string;
  note?: React.ReactNode;
  warn?: boolean;
};

type Phase = {
  id: string;
  tag: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  intro: React.ReactNode;
  steps: Step[];
};

const PHASES: Phase[] = [
  {
    id: "signup",
    tag: "Үе шат А",
    title: "Бүртгэл ба баталгаажуулалт",
    icon: ShieldCheck,
    intro: (
      <>
        Wire-д тусдаа нууц үг байхгүй — Google акаунтаараа нэвтэрнэ. Төлбөр
        хүлээн авах санхүүгийн үйлчилгээ тул эзэмшигч бүр утас + ДАН (иргэний)
        хоёр шатны баталгаажуулалт хийнэ. Хоёулаа нэг л удаа — хэдэн ч бизнес,
        project нээсэн дахин шаардахгүй.
      </>
    ),
    steps: [
      {
        n: 1,
        title: "Google-ээр нэвтрэх",
        desc: (
          <>
            <strong>app.wire.mn</strong> руу орж{" "}
            <UiLabel>Google-ээр нэвтрэх</UiLabel> дарна. Анх удаа нэвтэрч буй
            бол автоматаар шинэ бүртгэл үүснэ.
          </>
        ),
        img: "01-signin.png",
        w: 1440,
        h: 900,
        caption: "app.wire.mn/signin — Google-ээр нэвтрэх",
      },
      {
        n: 2,
        title: "Утасны дугаараа оруулах",
        desc: (
          <>
            Шинэ хэрэглэгч шууд баталгаажуулалтын хуудас руу орно. Утасны
            дугаараа оруулаад <UiLabel>Баталгаажуулах</UiLabel> дарна.
          </>
        ),
        img: "02-onboarding-phone.png",
        w: 1440,
        h: 900,
        caption: "Баталгаажуулалт 1/2 — утасны дугаар",
      },
      {
        n: 3,
        title: "SMS илгээж баталгаажуулах",
        desc: (
          <>
            Дэлгэцэд гарсан кодыг <strong>өөрийн утаснаас</strong> заасан богино
            дугаар руу SMS-ээр илгээнэ — та өөрөө илгээнэ, утсанд ирэхийг
            хүлээхгүй. Илгээмэгц хуудас автоматаар үргэлжилнэ.
          </>
        ),
        img: "03-onboarding-phone-sms.png",
        w: 1440,
        h: 900,
        caption: "Код + богино дугаар, SMS хүлээж буй төлөв",
      },
      {
        n: 4,
        title: "ДАН баталгаажуулалт эхлүүлэх",
        desc: (
          <>
            Хоёр дахь алхам — төрийн ДАН системээр иргэний мэдээллээ
            баталгаажуулна. <UiLabel>ДАН-аар баталгаажуулах</UiLabel> дарна.
          </>
        ),
        img: "04-onboarding-dan.png",
        w: 1200,
        h: 1067,
        caption: "Баталгаажуулалт 2/2 — ДАН",
      },
      {
        n: 5,
        title: "sso.gov.mn дээр зөвшөөрөл өгөх",
        desc: "Төрийн нэгдсэн нэвтрэлт рүү шилжиж, өөрийн ДАН бүртгэлээр нэвтрээд мэдээллээ дамжуулах зөвшөөрөл өгнө. Амжилттай бол автоматаар буцна.",
        img: "05-dan-sso.png",
        w: 1200,
        h: 1067,
        caption: "ДАН — танилт нэвтрэлтийн систем",
      },
      {
        n: 6,
        title: "Баталгаажсанаа шалгах",
        desc: (
          <>
            Профайл хуудсанд утас, ДАН хоёулаа <UiLabel>Баталгаажсан</UiLabel>{" "}
            болсныг харна. Эндээс хойш бүх боломж нээлттэй.
          </>
        ),
        img: "06-profile-verified.png",
        w: 1200,
        h: 1067,
        caption: "Профайл — бүрэн баталгаажсан төлөв",
      },
    ],
  },
  {
    id: "project",
    tag: "Үе шат Б",
    title: "Project үүсгэх",
    icon: KeyRound,
    intro: (
      <>
        <strong>Бизнес</strong> = KYC, данс, операторын бүртгэл бүхий идентити.{" "}
        <strong>Project</strong> = түүн доорх интеграцийн орчин: өөрийн API key,
        нэг webhook, checkout загвар. Нэг бизнес дор олон project, нэг хэрэглэгч
        хэд хэдэн бизнес нээж болно.
      </>
    ),
    steps: [
      {
        n: 7,
        title: "Шинэ project үүсгэх — нэр өгөх",
        desc: (
          <>
            Зүүн дээд булангийн project сонгогчоос{" "}
            <UiLabel>Шинэ project үүсгэх</UiLabel> дарна. Нэрээ өгөөд бизнесийн
            сонголтоо хийнэ. Анхны project-д энэ сонголт харагдахгүй — бизнес
            автоматаар хамт үүснэ.
          </>
        ),
        img: "07-create-project-existing.png",
        w: 1200,
        h: 1067,
        caption:
          "Одоогийн бизнесээ ашиглах (default) — бүртгэл, данс, холболт өвлөгдөнө",
      },
      {
        n: 8,
        title: "Эсвэл: Шинэ бизнес бүртгүүлэх",
        desc: "Тусдаа хуулийн этгээд, өөр үйл ажиллагаанд зориулж цоо шинэ бизнес нээх бол хоёр дахь сонголтыг авна. Утас/ДАН дахин шаардахгүй; KYC, данс, операторын өргөдөл шинэ бизнес дээрээ тусдаа явна.",
        img: "08-create-project-newbiz.png",
        w: 1200,
        h: 1067,
        caption: "Шинэ бизнес бүртгүүлэх — тусдаа KYC, данс, өргөдөлтэй",
        note: (
          <>
            Сонголтоо андуурсан бол: дата-гүй project-ийг операторын хуудасны
            <UiLabel>Бэлэн мерчант бүртгэлээ шууд ашиглах</UiLabel> картаар өөр
            бизнес рүү шилжүүлж болно (алхам 12).
          </>
        ),
      },
      {
        n: 9,
        title: "Secret key-гээ хадгалах",
        desc: (
          <>
            Project үүсмэгц <code>sk_live_…</code> secret key{" "}
            <strong>ганц удаа</strong> харагдана. <UiLabel>Хуулах</UiLabel>{" "}
            эсвэл
            <UiLabel>.txt татах</UiLabel> товчоор нууц үгийн менежерт хадгална —
            дахин харагдахгүй, алдвал шинэ key үүсгэнэ.
          </>
        ),
        img: "09-project-created-key.png",
        w: 1200,
        h: 1067,
        caption: "Нэг удаагийн key илчлэлт (зурган дээрх key хүчингүй)",
      },
      {
        n: 10,
        title: "Project-ийн тойм",
        desc: "Шинэ project-ийн нүүр. Зүүн цэснээс гүйлгээ, төлбөрийн линк, checkout, данс, тайлан, тохиргоо руу орно.",
        img: "10-project-home.png",
        w: 1200,
        h: 1067,
        caption: "Тойм — шинэ project-ийн эхлэл",
      },
    ],
  },
  {
    id: "connector",
    tag: "Үе шат В",
    title: "Оператор холбох",
    icon: Workflow,
    intro: (
      <>
        Төлбөр хүлээн авахын тулд бизнес дээрээ дор хаяж нэг оператор холбоно.
        Урсгал:{" "}
        <strong>
          маягт бөглөж илгээх → хянан батлагдах → цахим гэрээ байгуулах → төлбөр
          идэвхжих
        </strong>
        . Гэрээ нь батлагдсаны <em>дараа</em> байгуулагддаг — өргөдөл илгээхэд
        гэрээ шаардахгүй. Доорх зурагт операторын нэр, дугаарыг ерөнхий болгосон
        — танай акаунтад идэвхжсэн операторын жинхэнэ нэр харагдана.
      </>
    ),
    steps: [
      {
        n: 11,
        title: "Холболтууд хуудаснаас сонгох",
        desc: "Тохиргоо → Суваг. Танай акаунтад идэвхжсэн операторуудаас холбохоо сонгоно. Нэг project олон оператор холбож болно; оператор бүр нэг удаа.",
        img: "11-connectors.png",
        w: 1200,
        h: 1067,
        caption:
          "Холболтууд — боломжит операторуудын жагсаалт (нэрийг ерөнхийлсөн)",
      },
      {
        n: 12,
        title: "Эхлэл ба хурдан зам",
        desc: (
          <>
            Операторын хуудас 3 үе шаттай явцыг харуулна. Өмнө нь өөр бизнес
            дээрээ баталгаажсан бол{" "}
            <UiLabel>Бэлэн мерчант бүртгэлээ шууд ашиглах</UiLabel> карт гарна —
            сонговол шинэ өргөдөл, хүлээлтгүйгээр шууд ажиллана. Шинэ бизнес бол
            5 алхамт маягтыг бөглөнө (Хувь хүн / Байгууллага).
          </>
        ),
        img: "12-connector-start.png",
        w: 1200,
        h: 1067,
        caption:
          "Явцын 3 үе шат, бэлэн бүртгэлийн карт, маягтын 1-р алхам (операторын № нуусан)",
      },
      {
        n: 13,
        title: "Маягт 2/5 — Үндсэн мэдээлэл",
        desc: (
          <>
            Регистр, овог нэр, бизнес нэр, үйл ажиллагааны төрөл.{" "}
            <UiLabel>ДАН баталгаажсан мэдээллээр бөглөх</UiLabel> картын
            <UiLabel>Ашиглах</UiLabel> товч нэг даралтаар бөглөнө.
          </>
        ),
        img: "13-connector-step2-info.png",
        w: 1200,
        h: 1067,
        caption: "2/5 Мэдээлэл — ДАН prefill (регистрийг нуусан)",
      },
      {
        n: 14,
        title: "Маягт 3/5 — Хаяг, холбоо барих",
        desc: "Хот, дүүрэг, дэлгэрэнгүй хаяг, утас, и-мэйл. ДАН-ийн хаяг болон профайлын мэдээллээр мөн нэг даралтаар бөглөж болно.",
        img: "14-connector-step3-address.png",
        w: 1200,
        h: 1067,
        caption: "3/5 Хаяг — хоёр prefill карттай (хаягийг нуусан)",
      },
      {
        n: 15,
        title: "Маягт 4/5 — Орлого хүлээн авах данс",
        desc: (
          <>
            Орлого төвлөрөх банкны дансаа сонгоно, эсвэл{" "}
            <UiLabel>Өөр данс холбох</UiLabel>-оор шинээр нэмнэ. Өмнө холбосон
            данснууд бэлэн харагдана.
          </>
        ),
        img: "15-connector-step4-account.png",
        w: 1200,
        h: 1067,
        caption: "4/5 Данс (дугаарыг нуусан)",
      },
      {
        n: 16,
        title: "Маягт 5/5 — Шалгаад илгээх",
        desc: (
          <>
            Бүх мэдээллээ нэг дэлгэцээс нягталж <UiLabel>Хүсэлт илгээх</UiLabel>{" "}
            дарна. Маягт алхам бүрт автоматаар хадгалагддаг тул хагас бөглөөд
            гарсан ч дараа үргэлжлүүлж болно.
          </>
        ),
        img: "16-connector-step5-review.png",
        w: 1200,
        h: 1534,
        caption: "5/5 Хянах — нэгтгэл (хувийн мэдээллийг нуусан)",
      },
      {
        n: 17,
        title: "Илгээхээ баталгаажуулах",
        desc: (
          <>
            Сүүлчийн цонхонд <UiLabel>Илгээх</UiLabel> дарснаар хүсэлт хяналтад
            очно.
          </>
        ),
        img: "17-connector-submit-confirm.png",
        w: 1200,
        h: 1067,
        caption: "Хүсэлт илгээх үү? цонх — эцсийн баталгаажуулалт",
      },
      {
        n: 18,
        title: "Хяналт хүлээх → гэрээ → идэвхжилт",
        desc: (
          <>
            Хүсэлт <UiLabel>Хянагдаж байна</UiLabel> төлөвт орно. Батлагдмагц
            и-мэйлээр мэдэгдэж, операторын хуудсанд{" "}
            <strong>цахим гэрээ байгуулах</strong> хэсэг гарна — гэрээгээ
            баталмагц холболт идэвхжиж, төлбөр хүлээн авч эхэлнэ.
          </>
        ),
        img: "18-connector-pending.png",
        w: 1200,
        h: 1067,
        caption: "Хянагдаж буй хүсэлт — цуцалж, дахин илгээх боломжтой",
        warn: true,
        note: (
          <>
            <strong>Анхаар:</strong> батлагдсан ч гэрээ байгуулаагүй бол холболт
            идэвхгүй хэвээр байна. Батлагдсан мөртлөө ажиллахгүй байгаа
            тохиолдлын хамгийн түгээмэл шалтгаан — гэрээний алхам хийгдээгүй.
          </>
        ),
      },
    ],
  },
  {
    id: "integration",
    tag: "Үе шат Г",
    title: "Интеграцийн тохиргоо",
    icon: PlugZap,
    intro: (
      <>
        Оператор идэвхжсэний дараа техник интеграцид хэрэгтэй хоёр зүйл. Код
        бичихгүйгээр төлбөрийн линк, checkout-оо шууд ашиглаж эхэлж болно.
      </>
    ),
    steps: [
      {
        n: 19,
        title: "API key удирдах",
        desc: "Тохиргоо → API key. Key-гээ солих (rotate), хуучныг хүчингүй болгох. Key бүр зөвхөн өөрийн project-ийн дата руу ханддаг.",
        img: "19-api-keys.png",
        w: 1200,
        h: 1067,
        caption: "API key — project бүр өөрийн sk_live key-тэй",
      },
      {
        n: 20,
        title: "Webhook холбох",
        desc: (
          <>
            Тохиргоо → Webhook. Төлбөрийн event хүлээн авах серверийнхээ URL-ыг
            бүртгээд <strong>баталгаажуулна</strong>. Project бүр яг нэг webhook
            endpoint-той; URL солиход шинэ хаяг баталгаажтал event хуучин хаяг
            руу очсон хэвээр байна. API бүрэн лавлах — docs.wire.mn.
          </>
        ),
        img: "20-webhooks.png",
        w: 1200,
        h: 1067,
        caption: "Webhook — endpoint бүртгэж баталгаажуулах",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <>
      <PageIntro
        badge="Эхлэх гарын авлага"
        line1="Бүртгэлээс төлбөр"
        line2="хүлээн авах хүртэл"
        lead={
          <>
            Шинэ мерчант Wire дээр хэрхэн бүртгүүлж, баталгаажуулалт хийж,
            project үүсгээд операторын холболтоо идэвхжүүлэх вэ — бүрэн
            дараалал, бодит дэлгэцтэй.
          </>
        }
      />

      <nav
        aria-label="Гарын авлагын агуулга"
        className="mx-auto mt-6 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 px-5"
      >
        {PHASES.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="badge-pill transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-foreground)]"
          >
            <p.icon className="size-3.5 text-[var(--color-primary)]" />
            {p.title}
          </a>
        ))}
      </nav>

      <div className="mx-auto w-full max-w-3xl px-5 pb-8">
        {PHASES.map((phase) => (
          <section key={phase.id} id={phase.id} className="scroll-mt-24">
            <Reveal>
              <div className="mt-20 border-t-2 border-[var(--color-primary)] pt-7">
                <span className="font-[family-name:var(--font-round)] text-xs font-bold tracking-[0.12em] text-[var(--color-primary)] uppercase">
                  {phase.tag}
                </span>
                <h2 className="display mt-2 text-[clamp(26px,3.4vw,38px)]">
                  {phase.title}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
                  {phase.intro}
                </p>
              </div>
            </Reveal>

            {phase.steps.map((step) => (
              <Reveal key={step.n}>
                <article className="mt-12">
                  <div className="flex items-baseline gap-3.5">
                    <span className="flex shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 px-3 py-0.5 font-[family-name:var(--font-round)] text-[13px] font-bold text-[var(--color-primary)] tabular-nums">
                      {step.n}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-[14.5px] leading-relaxed text-[var(--color-muted)] [&_code]:rounded [&_code]:bg-[var(--color-border)]/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_strong]:font-semibold [&_strong]:text-[var(--color-foreground)]">
                    {step.desc}
                  </p>
                  <figure className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_12px_32px_-16px_rgba(16,185,129,0.25)]">
                    <Image
                      src={`/guide/${step.img}`}
                      alt={step.title}
                      width={step.w}
                      height={step.h}
                      sizes="(max-width: 800px) 100vw, 768px"
                      className="w-full"
                    />
                    <figcaption className="border-t border-[var(--color-border)] px-4 py-2.5 text-[13px] text-[var(--color-muted)]">
                      {step.caption}
                    </figcaption>
                  </figure>
                  {step.note ? (
                    <p
                      className={`mt-4 rounded-xl border px-4 py-3 text-[14px] leading-relaxed ${
                        step.warn
                          ? "border-amber-300/60 bg-amber-50 text-amber-900"
                          : "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5"
                      } [&_strong]:font-semibold`}
                    >
                      {step.note}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </section>
        ))}
      </div>

      <FinalCta />
    </>
  );
}
