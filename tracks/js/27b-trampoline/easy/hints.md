## Hint 1

`trampoline` to pętla, która „rozwija" thunki:

```js
export function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}
```

## Hint 2

Krok `sumTo` musi **zwracać thunk**, a nie wołać siebie. Akumulator `acc` niesie sumę:

```js
export const sumTo = trampoline(function rec(n, acc = 0) {
  if (n <= 0) return acc;
  return () => rec(n - 1, acc + n); // thunk, nie rec(n - 1, acc + n)
});
```

Gdybyś napisał `return rec(n - 1, acc + n)` (bez `() =>`), rekurencja znów rosłaby na stosie
i `sumTo(100000)` rzuciłby `RangeError`. To właśnie thunk + pętla `while` chronią stos.
