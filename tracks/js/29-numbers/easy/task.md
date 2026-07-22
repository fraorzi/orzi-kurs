# Easy — zaokrąglanie i sprawdzanie całkowitości

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `roundTo(value, decimals)`

Zaokrąglij `value` do `decimals` miejsc po przecinku i zwróć **liczbę** (nie string).

```js
roundTo(3.14159, 2); // 3.14
roundTo(2.5, 0);     // 3
roundTo(1.2345, 2);  // 1.23
```

## 2. `isInteger(value)`

Zwróć `true` tylko wtedy, gdy `value` jest liczbą całkowitą. Dla nie-liczb (stringów,
`NaN`, `null`) → `false`. Nie konwertuj wartości wejściowej.

```js
isInteger(5);    // true
isInteger(5.0);  // true
isInteger(5.5);  // false
isInteger("5");  // false — bez konwersji
isInteger(NaN);  // false
```
