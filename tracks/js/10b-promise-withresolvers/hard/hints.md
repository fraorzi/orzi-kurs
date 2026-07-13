## Hint 1

Trzymaj dwie kolejki: `values` (wartości czekające na konsumenta) i `pullers` (funkcje
`resolve` czekających konsumentów). W danej chwili tylko jedna z nich bywa niepusta.

## Hint 2

- `push(value)`: jeśli `pullers` nie jest puste — zdejmij pierwszego `resolve` i wywołaj
  `resolve(value)`; inaczej `values.push(value)`.
- `pull()`: jeśli `values` nie jest puste — `return Promise.resolve(values.shift())`;
  inaczej utwórz `Promise.withResolvers()`, wrzuć `resolve` do `pullers` i zwróć `promise`.

## Hint 3

```js
export function createQueue() {
  const values = [];
  const pullers = [];
  return {
    push(value) {
      if (pullers.length) pullers.shift()(value);
      else values.push(value);
    },
    pull() {
      if (values.length) return Promise.resolve(values.shift());
      const { promise, resolve } = Promise.withResolvers();
      pullers.push(resolve);
      return promise;
    },
  };
}
```
