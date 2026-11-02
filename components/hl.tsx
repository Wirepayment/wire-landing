/** Hl — the mint marker highlight for key phrases inside long copy: a
 *  half-height Mint Pulse stripe under the words, like a marker pen swipe.
 *  Use at most once per paragraph so the emphasis stays meaningful. */
export function Hl({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[3px] px-0.5 font-medium text-inherit [background:linear-gradient(transparent_58%,rgba(16,185,129,0.28)_58%)]">
      {children}
    </mark>
  );
}
