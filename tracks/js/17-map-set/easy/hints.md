## Hint 1

- `unique`: `Set` sam usuwa duplikaty. Włóż tablicę do `new Set(arr)`, a potem rozwiń
  z powrotem do tablicy: `[...new Set(arr)]` albo `Array.from(new Set(arr))`.
- `countWords`: stwórz `new Map()`, iteruj `for (const word of words)` i zwiększaj licznik.

## Hint 2

`countWords` — wzorzec „pobierz aktualną wartość albo 0, dodaj 1, zapisz":

```js
const counts = new Map();
for (const word of words) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
return counts;
```

`counts.get(word)` dla nowego słowa zwraca `undefined`, więc `?? 0` daje start od zera.
