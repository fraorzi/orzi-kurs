# Medium — nieskończony iterable i leniwe `take`

Iterator liczy wartości na żądanie, więc iterable może być **nieskończony**, a konsument
bierze tylko tyle, ile potrzebuje. Zaimplementuj w `starter.js`:

## 1. `naturals()`

Zwróć **nieskończony** iterowalny obiekt wydający kolejne liczby naturalne: `1, 2, 3, ...`
(nigdy `done: true`).

## 2. `take(iterable, n)`

Zwróć tablicę **pierwszych `n`** elementów dowolnego iterable. Musi działać także na
nieskończonych iterables — pobieraj leniwie przez `next()` i zatrzymaj się po `n`
elementach albo gdy iterable się skończy (wcześniej).

```js
take(naturals(), 3);        // [1, 2, 3]
take([10, 20], 5);          // [10, 20]  — kończy się wcześniej niż n
take(new Set([1, 2, 3]), 2); // [1, 2]
take(naturals(), 0);        // []
```

Nie używaj spreadu `[...iterable]` na `naturals()` — to zawiesiłoby program.
