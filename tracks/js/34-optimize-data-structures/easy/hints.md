## Hint 1

`b.includes(value)` przeszukuje `b` od początku za każdym razem — O(m). W pętli po `a`
daje O(n·m). Zbuduj `new Set(b)` **raz** przed pętlą i sprawdzaj `set.has(value)` w O(1).

## Hint 2

```js
export function countInBoth(a, b) {
  const inB = new Set(b);
  let count = 0;
  for (const value of new Set(a)) {
    if (inB.has(value)) count += 1;
  }
  return count;
}
```

`new Set(a)` w pętli zostaje — deduplikuje wartości `a`, żeby liczyć je unikalnie.
Zmieniamy tylko sprawdzanie przynależności do `b` na O(1).
