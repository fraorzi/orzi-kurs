# Upload Strapi i Next Image

## Kontekst

Strapi po uploadzie zwraca metadane assetu (`url`, `width`, `height`,
`alternativeText`) — surowe i częściowo niezaufane: URL bywa względny, alt
bywa `null`. `next/image` wymaga jawnych `width`/`height` i akceptuje
obrazy tylko z zaufanych originów.

## Wymagania

- `imageDescriptor(asset, origin)` zwraca `{ src, width, height, alt }`
  gotowe dla `next/image`.
- `width`/`height` muszą być liczbami całkowitymi ≥1; inaczej rzuć błąd,
  zanim cokolwiek zwrócisz.
- `asset.url` rozwiąż względem `origin`; jeśli wynikowy origin różni się od
  `origin`, rzuć błąd — obcy origin nie trafia do `src`.
- `alt` to `alternativeText` po przycięciu białych znaków; brak lub `null`
  daje pusty string, nigdy `undefined`.

## Kryteria akceptacji

- Względny i bezwzględny URL z zaufanego originu dają poprawny `src`.
- URL spoza `origin` rzuca błąd zawierający "origin".
- Wymiary `0`, ujemne lub niecałkowite rzucają błąd zawierający
  "dimensions".
- Brak `alternativeText` daje `alt: ""`, nie `undefined`.
