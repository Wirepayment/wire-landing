import { LogoMark } from "@/components/logo";

/* PageIntro — the detail-page opener in the clear-sky language: centered
 * badge pill, two-line serif headline (second line dimmed), lead, optional
 * actions, all rising over a soft mint glow. */
export function PageIntro({
  badge,
  line1,
  line2,
  lead,
  children,
}: {
  badge: string;
  line1: string;
  line2: string;
  lead: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] top-24 h-64 rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),rgba(79,240,192,0.08)_55%,transparent_100%)] blur-2xl"
      />
      <div className="relative mx-auto w-full max-w-4xl px-5 pt-14 pb-4 text-center sm:pt-20">
        <span className="rise-in badge-pill">
          <LogoMark className="size-3.5" />
          {badge}
        </span>
        <h1 className="display rise-in mx-auto mt-6 text-[clamp(40px,6vw,76px)] [animation-delay:80ms]">
          {line1}
          <br />
          <span className="display-dim">{line2}</span>
        </h1>
        <p className="rise-in mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] [animation-delay:160ms] sm:text-[17px]">
          {lead}
        </p>
        {children ? (
          <div className="rise-in mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
