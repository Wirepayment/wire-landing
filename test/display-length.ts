// Length as search results and answer snippets see it: a Chinese, Japanese
// or Korean character takes about the width of two Latin letters, so the
// length limits written for Mongolian and English hold for zh and ko too.
const WIDE =
  /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}　-〿＀-｠]/u;

export function displayLength(s: string): number {
  let n = 0;
  for (const ch of s) n += WIDE.test(ch) ? 2 : 1;
  return n;
}
