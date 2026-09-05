# Easy - licznik i suma

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `makeCounter()`

Zwraca funkcję-licznik. Każde wywołanie licznika zwraca kolejną liczbę, zaczynając od `0`.
Każdy licznik utworzony przez `makeCounter()` liczy niezależnie.

```js
const counter = makeCounter();
counter(); // 0
counter(); // 1
counter(); // 2

const other = makeCounter();
other(); // 0
```

## 2. `sum(a)`

Zwraca funkcję, która przyjmuje `b` i zwraca `a + b`.

```js
sum(1)(2);        // 3
const add10 = sum(10);
add10(5);         // 15
add10(1);         // 11
```
