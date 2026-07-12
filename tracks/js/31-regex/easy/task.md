# Easy — ekstrakcja liczb i walidacja hex-koloru

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `extractNumbers(str)`

Zwróć tablicę **liczb** (typu number) występujących w tekście — ciągi cyfr. Gdy nie ma
żadnej, zwróć pustą tablicę.

```js
extractNumbers("abc12def34");   // [12, 34]
extractNumbers("brak liczb");   // []
extractNumbers("cena 100 zł");  // [100]
```

## 2. `isHexColor(str)`

Zwróć `true`, gdy `str` to poprawny 6-cyfrowy kolor hex: `#` + dokładnie 6 znaków
`0-9a-f` (wielkość liter bez znaczenia). Pamiętaj o kotwicach `^...$` (całość, nie fragment).

```js
isHexColor("#ff00aa"); // true
isHexColor("#FF00AA"); // true
isHexColor("ff00aa");  // false (brak #)
isHexColor("#ff0");    // false (za krótki)
isHexColor("#gg00aa"); // false (g poza zakresem)
```
