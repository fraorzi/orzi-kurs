# Easy — część wspólna i suma (wbudowane metody Set)

Użyj wbudowanych metod `Set` (ES2025). Obie funkcje dostają dwie tablice **liczb** i zwracają
tablicę wyników posortowaną rosnąco.

## 1. `common(a, b)`

Elementy obecne w **obu** tablicach (część wspólna, bez duplikatów).

```js
common([1, 2, 3, 4], [3, 4, 5]); // [3, 4]
common([1, 2], [9]);             // []
```

## 2. `combined(a, b)`

Wszystkie unikalne elementy z obu tablic (suma zbiorów).

```js
combined([1, 2, 3], [3, 4]); // [1, 2, 3, 4]
```

Pamiętaj o typie argumentu przyjmowanego przez metody `Set` i o numerycznym porządku wyniku.
