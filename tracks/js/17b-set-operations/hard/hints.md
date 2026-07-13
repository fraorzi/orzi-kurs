## Hint 1

Wynik nigdy nie jest większy niż `userTags`, więc katalog nie musi być w ogóle
przeglądany — wystarczy pytać go o przynależność. Odwróć strony: pętla po `userTags`,
`catalog.has(tag)` w środku.

## Hint 2

```js
export function sharedTags(userTags, catalog) {
  const out = [];
  for (const tag of userTags) {
    if (catalog.has(tag)) out.push(tag);
  }
  return out.sort();
}
```

Pętla robi `userTags.size` iteracji niezależnie od rozmiaru katalogu, a `has()` jest O(1) —
czas przestaje rosnąć z katalogiem.
