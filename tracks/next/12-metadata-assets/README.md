# Metadata i optymalizacja zasobów

Next składa metadata z layoutów i stron. Stałe dane eksportuj jako typowany obiekt
`Metadata`, a dane zależne od trasy przez asynchroniczne `generateMetadata`.
`params` nadal jest Promise. Dla nieistniejącej lub prywatnej encji ustaw `noindex`
i nie generuj karty społecznościowej ujawniającej dane.

Metadata i `generateMetadata` są dostępne tylko w Server Components. Specjalne pliki
`opengraph-image`, `icon`, `robots` i `sitemap` mogą być statyczne albo generowane.
Dynamiczny OG przez `ImageResponse` powinien deklarować rozmiar i content type.

## Image, Font i Script

`next/image` wymaga znanego aspect ratio: statyczny import dostarcza wymiary, a
zdalny URL potrzebuje `width`/`height` lub kontrolowanego `fill`. `sizes` pozwala
przeglądarce pobrać właściwy wariant. Remote patterns powinny ograniczać protokół,
host, path i — gdy możliwe — query.

`next/font` self-hostuje pliki i ogranicza layout shift. Font globalny stosuj w root
layout, a lokalny tylko w potrzebnym segmencie. `next/script` umieszczaj w
najwęższym page/layout; `lazyOnload` pasuje do niekrytycznej analityki. `worker` jest
eksperymentalny i nie działa obecnie z App Routerem.

## Kiedy używać

- `generateMetadata` dla tytułu, canonicala i OG zależnych od encji.
- File conventions dla ikon, robots, sitemap i kart społecznościowych.
- `Image` dla treściowych obrazów z poprawnym alt i stabilnym ratio.
- `next/font` zamiast runtime requestu do zewnętrznego CDN fontów.
- `Script` w najniższym wspólnym layoucie wymagających tras.

## Pułapki

- Metadata w Client Component.
- Brak noindex dla nieistniejącego lub prywatnego zasobu.
- Pusty alt dla obrazu niosącego informację albo opisowy alt dla dekoracji.
- Szeroki wildcard remote images umożliwiający kosztowne proxy obcych hostów.
- Skrypt analityczny w root layout, choć dotyczy jednego panelu.
- Inline Script bez stabilnego `id`.
- Dynamiczny font lub skrypt blokujący interakcję bez potrzeby.

## Źródła

- <https://nextjs.org/docs/app/getting-started/metadata-and-og-images>
- <https://nextjs.org/docs/app/getting-started/images>
- <https://nextjs.org/docs/app/getting-started/fonts>
- <https://nextjs.org/docs/app/guides/scripts>
