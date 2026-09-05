# Easy - rozpakowywanie

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` trzy funkcje - każda ma używać destrukturyzacji.

## 1. `firstAndLast(arr)`

Dla niepustej tablicy zwraca `{ first, last }`.

```js
firstAndLast([1, 2, 3]); // { first: 1, last: 3 }
firstAndLast(["solo"]);  // { first: "solo", last: "solo" }
```

## 2. `swapped(pair)`

Dla pary `[a, b]` zwraca **nową** parę `[b, a]`. Wejście bez zmian.

```js
swapped([1, 2]);      // [2, 1]
swapped(["a", "b"]); // ["b", "a"]
```

## 3. `fullName(person)`

Destrukturyzacja w parametrze: z obiektu `{ first, last }` buduje `"first last"`.
Gdy brakuje `last` - zwraca samo `first`.

```js
fullName({ first: "Jan", last: "Kowalski" }); // "Jan Kowalski"
fullName({ first: "Prince" });                // "Prince"
```
