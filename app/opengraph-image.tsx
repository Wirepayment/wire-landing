import { ImageResponse } from "next/og";

/* Branded social share card (Open Graph + Twitter / FB / LinkedIn).
 * "Clear sky" look mirroring the landing hero: white paper, mint cloud
 * glow, serif Cyrillic headline (Playfair Display subset fetched at
 * render), Rubik UI voice, gradient pill CTA and a floating mini
 * dashboard card. Satori has no <text> SVG support — everything is
 * flex divs + shape SVGs. */

export const alt = "wire.mn — All-in-one Payment Gateway";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MINT = "#10B981";
const MINT_DEEP = "#059669";
const MINT_BRIGHT = "#2fd695";
const INK = "#0a0a0a";
const MUTED = "#50504a";
const FAINT = "#82827a";
const BORDER = "#e5e9e3";
const PAPER = "#fdfdfc";

const BADGE = "All-in-one Payment Gateway";
const HEADLINE1 = "Бүх төлбөр,";
const HEADLINE2 = "нэг гарцаар.";
const SUB = "Банкны апп · хэтэвч · зээлийн суваг — нэг холболтоор.";
const CTA = "Эхлэх";

/** loadFont pulls one weight of a Google font, subset to exactly the glyphs
 *  we render (Cyrillic-safe; the built-in OG font is Latin-only). */
async function loadFont(family: string, text: string, weight: number) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const fontUrl = css.match(
      /src: url\((.+?)\) format\('(?:woff2?|truetype|opentype)'\)/,
    )?.[1];
    if (!fontUrl) return null;
    const res = await fetch(fontUrl);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

function LogoMark({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 2048 2048" fill={MINT}>
      <path d="M 1513.66 643.044 C 1700.82 641.135 1857.8 774.467 1856.04 967.028 C 1851.33 1250.53 1496.68 1378.09 1302.73 1178.08 C 1259.08 1133.06 1217.07 1053.75 1218.04 990.57 L 956.332 990.57 C 928.355 1022.69 896.812 1051.51 867.66 1082.46 L 631.309 1329.58 C 613.539 1348.13 582.684 1349.01 580.623 1323.71 C 578.946 1303.12 579.903 1279.93 579.922 1258.53 L 579.881 1115.95 L 262.502 1116.02 C 249.907 1116.14 234.932 1117.44 223.159 1116.09 C 199.419 1113.05 186.39 1081.38 204.948 1064.29 C 218.808 1051.52 251.346 1055.07 269.979 1055.07 L 579.881 1055.08 C 648.922 1054.62 641.553 1061.39 641.565 1128.46 L 641.531 1231.83 C 653.841 1219.83 667.854 1203.28 680.362 1190.44 L 857.863 1008.66 C 863.845 1002.66 869.402 997.222 874.742 990.57 C 794.39 989.115 711.645 992.747 631.262 989.284 C 622.836 988.476 610.156 978.381 609.603 969.741 C 605.783 910.024 609.247 846.955 608.067 787.27 C 541.066 850.607 478.67 923.7 411.09 986.899 C 402.793 994.658 238.383 990.402 218.614 989.422 C 193.624 988.183 184.994 933.014 222.701 929.737 C 239.951 928.628 258.52 929.246 276.182 929.255 L 388.575 929.313 C 433.987 876.774 488.794 824.066 537.482 774.259 L 587.777 722.947 C 599.369 711.011 619.764 684.643 637.078 683.729 C 681.371 681.392 669.005 752.953 669.007 783.225 L 668.963 929.313 L 1218.04 929.313 C 1249.83 771.17 1343.23 658.972 1513.66 643.044 z M 1559.61 1216.22 C 1700.98 1202.77 1804.59 1077.13 1790.86 935.79 C 1777.13 794.45 1651.27 691.097 1509.96 705.112 C 1369.05 719.087 1266.06 844.504 1279.75 985.443 C 1293.44 1126.38 1418.65 1229.63 1559.61 1216.22 z" />
      <path d="M 1591.73 790.913 C 1594.17 795.335 1553.93 911.61 1549.74 929.313 L 1675.17 929.313 L 1509.17 1099.7 C 1500.27 1109.02 1491.56 1119.65 1482.64 1128.5 C 1486.07 1100.78 1517.53 1024.17 1526.91 990.57 C 1486.66 991.96 1438.25 990.602 1397.4 990.57 C 1402.59 983.272 1415.3 971.347 1422.17 964.19 L 1558.55 823.795 C 1568.27 813.996 1581.7 799.218 1591.73 790.913 z" />
    </svg>
  );
}

