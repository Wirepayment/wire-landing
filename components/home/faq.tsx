import { SectionHeading } from "@/components/home/section-heading";
import { FaqList } from "@/components/faq-list";
import { FAQS } from "@/lib/faq";

export function Faq() {
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
        <SectionHeading badge="Тусламж" line1="Түгээмэл асуултууд." />
        <FaqList items={FAQS} />
      </div>
    </section>
  );
}
