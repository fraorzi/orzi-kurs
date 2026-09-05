# Easy - `createDeferred`

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `createDeferred()` - zwraca obiekt `{ promise, resolve, reject }`, w którym
`promise` da się rozstrzygnąć **z zewnątrz** przez wywołanie `resolve(value)` lub odrzucić
przez `reject(error)`. Użyj `Promise.withResolvers()`.

```js
const d = createDeferred();
d.promise.then((v) => console.log(v)); // zaloguje 7 po d.resolve(7)
d.resolve(7);

const d2 = createDeferred();
d2.reject(new Error("boom")); // d2.promise odrzuca się z tym błędem
```

Wynik ma mieć dokładnie trzy pola: `promise` (Promise), `resolve` i `reject` (funkcje).
