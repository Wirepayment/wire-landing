import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/home/section-heading";
import { FaqList } from "@/components/faq-list";
import { faqsFor } from "@/lib/faq";

export async function Faq() {
  const [t, locale] = await Promise.all([
    getTranslations("home.faq"),
    getLocale(),
  ]);
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
        <SectionHeading badge={t("badge")} line1={t("heading")} />
        <FaqList items={faqsFor(locale)} />
      </div>
    </section>
  );
}
