# Hard - pool współbieżności

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `promisePool(tasks, limit)`

`tasks` to tablica funkcji zwracających promisy (nie promisów! - wywołanie funkcji
uruchamia operację). Wykonaj wszystkie z limitem współbieżności:

- w danej chwili **maksymalnie `limit`** operacji w locie,
- gdy jedna się kończy, startuje następna z kolejki,
- wynik: tablica rezultatów **w kolejności wejścia**,
- pierwszy błąd → odrzucenie całości (jak `Promise.all`); operacje już
  uruchomione mogą dobiec końca, ale nowe nie startują.

```js
const tasks = urls.map((url) => () => fetch(url)); // 50 requestów
const responses = await promisePool(tasks, 4);     // nigdy więcej niż 4 naraz
```

To wzorzec z realnego świata: batchowanie requestów do API z rate limitem,
przetwarzanie plików bez zajechania dysku, crawlery.

Nie używaj gotowych bibliotek - sam mechanizm masz zbudować z promisów.
