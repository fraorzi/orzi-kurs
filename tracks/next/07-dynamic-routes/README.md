# Dynamiczne trasy i asynchroniczne parametry

Segment `[slug]` przechwytuje jedną część ścieżki, `[...slug]` co najmniej jedną,
a `[[...slug]]` również wariant bez segmentów. W Next 16 propsy `params` i
`searchParams` strony są promise'ami. Server Component odczytuje je przez `await`,
a Client Component może użyć Reactowego `use`.

Wartość z URL pozostaje niezaufanym wejściem. Typ `string` nie oznacza obsługiwanej
lokalizacji, istniejącego sluga ani bezpiecznej ścieżki. Po `await` należy wykonać
walidację runtime, zawęzić typ i dla nieistniejącego zasobu wywołać `notFound()`.

## Catch-all

Catch-all daje `string[]`, a optional catch-all `string[] | undefined`. Segmenty
warto dekodować osobno i odrzucać puste wartości, separatory oraz `.`/`..`, zanim
staną się częścią zapytania lub ścieżki storage. Nie sklejaj niezweryfikowanej
tablicy w ścieżkę systemu plików.

## `generateStaticParams`

`generateStaticParams` dostarcza próbki używane podczas prerenderu. Nie jest pełną
allow-listą runtime: pozostałe wartości mogą zostać obsłużone na pierwszym requeście,
o ile konfiguracja nie wymusza innego zachowania. Walidacja strony nadal jest
potrzebna, a build sprawdza tylko gałęzie wykonane dla dostarczonych próbek.

## Kiedy używać

- `[slug]` dla encji o jednym stabilnym identyfikatorze URL.
- Catch-all dla hierarchii o zmiennej głębokości.
- `generateStaticParams` dla popularnego lub skończonego podzbioru tras.
- `notFound()` po walidacji parametru lub braku rekordu.

## Pułapki

- Synchroniczny dostęp do `params.slug` skopiowany z Next 14.
- Typowanie optional catch-all jako zawsze istniejącej tablicy.
- Rzutowanie dowolnego stringa na unię `Locale` bez walidacji.
- Uznanie `generateStaticParams` za zabezpieczenie przed innymi URL-ami.
- Niezdekodowane lub podwójnie dekodowane segmenty i path traversal.
- Test wywołujący async page jako zwykłą funkcję sprawdza kontrakt danych, nie cały
  runtime RSC; zachowanie trasy i 404 wymaga również E2E w projekcie.

## Źródła

- <https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes>
- <https://nextjs.org/docs/app/api-reference/file-conventions/page>
- <https://nextjs.org/docs/app/api-reference/functions/generate-static-params>
- <https://nextjs.org/docs/app/api-reference/functions/not-found>
