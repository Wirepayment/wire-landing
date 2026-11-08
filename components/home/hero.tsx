import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hl } from "@/components/hl";
import { DashboardMock } from "@/components/home/dashboard-mock";
import { DASHBOARD_URL } from "@/lib/links";

/* Hero — the centered "sky" opening: badge pill, masthead serif headline,
 * pill CTAs, then the dashboard screenshot rising out of a glowing mint
 * cloud (kie.ai-generated imagery + CSS glow). */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 text-center sm:pt-20">
        <Link
          href="/features"
          className="rise-in badge-pill transition-colors hover:text-[var(--color-foreground)]"
        >
          All-in-one Payment Gateway
          <ChevronRight className="size-3.5 text-[var(--color-faint)]" />
        </Link>

        <h1 className="display rise-in mx-auto mt-6 max-w-4xl text-[clamp(44px,7.5vw,92px)] [animation-delay:80ms]">
          Бүх төлбөр,
          <br />
          нэг гарцаар.
        </h1>

        <p className="rise-in mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] [animation-delay:160ms] sm:text-[17px]">
          Wire QR, банкны апп, карт, цахим хэтэвч, хуваан төлөх сувгуудыг{" "}
          <Hl>нэг холболтод нэгтгэнэ</Hl>. Бэлэн линк эсвэл API — орлогоо нэг
          dashboard-оос хянаарай.
        </p>

        <div className="rise-in mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
          <Button asChild size="lg">
            <a href={DASHBOARD_URL}>
              Эхлэх
              <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/features">
              Хэрхэн ажилладаг вэ
              <ChevronRight className="text-[var(--color-faint)]" />
            </Link>
          </Button>
        </div>
      </div>

      {/* the cloud board */}
      <div className="relative mx-auto mt-6 w-full max-w-6xl px-5 pb-16">
        {/* glowing cloud behind the screenshot */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 bottom-0"
        >
          <div className="cloud-drift absolute inset-x-[10%] top-0 h-[380px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,185,129,0.42),rgba(79,240,192,0.24)_55%,transparent_78%)] blur-2xl" />
          <div className="absolute inset-x-[28%] top-[40px] h-[280px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(79,240,192,0.5),transparent)] blur-3xl" />
          <Image
            src="/clouds/hero-cloud.jpg"
            alt=""
            width={1280}
            height={720}
            priority
            className="cloud-drift h-full w-full scale-125 object-cover mix-blend-multiply blur-[5px] contrast-125 saturate-200 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_40%,#000_60%,transparent_100%)]"
          />
        </div>

        {/* open sky above the screenshot */}
        <div aria-hidden className="h-32 sm:h-48" />

        <div className="relative">
          <span className="badge-pill mb-3 !bg-white/85">
            <span className="size-1.5 rounded-full bg-[var(--color-primary)]" />
            Реал цагийн dashboard
          </span>
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
