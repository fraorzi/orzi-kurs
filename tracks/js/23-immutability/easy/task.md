# Easy - niemutowalne aktualizacje przez spread

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie funkcje, które **nie mutują** wejścia - zwracają nową
strukturę z naniesioną zmianą.

## 1. `updateField(obj, key, value)`

Zwróć **nowy** obiekt: kopię `obj` z polem `key` ustawionym na `value`. `obj` bez zmian.

```js
const user = { name: "Ala", age: 30 };
updateField(user, "age", 31); // { name: "Ala", age: 31 }
user.age;                     // 30 - oryginał nietknięty
```

## 2. `addItem(arr, item)`

Zwróć **nową** tablicę z dopisanym `item` na końcu. `arr` bez zmian (żadnego `push`).

```js
const items = [1, 2];
addItem(items, 3); // [1, 2, 3]
items;             // [1, 2] - oryginał nietknięty
```
