# Hard — własna iterowalna lista (LinkedList)

Zaimplementuj `class LinkedList` — jednokierunkową listę, która jest **iterowalna**:
`for..of`, spread, `Array.from` i destrukturyzacja mają wydawać wartości w kolejności
dodawania (od głowy do ogona). Wewnątrz trzymaj węzły `{ value, next }`, nie tablicę.

## API

- `push(value)` — dopina wartość na koniec, zwraca `this` (łańcuchowanie),
- getter `size` — liczba elementów,
- `[Symbol.iterator]()` — przechodzi listę od głowy do ogona.

```js
const list = new LinkedList();
list.push(1).push(2).push(3);

list.size;             // 3
[...list];             // [1, 2, 3]
Array.from(list);      // [1, 2, 3]
const [first] = list;  // 1
for (const v of list) {} // 1, 2, 3
```

Pusta lista iteruje się do `[]`. Iteracja ma być powtarzalna (każde przejście od głowy).
