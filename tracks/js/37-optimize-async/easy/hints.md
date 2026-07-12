## Hint 1

Pętla `for` z `await` uruchamia kolejne `loadOne` dopiero po zakończeniu poprzedniego
(maxActive = 1). Wystartuj wszystkie naraz i poczekaj na komplet: `Promise.all(ids.map(loadOne))`.

## Hint 2

```js
export async function loadAll(ids, loadOne) {
  return Promise.all(ids.map(loadOne));
}
```

`ids.map(loadOne)` startuje wszystkie operacje od razu (tablica obietnic), a `Promise.all`
czeka na wszystkie i zwraca wyniki **w kolejności wejścia** — kontrakt zachowany.
