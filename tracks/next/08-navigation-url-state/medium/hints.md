## Hint 1

Skopiuj `useSearchParams()` przez `new URLSearchParams(searchParams.toString())`.

## Hint 2

Odczytaj query z `new FormData(event.currentTarget)` i znormalizuj `.trim()`.

## Hint 3

Zbuduj URL jako `params.size ? pathname + "?" + params : pathname` i użyj `replace`.
