## Hint 1

Węzeł to `{ value, next }`. Trzymaj `#head` (do iteracji) i `#tail` (by `push` był O(1)),
oraz `#size`. `push`: utwórz węzeł, podłącz do `#tail.next` (albo ustaw `#head`, gdy lista
pusta), przesuń `#tail`, zwiększ `#size`, zwróć `this`.

## Hint 2

Iterator trzyma lokalny wskaźnik `node`, startujący od `#head`. Każdy `next()` wydaje
`node.value` i przesuwa `node = node.next`, aż `node` będzie `null`:

```js
[Symbol.iterator]() {
  let node = this.#head;
  return {
    next() {
      if (node === null) return { value: undefined, done: true };
      const value = node.value;
      node = node.next;
      return { value, done: false };
    },
  };
}
```

Bo `node` jest lokalny dla wywołania `[Symbol.iterator]()`, każda iteracja startuje od głowy.
