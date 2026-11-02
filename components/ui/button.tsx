import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/* Sky-style pills: fully rounded, a Mint Pulse gradient with a layered
 * mint glow for the primary action, quiet white/ink pills around it. */
const button = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "pill-glow bg-[linear-gradient(180deg,#2fd695_0%,#059669_100%)] text-white hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95",
        dark: "bg-[var(--color-ink)] text-white shadow-[0_2px_8px_rgba(10,10,10,0.25)] hover:-translate-y-0.5 hover:bg-[var(--color-ink-soft)] active:translate-y-0",
        outline:
          "border border-[var(--color-border)] bg-white text-[var(--color-foreground)] shadow-[0_1px_2px_rgba(10,10,10,0.06),0_6px_20px_-8px_rgba(10,10,10,0.12)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] active:translate-y-0",
        ghost:
          "text-[var(--color-foreground)] hover:bg-[var(--color-elevated)]",
        danger:
          "border border-[var(--color-coral)] bg-white text-[var(--color-coral)]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(button({ variant, size }), className)} {...props} />
  );
}
