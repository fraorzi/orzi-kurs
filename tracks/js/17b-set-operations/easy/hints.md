## Hint 1

Zamień obie tablice na `Set`, użyj `.intersection` / `.union`, wynik rozłóż z powrotem do
tablicy i posortuj.

## Hint 2

```js
export function common(a, b) {
  return [...new Set(a).intersection(new Set(b))].sort((x, y) => x - y);
}

export function combined(a, b) {
  return [...new Set(a).union(new Set(b))].sort((x, y) => x - y);
}
```
