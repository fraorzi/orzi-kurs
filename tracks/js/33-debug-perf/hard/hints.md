## Hint 1

`Array.prototype.shift()` usuwa pierwszy element i **przesuwa wszystkie pozostałe** o jedno
miejsce — to O(n). Wywołane `n` razy daje O(n²). Do przejścia po tablicy po kolei nie
musisz jej opróżniać.

## Hint 2

Iteruj wskaźnikiem — żadnego kopiowania i żadnego przesuwania:

```js
export function processQueue(items, fn) {
  const results = [];
  for (let i = 0; i < items.length; i++) {
    results.push(fn(items[i]));
  }
  return results;
}
```

Skoro nie usuwasz elementów, kopia `[...items]` też jest zbędna — `items` i tak zostaje
nietknięte. (Gdybyś potrzebował prawdziwej kolejki, użyj wskaźnika `head` zamiast `shift`,
albo zdejmuj z końca przez `pop`, gdy kolejność nie ma znaczenia.)
