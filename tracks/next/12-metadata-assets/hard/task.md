# Rozmieść font, skrypt i dynamiczny OG

Napraw wieloplikowy feature:

- root layout używa lokalnego fontu `./InterVariable.woff2` na `<html>`,
- analityka jest tylko w dashboard layout przez `next/script` ze stabilnym `id`,
  `strategy="lazyOnload"` i przekazanym `src`, nie w root,
- `opengraph-image.tsx` deklaruje 1200×630, `image/png`, czeka na params i zwraca
  `ImageResponse` z tytułem produktu.

Nie używaj eksperymentalnej strategii `worker`.
