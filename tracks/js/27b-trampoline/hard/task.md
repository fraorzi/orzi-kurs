# Hard — spłaszczanie głębokiej struktury przez jawny stos

Zaimplementuj `flattenDeep(input)` — zwraca **płaską** tablicę wszystkich wartości
nie-tablicowych z dowolnie zagnieżdżonej tablicy, w kolejności wystąpienia (pre-order).

```js
flattenDeep([1, [2, [3, [4]]], 5]); // [1, 2, 3, 4, 5]
flattenDeep([]);                     // []
flattenDeep([[], [1], [[2]]]);       // [1, 2]
```

Zagnieżdżenie bywa **bardzo głębokie** (dane z zewnątrz). Rozwiązanie rekurencyjne
(`flatten(item)` wołające się dla każdego pod-elementu) przepełni stos:
`RangeError: Maximum call stack size exceeded`. Napisz wersję **iteracyjną** z **jawnym
stosem** (zwykłą tablicą) i pętlą `while`.

Test poda strukturę zagnieżdżoną na dziesiątki tysięcy poziomów — musi przejść, więc
rekurencja odpada.
