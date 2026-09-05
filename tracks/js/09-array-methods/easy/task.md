# Easy - talia kart

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Pomagasz iluzjonistce zarządzać talią kart (tablica liczb). Zaimplementuj funkcje
w `starter.js`. Te funkcje **mutują** talię i zwracają ją (poza `getItem` i `checkSizeOfStack`).

## Funkcje

```js
getItem(cards, position);
// zwraca kartę z pozycji: getItem([1, 2, 4, 1], 2) → 4

setItem(cards, position, replacement);
// podmienia kartę na pozycji: setItem([1, 2, 4, 1], 2, 6) → [1, 2, 6, 1]

insertItemAtTop(cards, item);
// dokłada kartę na koniec: insertItemAtTop([5, 9, 7], 8) → [5, 9, 7, 8]

removeItem(cards, position);
// usuwa kartę z pozycji: removeItem([3, 2, 6, 4], 2) → [3, 2, 4]

removeItemFromTop(cards);
// zdejmuje kartę z końca: removeItemFromTop([3, 2, 6, 4]) → [3, 2, 6]

checkSizeOfStack(cards, count);
// czy talia ma dokładnie count kart: checkSizeOfStack([3, 2, 6], 3) → true
```

Użyj wbudowanych metod tablic (`push`, `pop`, `splice`, `length`) - bez pętli.
