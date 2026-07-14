## Hint 1

Async generator wygląda jak zwykły, ale z `async`: `async function* asyncRange(...) { ... }`.
W środku `yield` jak zawsze — pętla `for` z `yield i` wystarczy.

## Hint 2

`collect` konsumuje async iterable pętlą `for await...of` (nie zwykłym `for...of`):

```js
export async function collect(asyncIterable) {
  const out = [];
  for await (const value of asyncIterable) {
    out.push(value);
  }
  return out;
}
```

`collect` jest `async`, więc zwraca `Promise` — konsument robi `await collect(...)`.