export default async function Image() {
  const serifText = HEADLINE1 + HEADLINE2;
  const rubikText = BADGE + SUB + CTA + "wire.mn Хяналт ₮48.2 сая +23%→";
  const [serif, rubik400, rubik600] = await Promise.all([
    loadFont("Playfair Display", serifText, 600),
    loadFont("Rubik", rubikText, 400),
    loadFont("Rubik", rubikText, 600),
  ]);
  const fonts = [
    serif && {
      name: "Playfair Display",
      data: serif,
      weight: 600 as const,
      style: "normal" as const,
    },
    rubik400 && {
      name: "Rubik",
      data: rubik400,
      weight: 400 as const,
      style: "normal" as const,
    },
    rubik600 && {
      name: "Rubik",
      data: rubik600,
      weight: 600 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600;
    style: "normal";
  }[];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: PAPER,
        fontFamily: "Rubik, sans-serif",
        position: "relative",
      }}
    >
      {/* mint cloud glow */}
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: -180,
          width: 760,
          height: 560,
          display: "flex",
          borderRadius: 400,
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.35) 0%, rgba(79,240,192,0.18) 55%, rgba(79,240,192,0) 100%)",
        }}
      />
      {/* left column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 64px 76px",
          width: 720,
        }}
      >
        {/* lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LogoMark size={52} />
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-1px",
              color: INK,
            }}
          >
            wire<span style={{ color: MINT }}>.mn</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* badge pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              border: `1.5px solid ${BORDER}`,
              borderRadius: 999,
              background: "rgba(255,255,255,0.85)",
              padding: "10px 22px",
              fontSize: 22,
              fontWeight: 600,
              color: MUTED,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 99,
                background: MINT,
              }}
            />
            {BADGE}
          </div>

          {/* serif headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontFamily: "'Playfair Display', serif",
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-3px",
              color: INK,
              lineHeight: 1.06,
            }}
          >
            <div style={{ display: "flex" }}>{HEADLINE1}</div>
            <div style={{ display: "flex" }}>{HEADLINE2}</div>
          </div>

          {/* sub */}
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              fontWeight: 400,
              color: MUTED,
              maxWidth: 580,
              lineHeight: 1.45,
            }}
          >
            {SUB}
          </div>

          {/* gradient pill CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              alignSelf: "flex-start",
              marginTop: 34,
              borderRadius: 999,
              padding: "16px 38px",
              background: `linear-gradient(180deg, ${MINT_BRIGHT} 0%, ${MINT_DEEP} 100%)`,
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 600,
              boxShadow: "0 12px 40px rgba(16,185,129,0.35)",
            }}
          >
            {CTA}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* right: floating mini dashboard card on the glow */}
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 150,
          width: 380,
          display: "flex",
          flexDirection: "column",
          borderRadius: 24,
          border: "1.5px solid rgba(255,255,255,0.9)",
          background: "rgba(255,255,255,0.95)",
          boxShadow:
            "0 2px 6px rgba(10,10,10,0.06), 0 40px 90px rgba(6,122,87,0.25)",
          padding: "28px 30px",
        }}
      >
        <div style={{ display: "flex", fontSize: 19, color: FAINT }}>
          Энэ сарын орлого
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-1px",
              color: INK,
            }}
          >
            ₮48.2 сая
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: 999,
              background: "#dcf3e8",
              color: MINT_DEEP,
              fontSize: 18,
              fontWeight: 600,
              padding: "4px 12px",
            }}
          >
            +23%
          </div>
        </div>
        <svg
          width="320"
          height="120"
          viewBox="0 0 320 120"
          style={{ marginTop: 18 }}
        >
          <path
            d="M6 96 L50 74 L94 84 L138 52 L182 64 L226 28 L270 44 L314 14 L314 120 L6 120 Z"
            fill="rgba(16,185,129,0.12)"
          />
          <path
            d="M6 96 L50 74 L94 84 L138 52 L182 64 L226 28 L270 44 L314 14"
            fill="none"
            stroke={MINT}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="314"
            cy="14"
            r="7"
            fill="#fff"
            stroke={MINT}
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>,
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
