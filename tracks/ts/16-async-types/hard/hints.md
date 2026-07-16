## Hint 1

Utwórz `results = new Array<Result>(items.length)` i wspólny licznik `nextIndex`.

## Hint 2

Uruchom `Math.min(limit, items.length)` asynchronicznych pętli przez `Promise.all`.

## Hint 3

Każda pętla przed pobraniem kolejnego indeksu wywołuje `signal?.throwIfAborted()`.
