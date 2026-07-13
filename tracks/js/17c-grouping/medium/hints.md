## Hint 1

`Map.groupBy(items, keyFn)` zwraca `Map` z zachowaniem typu kluczy — dokładnie to, czego
potrzebujesz.

## Hint 2

```js
export function groupBy(items, keyFn) {
  return Map.groupBy(items, keyFn);
}
```

(Ręcznie: `const m = new Map(); for (const x of items) { const k = keyFn(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); } return m;`.)
