import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* FaqList — white rounded accordion with the light-blue plus tiles. Shared by
 * the home FAQ and the answer pages; the FAQPage JSON-LD reads the same items. */
export function FaqList({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <Reveal delay={100} className="mt-10">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_2px_6px_rgba(10,10,10,0.04),0_24px_60px_-36px_rgba(16,185,129,0.18)]">
        {items.map((f) => (
          <details
            key={f.q}
            className="group border-b border-[var(--color-border)] last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4.5 text-[15px] font-semibold tracking-tight select-none [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" strokeWidth={2.5} />
              </span>
            </summary>
            <p className="faq-a px-6 pb-5 text-sm leading-relaxed text-[var(--color-muted)]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
