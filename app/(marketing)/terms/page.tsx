import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FileText } from "lucide-react";

export const metadata: Metadata = pageMetadata("/terms");

// Mirrors the dashboard terms dialog (apps/dashboard/components/terms-dialog.tsx)
// — update both together. Operator-agnostic (CLAUDE.md critical rule #9).
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Үйлчилгээ",
    body: "Wire (wire.mn) нь Монголын төлбөрийн операторуудыг нэг интеграцаар холбодог төлбөрийн gateway. Та dashboard-аар дамжуулан төлбөр хүлээн авах, гүйлгээгээ хянах, тохиргоогоо удирдана.",
  },
  {
    title: "2. Бүртгэл ба нэвтрэлт",
    body: "Нэвтрэлт Google бүртгэлээр хийгдэнэ — бид нууц үг хадгалдаггүй. Таны имэйл хаяг нь аккаунтын үндсэн таних тэмдэг болно.",
  },
  {
    title: "3. Баталгаажуулалт (KYC)",
    body: "Санхүүгийн үйлчилгээ тул эзэмшигч бүр (а) утасны дугаараа SMS-ээр, (б) иргэний мэдээллээ төрийн ДАН (sso.gov.mn) системээр баталгаажуулна. ДАН-аас ирсэн мэдээлэл (нэр, регистрийн дугаар, хаяг) шифрлэгдэж хадгалагдана. Нэг иргэн зөвхөн нэг аккаунт баталгаажуулна.",
  },
  {
    title: "4. Мэдээллийн хамгаалалт",
    body: "Иргэний болон дансны мэдээлэл AES-256 шифрлэлттэй хадгалагдана. Бид таны мэдээллийг зар сурталчилгаанд ашиглахгүй, гуравдагч этгээдэд худалдахгүй. Төлбөрийн оператортой merchant бүртгэлд шаардлагатай хэмжээнд л хуваалцана.",
  },
  {
    title: "5. Төлбөрийн мэдээлэл",
    body: "Гүйлгээний дүн, төлөв, холбогдох мета мэдээлэл нь тооцоо нийлэх, маргаан шийдвэрлэх зорилгоор хадгалагдана. Бүх дүн төгрөгөөр (MNT) бүртгэгдэнэ.",
  },
  {
    title: "6. Хэрэглэгчийн үүрэг",
    body: "API түлхүүрээ нууцалж хадгална. Хууль бус бараа үйлчилгээний төлбөр хүлээн авахад ашиглахыг хориглоно. Зөрчил илэрвэл аккаунт түр эсвэл бүрмөсөн хаагдаж болно.",
  },
  {
    title: "7. Цуцлалт",
    body: "Та хүссэн үедээ project-оо устгаж, үйлчилгээнээс гарч болно. Санхүүгийн бүртгэлийн хууль журмын дагуу зарим гүйлгээний түүх тогтоосон хугацаанд хадгалагдана.",
  },
];

/** Terms — the public terms-of-service page (same content as the dashboard
 *  dialog, so signin/onboarding and the marketing site tell one story). */
export default function TermsPage() {
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-2xl px-5 py-14 text-center sm:py-16">
        <span className="badge-pill">
          <FileText className="size-3.5 text-[var(--color-primary)]" />
          Эрх зүй
        </span>
        <h1 className="display mt-5 text-[clamp(32px,4.5vw,48px)]">
          Үйлчилгээний нөхцөл.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-muted)]">
          Wire-д бүртгүүлж нэвтэрснээр та доорх нөхцөлийг хүлээн зөвшөөрнө.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-7 text-left shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-36px_rgba(16,185,129,0.18)] sm:p-9">
          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-[15px] font-semibold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--color-faint)]">
          Сүүлд шинэчилсэн: 2026-06-12 · Асуулт байвал{" "}
          <a
            href="mailto:support@wire.mn"
            className="text-[var(--color-primary)] hover:opacity-80"
          >
            support@wire.mn
          </a>
        </p>
      </div>
    </section>
  );
}
