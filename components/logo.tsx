import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LogoMark — the official Wire glyph (assets/recraft/wire-mark-clean.svg):
 * a lightning bolt fused with a circular node, signalling current routing
 * transactions through the gateway. Defaults to Mint Pulse via currentColor.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2048 2048"
      className={cn("size-7 text-[var(--color-primary)]", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M 1513.66 643.044 C 1700.82 641.135 1857.8 774.467 1856.04 967.028 C 1851.33 1250.53 1496.68 1378.09 1302.73 1178.08 C 1259.08 1133.06 1217.07 1053.75 1218.04 990.57 L 956.332 990.57 C 928.355 1022.69 896.812 1051.51 867.66 1082.46 L 631.309 1329.58 C 613.539 1348.13 582.684 1349.01 580.623 1323.71 C 578.946 1303.12 579.903 1279.93 579.922 1258.53 L 579.881 1115.95 L 262.502 1116.02 C 249.907 1116.14 234.932 1117.44 223.159 1116.09 C 199.419 1113.05 186.39 1081.38 204.948 1064.29 C 218.808 1051.52 251.346 1055.07 269.979 1055.07 L 579.881 1055.08 C 648.922 1054.62 641.553 1061.39 641.565 1128.46 L 641.531 1231.83 C 653.841 1219.83 667.854 1203.28 680.362 1190.44 L 857.863 1008.66 C 863.845 1002.66 869.402 997.222 874.742 990.57 C 794.39 989.115 711.645 992.747 631.262 989.284 C 622.836 988.476 610.156 978.381 609.603 969.741 C 605.783 910.024 609.247 846.955 608.067 787.27 C 541.066 850.607 478.67 923.7 411.09 986.899 C 402.793 994.658 238.383 990.402 218.614 989.422 C 193.624 988.183 184.994 933.014 222.701 929.737 C 239.951 928.628 258.52 929.246 276.182 929.255 L 388.575 929.313 C 433.987 876.774 488.794 824.066 537.482 774.259 L 587.777 722.947 C 599.369 711.011 619.764 684.643 637.078 683.729 C 681.371 681.392 669.005 752.953 669.007 783.225 L 668.963 929.313 L 1218.04 929.313 C 1249.83 771.17 1343.23 658.972 1513.66 643.044 z M 1559.61 1216.22 C 1700.98 1202.77 1804.59 1077.13 1790.86 935.79 C 1777.13 794.45 1651.27 691.097 1509.96 705.112 C 1369.05 719.087 1266.06 844.504 1279.75 985.443 C 1293.44 1126.38 1418.65 1229.63 1559.61 1216.22 z" />
      <path d="M 1591.73 790.913 C 1594.17 795.335 1553.93 911.61 1549.74 929.313 L 1675.17 929.313 L 1509.17 1099.7 C 1500.27 1109.02 1491.56 1119.65 1482.64 1128.5 C 1486.07 1100.78 1517.53 1024.17 1526.91 990.57 C 1486.66 991.96 1438.25 990.602 1397.4 990.57 C 1402.59 983.272 1415.3 971.347 1422.17 964.19 L 1558.55 823.795 C 1568.27 813.996 1581.7 799.218 1591.73 790.913 z" />
    </svg>
  );
}

/** Logo — the mint pulse-W icon tile (kie.ai-generated, `public/brand/
 *  wire-icon.png`) + "wire" wordmark in the rounded header voice (Comfortaa). */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/brand/wire-icon.png"
        alt=""
        width={256}
        height={256}
        priority
        className="size-7 rounded-[8px] mix-blend-multiply"
      />
      <span className="font-[family-name:var(--font-round)] text-[19px] font-bold tracking-tight text-[var(--color-foreground)]">
        wire
      </span>
    </div>
  );
}

/** Wordmark — full "wire.mn" lockup (final letter in Mint Pulse) per brand book. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-round)] text-2xl font-bold tracking-tight text-[var(--color-foreground)]",
        className,
      )}
    >
      wire.m<span className="text-[var(--color-primary)]">n</span>
    </span>
  );
}
