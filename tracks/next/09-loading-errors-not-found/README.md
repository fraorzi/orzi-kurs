# Loading, expected errors i granice awarii

`loading.tsx` tworzy Suspense boundary dla segmentu, daje natychmiastowy fallback i
umożliwia częściowy prefetch dynamicznej trasy. Fallback powinien zachowywać układ,
komunikować stan technologiom asystującym i nie udawać gotowych kontrolek.

Błędy oczekiwane — walidacja, konflikt biznesowy, odrzucona płatność — są częścią
normalnego przepływu. Server Action powinien zwrócić typowany stan, który UI potrafi
pokazać. Rzucanie ich do `error.tsx` usuwa kontekst formularza i miesza zachowanie
produktu z nieoczekiwaną awarią.

## Error Boundary i not-found

`error.tsx` jest Client Component. W Next 16 otrzymuje `error` oraz
`unstable_retry`, które ponownie próbuje wyrenderować segment. Nieoczekiwany błąd
warto raportować w efekcie z digestem, a fallback powinien oferować zrozumiały krok
naprawczy.

Brak encji to nie awaria infrastruktury. `notFound()` kończy render segmentu i
wybiera najbliższy `not-found.tsx`, gdzie użytkownik powinien dostać drogę powrotu.
Błędy bąbelkują do najbliższej nadrzędnej granicy; granularity odpowiada zakresowi,
który da się sensownie odzyskać.

## Kiedy używać

- `loading.tsx` dla page-level nawigacji i częściowego prefetchu.
- Typowanego wyniku dla oczekiwanych błędów Action.
- `error.tsx` dla nieoczekiwanych wyjątków renderowania segmentu.
- `notFound()` i `not-found.tsx` dla nieistniejącego zasobu.
- `global-error.tsx` tylko dla awarii root layoutu; musi zawierać `html` i `body`.

## Pułapki

- Rzucanie błędu dla zwykłej walidacji formularza.
- Brak `"use client"` w `error.tsx`.
- Używanie historycznego propsa `reset`, gdy lokalne docs 16.2 opisują
  `unstable_retry`.
- Logowanie podczas renderu i wielokrotne raporty przy każdym rerenderze.
- Spinner bez nazwy lub live regionu.
- Error Boundary nie przechwytuje zwykłych błędów z event handlerów po renderze.

## Źródła

- <https://nextjs.org/docs/app/getting-started/error-handling>
- <https://nextjs.org/docs/app/api-reference/file-conventions/loading>
- <https://nextjs.org/docs/app/api-reference/file-conventions/error>
- <https://nextjs.org/docs/app/api-reference/file-conventions/not-found>
