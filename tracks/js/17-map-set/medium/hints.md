## Hint 1

`aclean`: dwa słowa są anagramami, gdy po posortowaniu liter są identyczne. Zbuduj klucz
kanoniczny: `word.toLowerCase().split("").sort().join("")`. Wrzucaj do `Map` klucz → słowo
— powtórzony klucz nadpisze poprzednie słowo, więc z każdej grupy zostanie jedno.

## Hint 2

```js
export function aclean(arr) {
  const groups = new Map();
  for (const word of arr) {
    const key = word.toLowerCase().split("").sort().join("");
    groups.set(key, word);
  }
  return [...groups.values()];
}
```

Konwersje to jednolinijkowce:
- `objectToMap`: `new Map(Object.entries(obj))`,
- `mapToObject`: `Object.fromEntries(map)`.
