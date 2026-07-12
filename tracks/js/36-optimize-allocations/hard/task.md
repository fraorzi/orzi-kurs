# Hard [O] — removeAll: filter w reduce → jeden filter z Set

`removeAll(arr, toRemove)` zwraca nową tablicę z `arr` bez wartości występujących w
`toRemove`, zachowując kolejność.

Kod jest **poprawny**, ale wolny: w `reduce` dla **każdej** usuwanej wartości robi pełny
`filter` całej tablicy (tworząc przy tym kolejną tablicę pośrednią) — O(k·n). Testy
poprawności przechodzą — obleje benchmark. Przepisz na **jedno** przejście.

```js
removeAll([1, 2, 3, 2, 4], [2, 4]); // [1, 3]
removeAll([1, 2, 3], []);           // [1, 2, 3]
removeAll([], [1]);                 // []
```

Podpowiedź kierunkowa: co pozwala w jednym `filter` sprawdzić „czy tę wartość usuwamy"
w czasie stałym?
