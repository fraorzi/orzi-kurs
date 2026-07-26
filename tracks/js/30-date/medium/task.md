# Medium — dzień tygodnia i format ISO

Zaimplementuj w `starter.js` dwie funkcje oparte na UTC (odporne na strefę maszyny).

## 1. `isWeekend(date)`

Zwróć `true`, gdy `date` wypada w sobotę lub niedzielę. Sprawdzenie ma działać według UTC,
nie lokalnej strefy czasowej maszyny.

```js
isWeekend(new Date(Date.UTC(2020, 0, 4))); // true  (sobota)
isWeekend(new Date(Date.UTC(2020, 0, 5))); // true  (niedziela)
isWeekend(new Date(Date.UTC(2020, 0, 6))); // false (poniedziałek)
```

## 2. `formatISODate(date)`

Zwróć samą datę w formacie `YYYY-MM-DD` (część daty ze stringa ISO, w UTC).

```js
formatISODate(new Date(Date.UTC(2020, 0, 1, 15, 30))); // "2020-01-01"
formatISODate(new Date(Date.UTC(2023, 11, 31)));       // "2023-12-31"
```
