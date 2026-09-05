# Easy - deduplikacja (Set) i zliczanie (Map)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `unique(arr)` - Set

Zwróć nową tablicę z **unikalnymi** elementami wejścia, w kolejności pierwszych wystąpień.
Użyj `Set`. (Ćwiczenie „Filter unique array members" z javascript.info.)

```js
unique(["Hare", "Krishna", "Hare", "Krishna", ":-O"]); // ["Hare", "Krishna", ":-O"]
unique([1, 1, 2, 3, 2]);                                // [1, 2, 3]
unique([NaN, NaN]);                                     // [NaN] - Set traktuje NaN jako równe
```

## 2. `countWords(words)` - Map

Zwróć `Map`, w której kluczem jest słowo, a wartością liczba jego wystąpień w tablicy
`words`. Kolejność kluczy = kolejność pierwszego wystąpienia.

```js
countWords(["a", "b", "a", "a"]);
// Map { "a" => 3, "b" => 1 }
countWords([]); // Map {}
```
