## Hint 1

Stan kontrolowanego inputu aktualizuj zwykłym `setQuery`. Nie umieszczaj tej
aktualizacji w `startTransition`.

## Hint 2

Uruchom asynchroniczną funkcję wewnątrz `startTransition(async () => ...)`.
Po `await` użyj jeszcze jednego `startTransition`, aby oznaczyć `setResults`.

## Hint 3

`isPending` może bezpośrednio sterować tekstem statusu. Nie czyść poprzednich
wyników przed rozpoczęciem requestu.

