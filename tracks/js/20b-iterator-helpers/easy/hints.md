## Hint 1

`Iterator.from(iterable)` daje iterator z metodami `.take`, `.filter`, `.map`, `.toArray`.
`take(n)` ogranicza liczbę elementów (dlatego działa na nieskończonym generatorze).

## Hint 2

```js
export function firstN(iterable, n) {
  return Iterator.from(iterable).take(n).toArray();
}

export function firstEvens(iterable, n) {
  return Iterator.from(iterable)
    .filter((x) => x % 2 === 0)
    .take(n)
    .toArray();
}
```

Kolejność ma znaczenie: `filter` przed `take`, żeby `take` liczyło już przefiltrowane elementy.
