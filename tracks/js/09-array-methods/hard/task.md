# Hard - zaimplementuj metody samodzielnie

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Napisz własne implementacje w `starter.js` - **bez używania** `map`/`filter`/`reduce`
(pętle są dozwolone i wskazane). Cel: rozumieć, co te metody robią pod spodem,
łącznie z brzegowymi przypadkami ze specyfikacji.

## 1. `myMap(arr, fn)`

Jak `Array.prototype.map`: nowa tablica, `fn(element, index, array)` dla każdego elementu.
Nie mutuje wejścia.

## 2. `myFilter(arr, fn)`

Jak `filter`: elementy, dla których `fn(element, index, array)` zwraca truthy.

## 3. `myReduce(arr, fn, initialValue?)`

Jak `reduce`, ze specyfikacyjnym zachowaniem:

- `fn(accumulator, element, index, array)`,
- z `initialValue`: start od indeksu 0, akumulator = `initialValue`,
- bez `initialValue`: akumulator = pierwszy element, start od indeksu 1,
- pusta tablica bez `initialValue` → **rzuć `TypeError`**.

Uwaga: `initialValue` może być `undefined` przekazane jawnie - rozróżnij „brak argumentu"
od „argument undefined" przez `arguments.length` lub rest parameters.

## 4. `uniqueFast(arr)`

Deduplikacja jak `unique` z poziomu medium, ale **w czasie liniowym** - będzie
benchmark. `includes`/`indexOf` w pętli dadzą O(n²) i test wydajności obleje.

```js
myMap([1, 2, 3], (x) => x * 2);            // [2, 4, 6]
myFilter([1, 2, 3, 4], (x) => x % 2 === 0); // [2, 4]
myReduce([1, 2, 3], (a, x) => a + x);       // 6
myReduce([], (a, x) => a + x);              // TypeError!
uniqueFast([1, 1, 2, 3, 2]);                // [1, 2, 3]
```
