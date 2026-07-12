# Easy — arytmetyka dat na milisekundach

Zaimplementuj w `starter.js` dwie funkcje operujące na timestampach (odporne na strefy).

## 1. `addDays(date, days)`

Zwróć **nowy** `Date` przesunięty o `days` dni (bez mutowania wejścia). Licz na ms:
`new Date(date.getTime() + days * DAY)`.

```js
const d = new Date(Date.UTC(2020, 0, 1));
addDays(d, 5).toISOString().slice(0, 10); // "2020-01-06"
// d nietknięty
```

## 2. `daysBetween(a, b)`

Zwróć liczbę **pełnych dni** między datami `a` i `b` (`b - a` w dniach, zaokrąglone).

```js
daysBetween(new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 6))); // 5
daysBetween(new Date(Date.UTC(2020, 0, 6)), new Date(Date.UTC(2020, 0, 1))); // -5
```
