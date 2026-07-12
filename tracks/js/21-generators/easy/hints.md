## Hint 1

- `range`: zwykła pętla `for` z `yield i` w środku — `function*` zamienia to w iterator.
- `take`: iteruj źródło przez `for..of`, licz wydane elementy i `return`, gdy osiągniesz `n`.

## Hint 2

```js
export function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function* take(iterable, n) {
  if (n <= 0) return;
  let count = 0;
  for (const item of iterable) {
    yield item;
    count += 1;
    if (count >= n) return; // przerwij PO n-tym yieldzie — nie pobieraj n+1
  }
}
```

Sprawdź `count >= n` **po** `yield`, a nie przed pobraniem elementu — dzięki temu z
nieskończonego źródła weźmiesz dokładnie `n`.
