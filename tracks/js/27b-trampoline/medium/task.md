# Medium - rekurencja wzajemna na trampolinie

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Klasyczny przykład, którego nie da się łatwo zamienić na pętlę: dwie funkcje wołające się
nawzajem. `isEven(n)` woła `isOdd(n-1)`, `isOdd(n)` woła `isEven(n-1)`. Dla dużych `n`
naiwna wersja przepełnia stos.

Zaimplementuj `isEven(n)` i `isOdd(n)` (dla całkowitych `n >= 0`) **przez trampolinę**, tak by
działały dla dużych `n` bez `RangeError`.

```js
isEven(0);      // true
isOdd(0);       // false
isEven(10);     // true
isOdd(7);       // true
isEven(100000); // true   (naiwna rekurencja wzajemna by się wywaliła)
```
