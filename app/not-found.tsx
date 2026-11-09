"use client";

import NextError from "next/error";

// Requests that never reach a [locale] page (a missing file such as
// /missing.txt) end here, outside any localized layout.
export default function NotFound() {
  return (
    <html lang="mn">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
