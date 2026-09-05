# Hard - kolejka producent-konsument (async queue)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `createQueue()` - kolejkę, w której `push` (producent) i `pull` (konsument)
są **rozdzielone w czasie**. Zwraca `{ push, pull }`:

- `push(value)` - wkłada wartość do kolejki (synchronicznie),
- `pull()` - zwraca **promisę** z najbliższą wartością w kolejności FIFO. Jeśli kolejka jest
  pusta, promisa czeka, aż pojawi się `push`.

```js
const q = createQueue();

q.push(1);
q.push(2);
await q.pull(); // 1
await q.pull(); // 2

// konsument może wyprzedzić producenta:
const p = q.pull(); // pusto - promisa czeka
q.push("później");
await p; // "później"
```

Zasada FIFO działa w obie strony: gdy czeka kilku konsumentów, kolejne `push` trafiają do
nich w kolejności zgłoszeń. Do zawieszania konsumentów użyj `Promise.withResolvers()` -
`pull` na pustej kolejce tworzy deferred, a `push` go rozstrzyga.
