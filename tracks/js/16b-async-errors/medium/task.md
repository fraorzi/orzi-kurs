# Medium - `collect`: częściowe błędy przez `allSettled`

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `collect(promises)` - funkcję async, która czeka na **wszystkie** promisy
(także te odrzucone) i zwraca podział na sukcesy i błędy:

```js
await collect([
  Promise.resolve(1),
  Promise.reject(new Error("a")),
  Promise.resolve(3),
]);
// { values: [1, 3], errors: [Error("a")] }
```

- `values` - wartości spełnionych promis, w kolejności wejścia,
- `errors` - przyczyny odrzuconych promis, w kolejności wejścia.

`Promise.all` odpadłby przy pierwszym błędzie i zgubił resztę wyników - użyj
`Promise.allSettled`, które nigdy się nie odrzuca i zwraca deskryptor każdej promisy
(`{ status: "fulfilled", value }` albo `{ status: "rejected", reason }`).
