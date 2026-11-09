import { createHash } from "node:crypto";

// Public copy must not name competitors or operators that are not Wire
// connectors (CLAUDE.md rule #9). Owner decision 2026-11-08: wire.mn names the
// six live connectors (lib/connectors.ts — QPay, PayLink, StorePay, Toki,
// MonPay, Pocket Zero) and shows their logos, so those names are NOT in the
// lists below; every other operator, bank, processor and competitor stays
// forbidden. Card schemes (Visa, Mastercard) are not operators and stay
// allowed.
//
// This repo is public, so the guard lists the names it forbids as hashes, not
// in clear: a guard that spells out every competitor would itself break the
// rule.
//
// Matching: the text is split into words; a word, or two adjacent words
// joined with or without a space, is checked against EXACT (Latin names,
// whole word) and against PREFIX (Cyrillic names, so inflected forms such as
// a genitive suffix still match). To add a name: sha256 of its lowercase
// form, first 16 hex chars. Never add a connector name here — the connector
// test in brand-names.test.ts fails if one comes back.
//
// A Latin name glued to Chinese or Korean ("<name>银行", "<name>은행") is
// still its own word: a word is also split where it changes between CJK and
// any other script.
const EXACT = new Set([
  "2bed2032ed3d8300",
  "6ecdcb213b610b7e",
  "b09d3966dc6f7664",
  "dd3901003412e4d7",
  "40d8f598b47ca059",
  "fcb248ee6d38bd1b",
  "c6a6ea89bb6fef43",
  "1b2455e9fef29158",
  "724ec1a3f9b8f747",
  // Large Chinese and Korean wallets, Latin spelling (2026-11-09).
  "88e2cce43eeadb36",
  "14f0d48d7dd34e0a",
  "0c4c7aab82ab323c",
  "f9eca8105b04d377",
  "43fdb591888f1ddc",
]);
const PREFIX: ReadonlyArray<readonly [number, string]> = [
  [9, "31253c0edd03f09b"],
  [6, "04e96df006b89754"],
  [5, "c4ae74439b213d32"],
  [10, "f959a7522ceef870"],
];

// Chinese and Korean names (2026-11-09, spec §7.7). CJK text has no spaces
// between words and Korean adds particles straight onto a name, so these
// match as a substring of a CJK word. A name may also be written with a
// space inside it; such a hit counts only when it starts where a word starts
// and ends where a word ends (or only a particle follows), so word ends glued
// to the next word ("<…pay>" + "지" = "page") are not names. Two groups: the
// large Chinese and Korean QR/wallet brands, and the Chinese/Korean spellings
// of the Mongolian banks and operators forbidden above. Hash the name the
// same way. A name longer than CJK_MAX_LENGTH characters never matches —
// raise the cap (and its test) before adding one.
const CJK_SUBSTRING = new Set([
  // Chinese and Korean wallets, in Chinese.
  "276a8bc458036a1a",
  "064464bf647781a6",
  "358f6064aa4e1b11",
  "6419de732fece5d6",
  "ea931069265d4827",
  // Chinese and Korean wallets, in Korean.
  "e92001560a056721",
  "d5fe34e33cb5cfc7",
  "70565e85e760736e",
  "12cb57b5e43c757b",
  "a631da0b426f6b83",
  "a19f35281d68cf84",
  "17711f1f7a392eb7",
  // Forbidden Mongolian banks and operators, in Chinese.
  "f1d6c001e8dd3717",
  "03b4dc4d5db69690",
  "eff6a83eaeb33a7e",
  // Forbidden Mongolian banks and operators, in Korean.
  "557da4dd5e56b85a",
  "996a3d003b857418",
  "5095d39ef9d1bd4e",
  "0b9ac9fc0e68b8fa",
  "b8d35fd0f44d82e9",
  "691762587374f7ab",
  "5e738c8499b1bf36",
  "f66b748f453bd4b2",
  "4fd555c72cdee0a1",
  "d843223bab87074a",
]);
export const CJK_MAX_LENGTH = 8;

const CJK =
  "\\p{Script=Han}\\p{Script=Hangul}\\p{Script=Hiragana}\\p{Script=Katakana}";
// CJK words separated only by whitespace: one run, checked across the spaces.
const CJK_RUN = new RegExp(`[${CJK}]+(?:\\s+[${CJK}]+)*`, "gu");
// Korean particles that may follow a name written with a space.
const PARTICLES = new Set([
  "은",
  "는",
  "이",
  "가",
  "을",
  "를",
  "로",
  "으로",
  "와",
  "과",
  "의",
  "에",
  "에서",
  "도",
  "만",
]);
const SCRIPT_PIECE = new RegExp(`[${CJK}]+|[^${CJK}]+`, "gu");

const digest = (s: string) =>
  createHash("sha256").update(s).digest("hex").slice(0, 16);

function latinOrCyrillicHit(candidate: string): boolean {
  if (EXACT.has(digest(candidate))) return true;
  const chars = [...candidate];
  return PREFIX.some(
    ([n, h]) => chars.length >= n && digest(chars.slice(0, n).join("")) === h,
  );
}

/** Forbidden CJK names in text. A hit inside one word always counts (Korean
 *  glues particles onto a name); a hit across a space must start at a word
 *  start and end at a word end, or be followed only by a particle. */
function cjkHits(text: string): string[] {
  const hits: string[] = [];
  for (const [run] of text.matchAll(CJK_RUN)) {
    const words = run.split(/\s+/).map((w) => [...w]);
    const chars = words.flat();
    const wordOf = words.flatMap((w, k) => w.map(() => k));
    const startsWord = (i: number) => i === 0 || wordOf[i] !== wordOf[i - 1];
    /** What follows position `end` in its word ("" at a word end). */
    const rest = (end: number) => {
      const k = wordOf[end - 1]!;
      return words[k]!.slice(end - wordOf.indexOf(k)).join("");
    };
    for (let i = 0; i < chars.length; i++) {
      for (let n = 1; n <= CJK_MAX_LENGTH && i + n <= chars.length; n++) {
        const end = i + n;
        const sub = chars.slice(i, end).join("");
        if (!CJK_SUBSTRING.has(digest(sub))) continue;
        const oneWord = wordOf[i] === wordOf[end - 1];
        const after = rest(end);
        if (
          oneWord ||
          (startsWord(i) && (after === "" || PARTICLES.has(after)))
        )
          hits.push(sub);
      }
    }
  }
  return hits;
}

/** Every forbidden brand name found in text (empty when the copy is clean). */
export function brandNames(text: string): string[] {
  const lower = text.toLowerCase();
  const words = lower
    .split(/[^\p{L}\p{N}]+/u)
    .flatMap((w) => w.match(SCRIPT_PIECE) ?? []);
  const hits = new Set<string>(cjkHits(lower));
  words.forEach((word, i) => {
    const next = words[i + 1];
    const candidates = next ? [word, word + next, `${word} ${next}`] : [word];
    // One hit per word: the shortest candidate that matches.
    const hit = candidates.find(latinOrCyrillicHit);
    if (hit) hits.add(hit);
  });
  return [...hits];
}
