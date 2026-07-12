## Hint 1

Prywatne pole `#events = new Map()` (event → tablica `{ fn, once }`). Metody `on`/`once`/
`off`/`removeAllListeners` kończą się `return this` (łańcuchowanie). `emit` zwraca `boolean`.

## Hint 2

```js
emit(event, ...args) {
  const list = this.#events.get(event);
  if (!list || list.length === 0) return false;
  for (const l of [...list]) {   // kopia — bezpieczne usuwanie once w trakcie
    l.fn(...args);
    if (l.once) this.off(event, l.fn);
  }
  return true;
}

removeAllListeners(event) {
  if (event === undefined) this.#events.clear();
  else this.#events.delete(event);
  return this;
}
```

`listenerCount` to `this.#events.get(event)?.length ?? 0`. `off` filtruje listę po `l.fn`.
