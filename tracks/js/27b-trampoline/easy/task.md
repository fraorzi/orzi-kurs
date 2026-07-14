# Easy — trampolina i sumowanie bez przepełnienia stosu

## 1. `trampoline(fn)`

Zwróć funkcję opakowującą `fn`. Wywołana, ma odpalać `fn`, a dopóki wynik jest **funkcją**
(thunkiem) — wołać go w pętli, aż wynik przestanie być funkcją. Zwróć końcowy wynik.

```js
const step = trampoline((n) => (n > 0 ? () => step(n - 1) : "done"));
step(5); // "done"
```

## 2. `sumTo(n)`

Zwraca sumę `1 + 2 + ... + n` (dla `n <= 0` → `0`). Zaimplementuj ją **przez trampolinę**,
tak by działała dla dużych `n` **bez** `RangeError`.

```js
sumTo(5);      // 15
sumTo(100000); // 5000050000  (zwykła rekurencja by się tu wywaliła)
```

Wskazówka: napisz wewnętrzny krok z akumulatorem, który **zwraca thunk** `() => rec(n-1, acc+n)`
zamiast wołać `rec(...)` bezpośrednio, i owiń go w `trampoline`.
