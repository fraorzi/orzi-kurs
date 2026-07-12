# Promisy

Promise to obiekt reprezentujący **przyszły wynik** operacji asynchronicznej.
Ma trzy stany: `pending` → `fulfilled` (z wartością) albo `rejected` (z powodem).
Stan zmienia się **raz** — kolejne resolve/reject są ignorowane.

## Tworzenie

```js
const promise = new Promise((resolve, reject) => {
  // executor uruchamia się NATYCHMIAST, synchronicznie
  setTimeout(() => resolve("done"), 1000);
  // albo: reject(new Error("failed"));
});
```

Klasyk — `delay`:

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

## Konsumowanie i łańcuchy

```js
promise
  .then((value) => value * 2)      // zwrócona wartość → następne then
  .then((value) => fetchMore(value)) // zwrócony promise → czekamy na niego
  .catch((err) => { ... })          // łapie odrzucenie z KAŻDEGO ogniwa wyżej
  .finally(() => { ... });
```

Kluczowe: `then` **zwraca nowy promise**. Błąd rzucony w dowolnym ogniwie leci w dół
łańcucha do najbliższego `catch`.

## Promisyfikacja callbacków

Stare API node'owe: `f(args, callback(err, result))`. Opakowanie w promise:

```js
function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      f(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
```

## Statyczne API

```js
Promise.all(arr);        // czeka na WSZYSTKIE; odrzuca przy PIERWSZYM błędzie
Promise.allSettled(arr); // czeka na wszystkie; nigdy nie odrzuca —
                         // [{ status: "fulfilled", value }, { status: "rejected", reason }]
Promise.race(arr);       // pierwszy USTALONY (sukces lub błąd) wygrywa
Promise.any(arr);        // pierwszy SUKCES; wszystkie padły → AggregateError
Promise.resolve(x);      // od razu fulfilled; jeśli x nie jest promisem — opakowuje
Promise.reject(err);
```

`Promise.all` zachowuje **kolejność wyników** zgodną z kolejnością wejścia,
niezależnie od tego, który skończył pierwszy.

## Wzorce, które musisz umieć z głowy

- **retry**: ponawiaj async operację do n razy, rzuć ostatni błąd,
- **pool / limit współbieżności**: maksymalnie k operacji w locie naraz
  (nie odpalaj 500 requestów jednocześnie),
- **timeout**: `Promise.race([operacja, delay(ms).then(() => { throw ... })])`.

## Częste błędy

- `new Promise` wokół czegoś, co już zwraca promise (antywzorzec konstruktora),
- zgubiony `return` w `then` — następne ogniwo dostaje `undefined`,
- odpalenie wszystkich operacji przed `await`/`then`, gdy miały iść sekwencyjnie
  (i odwrotnie — sekwencyjnie, gdy mogły równolegle).
