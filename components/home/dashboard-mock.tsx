import {
  ArrowUpRight,
  BarChart3,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  Link2,
  Landmark,
  Plus,
  RefreshCw,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

/* DashboardMock — the hero "screenshot": a hand-built, Mongolian-language
 * rendering of the Wire dashboard cockpit (sidebar, revenue chart, stat
 * cards, latest payments). Pure markup so it stays crisp at any DPI. */

const NAV = [
  { icon: LayoutDashboard, label: "Хяналт", active: true },
  { icon: CreditCard, label: "Гүйлгээ" },
  { icon: Link2, label: "Төлбөрийн линк" },
] as const;

const NAV_FINANCE = [
  { icon: Landmark, label: "Данс" },
  { icon: BarChart3, label: "Тайлан" },
] as const;

const NAV_SETTINGS = [
  { icon: SlidersHorizontal, label: "Суваг" },
  { icon: Settings, label: "Тохиргоо" },
] as const;

const STATS = [
  { label: "Өнөөдрийн орлого", value: "₮1,254,000" },
  { label: "Амжилттай гүйлгээ", value: "96%" },
  { label: "Идэвхтэй линк", value: "12" },
  { label: "Холбогдсон суваг", value: "4" },
] as const;

const ROWS = [
  {
    id: "PAY-1024",
    channel: "Банкны апп",
    amount: "₮176,000",
    date: "2026-07-30 14:05",
    status: "Амжилттай",
    ok: true,
  },
  {
    id: "PAY-1023",
    channel: "Цахим хэтэвч",
    amount: "₮19,900",
    date: "2026-07-30 13:47",
    status: "Амжилттай",
    ok: true,
  },
  {
    id: "PAY-1022",
    channel: "QR төлбөр",
    amount: "₮52,500",
    date: "2026-07-30 13:12",
    status: "Хүлээгдэж буй",
    ok: false,
  },
] as const;

function SideItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px]",
        active
          ? "bg-white font-semibold text-[var(--color-foreground)] shadow-[0_1px_3px_rgba(10,10,10,0.1)]"
          : "text-[var(--color-muted)]",
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </div>
  );
}

function ChartSvg() {
  return (
    <svg viewBox="0 0 560 150" className="h-auto w-full" aria-hidden>
      {[25, 60, 95, 130].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="560"
          y2={y}
          stroke="var(--color-border)"
          strokeDasharray="3 5"
        />
      ))}
      <path
        d="M10 118 L88 92 L166 104 L244 66 L322 84 L400 38 L478 58 L550 22 L550 150 L10 150 Z"
        fill="url(#wire-chart-fill)"
        stroke="none"
      />
      <path
        d="M10 118 L88 92 L166 104 L244 66 L322 84 L400 38 L478 58 L550 22"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [10, 118],
        [88, 92],
        [166, 104],
        [244, 66],
        [322, 84],
        [400, 38],
        [478, 58],
        [550, 22],
      ].map(([x, y]) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r="3.5"
          fill="#fff"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
      ))}
      <defs>
        <linearGradient id="wire-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--color-primary)"
            stopOpacity="0.14"
          />
          <stop
            offset="100%"
            stopColor="var(--color-primary)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "screen-card grid overflow-hidden text-left lg:grid-cols-[190px_1fr]",
        className,
      )}
      aria-hidden
    >
      {/* sidebar */}
      <div className="hidden flex-col gap-4 border-r border-[var(--color-border)] bg-[var(--color-surface)]/60 p-3 lg:flex">
        <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-2.5 py-1.5">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold">
            <LogoMark className="size-4" />
            Wire Store
          </span>
          <ChevronsUpDown className="size-3 text-[var(--color-faint)]" />
        </div>
        <div className="flex items-center gap-2 px-2.5 text-[12px] text-[var(--color-faint)]">
          <Search className="size-3.5" />
          Хайх
        </div>
        <div>
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wide text-[var(--color-faint)] uppercase">
            Үйл ажиллагаа
          </p>
          <div className="space-y-0.5">
            {NAV.map((n) => (
              <SideItem
                key={n.label}
                icon={n.icon}
                label={n.label}
                active={"active" in n && n.active}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wide text-[var(--color-faint)] uppercase">
            Санхүү
          </p>
          <div className="space-y-0.5">
            {NAV_FINANCE.map((n) => (
              <SideItem key={n.label} icon={n.icon} label={n.label} />
            ))}
          </div>
        </div>
        <div>
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wide text-[var(--color-faint)] uppercase">
            Тохиргоо
          </p>
          <div className="space-y-0.5">
            {NAV_SETTINGS.map((n) => (
              <SideItem key={n.label} icon={n.icon} label={n.label} />
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-2.5 py-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[9px] font-bold text-[var(--color-primary)]">
            БТ
          </span>
          <span className="text-[11px] font-semibold">Б. Тэмүүлэн</span>
        </div>
      </div>

      {/* main */}
      <div className="bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
          <p className="text-[12px] text-[var(--color-muted)]">Хяналт</p>
          <div className="flex items-center gap-1.5">
            <span className="flex size-6 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-faint)]">
              <RefreshCw className="size-3" />
            </span>
            <span className="flex size-6 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-faint)]">
              <Plus className="size-3" />
            </span>
          </div>
        </div>

        <div className="grid gap-4 p-4 xl:grid-cols-[1fr_230px]">
          <div>
            <p className="text-[11px] text-[var(--color-muted)]">
              Энэ сарын орлого
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="tabular text-[26px] font-bold text-[var(--color-foreground)]">
                ₮48.2 сая
              </span>
              <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                <ArrowUpRight className="size-2.5" />
                23%
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-faint)]">
              Өмнөх сараас ₮9.1 саяар өссөн
            </p>
            <div className="mt-3">
              <ChartSvg />
              <div className="mt-1 flex justify-between text-[9px] text-[var(--color-faint)]">
                {[
                  "12 сар",
                  "1 сар",
                  "2 сар",
                  "3 сар",
                  "4 сар",
                  "5 сар",
                  "6 сар",
                  "7 сар",
                ].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-[12px] font-bold text-[var(--color-foreground)]">
              Сүүлийн гүйлгээ
            </p>
            <div className="mt-2 overflow-hidden rounded-xl border border-[var(--color-border)]">
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-1.5 text-[10px] text-[var(--color-faint)]">
                <span>Гүйлгээ</span>
                <span>Суваг</span>
                <span>Дүн</span>
                <span className="hidden sm:block">Огноо</span>
                <span>Төлөв</span>
              </div>
              {ROWS.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-2 border-b border-[var(--color-border)] px-3 py-2 text-[11px] last:border-b-0"
                >
                  <span className="tabular text-[10px]">{r.id}</span>
                  <span className="text-[var(--color-muted)]">{r.channel}</span>
                  <span className="tabular font-semibold">{r.amount}</span>
                  <span className="tabular hidden text-[10px] text-[var(--color-faint)] sm:block">
                    {r.date}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                      r.ok
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600",
                    )}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden flex-col gap-2.5 xl:flex">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
              >
                <p className="text-[10px] text-[var(--color-faint)]">
                  {s.label}
                </p>
                <p className="tabular mt-1 text-[18px] font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
