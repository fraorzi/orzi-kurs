## Hint 1

Fallback może przechowywać tablicę callbacków `() => void`. `use`, `adopt` i `defer`
różnią się tylko sposobem utworzenia callbacka.

## Hint 2

Przy `dispose` ustaw stan przed uruchomieniem cleanupów i zdejmuj callbacki przez
`pop()`. Zapamiętaj pierwszy błąd, ale nie przerywaj pętli.

## Hint 3

`move()` tworzy nowy fallback, przekazuje mu tablicę callbacków, czyści źródło i
oznacza je jako disposed. W fabryce sprawdź `typeof globalThis.DisposableStack`.
