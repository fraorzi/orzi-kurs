# Medium - retry i allSettledLite

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `retry(fn, attempts)`

`fn` to funkcja zwracająca promise. Wywołuj ją do skutku, maksymalnie `attempts` razy:

- pierwszy sukces → zwróć jego wynik, **bez kolejnych wywołań**,
- wszystkie `attempts` prób padły → odrzuć **ostatnim** błędem.

```js
let n = 0;
const flaky = () => (++n < 3 ? Promise.reject(new Error("boom")) : Promise.resolve("ok"));

await retry(flaky, 5); // "ok" (fn wywołane 3 razy)
await retry(() => Promise.reject(new Error("always")), 2); // rzuca "always" po 2 próbach
```

## 2. `allSettledLite(promises)`

Własna implementacja `Promise.allSettled` - **bez używania** `Promise.allSettled`:

- czeka na ustalenie wszystkich wejść,
- nigdy nie odrzuca,
- zwraca tablicę w kolejności wejścia:
  `{ status: "fulfilled", value }` lub `{ status: "rejected", reason }`,
- wejścia nie będące promisami traktuje jak `Promise.resolve(x)`.

```js
await allSettledLite([Promise.resolve(1), Promise.reject(new Error("x")), 7]);
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: Error("x") },
//   { status: "fulfilled", value: 7 },
// ]
```
