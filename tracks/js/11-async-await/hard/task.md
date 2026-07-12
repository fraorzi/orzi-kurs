# Hard — timeout i pierwszy sukces

## 1. `withTimeout(promise, ms)`

Zwraca promise, który:

- rozwiązuje się/odrzuca tak jak `promise`, jeśli ten ustali się przed upływem `ms`,
- w przeciwnym razie odrzuca błędem, którego `name === "TimeoutError"`.

```js
await withTimeout(fetchData(), 5000); // wynik fetchData albo TimeoutError po 5s
```

## 2. `firstSuccess(promises)`

Własna implementacja semantyki `Promise.any` — **bez używania** `Promise.any`:

- rozwiązuje się wartością **pierwszego sukcesu** (błędy wcześniejszych ignoruje),
- gdy **wszystkie** odrzucą — odrzuca `AggregateError`, w którym `errors` zawiera
  powody w kolejności wejścia,
- pusta tablica → `AggregateError` z pustym `errors`.

```js
await firstSuccess([
  Promise.reject(new Error("mirror1 down")),
  slowResolve("mirror2 ok"),   // ← to wygrywa mimo błędu wyżej
  Promise.reject(new Error("mirror3 down")),
]); // "mirror2 ok"
```

Różnica względem `Promise.race`: race kończy przy pierwszym **ustaleniu**
(także błędzie), firstSuccess czeka na pierwszy **sukces**.
