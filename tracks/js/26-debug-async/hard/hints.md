## Hint 1

Pętla `for..of` z `await` uruchamia kolejne pobranie dopiero po zakończeniu poprzedniego
(maxActive = 1). Żeby puścić je równolegle, wystartuj wszystkie naraz i poczekaj na
komplet: `Promise.all(ids.map(fetchOne))`.

## Hint 2

```js
export async function fetchAll(ids, fetchOne) {
  return Promise.all(ids.map(fetchOne));
}
```

`ids.map(fetchOne)` startuje wszystkie pobrania od razu (dostajesz tablicę obietnic),
a `Promise.all` czeka na wszystkie i zwraca wyniki **w kolejności wejścia** — dokładnie
tego oczekuje test kolejności.
