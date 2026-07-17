# Debugowanie granic Next

Błędy App Routera często nie leżą w pojedynczej linijce, lecz na granicy dwóch
środowisk: HTML serwera i pierwszego renderu klienta, server i client module graph
albo static shell i runtime data.

Hydration wymaga identycznego pierwszego wyniku. Czas, locale, losowość i odczyt
`window` w renderze łatwo tworzą mismatch. Stabilną wartość prześlij z serwera,
a aktualizację zależną od przeglądarki wykonaj po hydratacji. Nie używaj
`suppressHydrationWarning` jako ogólnego wyciszenia błędów.

`"use client"` wyznacza granicę modułu i całego grafu jego importów. Dyrektywa w
barrelu może niechcący przeciągnąć wiele komponentów do klienta. Umieszczaj ją w
najwęższym interaktywnym liściu; serwerowy moduł oznacz `server-only`.

Przy Cache Components uncached/runtime data musi być cache'owane albo znaleźć się
pod widoczną dla nawigacji granicą Suspense. Granica umieszczona dopiero po `await`
niczego nie streamuje i może wywołać blocking route error.

## Kiedy używać

- Porównania HTML serwera z pierwszym renderem klienta przy hydration error.
- Audytu module graph od każdej dyrektywy `"use client"`.
- Przesuwania dynamicznego odczytu do małego komponentu pod Suspense.
- Minimalnej reprodukcji z wyłączonym cache tylko na czas diagnozy.

## Kiedy unikać

- Maskowania mismatch przez `suppressHydrationWarning` bez zrozumienia przyczyny.
- Dodania `"use client"` do całej strony, żeby „naprawić” hook.
- Owinięcia gotowego wyniku w Suspense po wcześniejszym `await`.
- Losowych timeoutów jako sposobu testowania streamingu.

## Pułapki

- Barrel z dyrektywą zmieniający klasyfikację wszystkich re-eksportów.
- `Date.now()` lub `Math.random()` w renderze klienta.
- Odczyt `cookies()` wysoko w layoucie bez lokalnej granicy.
- Naprawa build error przez cache danych spersonalizowanych między użytkownikami.

## Źródła

- <https://nextjs.org/docs/app/guides/preventing-flash-before-hydration>
- <https://nextjs.org/docs/app/getting-started/server-and-client-components>
- <https://nextjs.org/docs/messages/blocking-route>
- <https://nextjs.org/docs/app/guides/streaming#push-dynamic-access-down>
