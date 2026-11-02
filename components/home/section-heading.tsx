import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

/* SectionHeading — the reference's section opener: a small pill with the
 * brand mark, then a big serif heading (optional dim second line) and lead. */
export function SectionHeading({
  badge,
  line1,
  line2,
  lead,
  align = "center",
}: {
  badge: string;
  line1: string;
  line2?: string;
  lead?: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <span className="badge-pill">
        <LogoMark className="size-3.5" />
        {badge}
      </span>
      <h2 className="display mt-5 text-[clamp(34px,5vw,60px)]">
        {line1}
        {line2 ? (
          <>
            <br />
            <span className="display-dim">{line2}</span>
          </>
        ) : null}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-base",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
