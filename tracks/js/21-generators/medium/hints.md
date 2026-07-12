## Hint 1

Różnica, która robi całą robotę:
- `yield element` — wydaje element jako **jedną** wartość (nawet jeśli to tablica),
- `yield* iterable` — wydaje **każdy** element tego iterable po kolei.

## Hint 2

```js
export function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item); // deleguj do rekurencyjnego wywołania
    } else {
      yield item;
    }
  }
}

export function* chain(...iterables) {
  for (const iterable of iterables) {
    yield* iterable; // wlej całe iterable do wyniku
  }
}
```
