## Hint 1

Zescapuj `query`, zanim wstawisz go do wzorca — metaznaki mają być dosłowne:

```js
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& = całe dopasowanie
}
```

## Hint 2

`highlight`: zbuduj `RegExp` z zescapowanego `query` z flagami `gi` (wszystkie, bez względu na
wielkość liter) i użyj funkcji zamiany, żeby zachować oryginalną pisownię:

```js
export function highlight(text, query) {
  if (query === "") return text;
  const re = new RegExp(escapeRegExp(query), "gi");
  return text.replace(re, (match) => `[[${match}]]`);
}
```

Pusty `query` obsłuż osobno — inaczej `RegExp("")` dopasowałby wszędzie.

## Hint 3

`reformatDate`: grupy nazwane w referencjach w stringu zamiany to `$<name>`:

```js
export function reformatDate(str) {
  return str.replace(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/, "$<d>/$<m>/$<y>");
}
```
