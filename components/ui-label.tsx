/** UiLabel — names a button, menu item or state the reader will see on
 *  screen. Styled as a small chip instead of quotation marks (guillemets are not
 *  used anywhere on Wire's surfaces). */
export function UiLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-px inline-block rounded-md border border-[var(--color-border)] bg-white px-1.5 py-px align-baseline text-[0.92em] leading-snug font-semibold whitespace-nowrap text-[var(--color-foreground)] shadow-[0_1px_0_rgba(10,10,10,0.04)]">
      {children}
    </span>
  );
}
