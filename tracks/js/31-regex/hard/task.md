# Hard - grupy nazwane i matchAll

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `parseDate(str)`

Sparsuj datę `YYYY-MM-DD` używając **grup nazwanych**. Zwróć `{ year, month, day }`
jako **liczby**, albo `null`, gdy format się nie zgadza (użyj kotwic `^...$`).

```js
parseDate("2020-05-17"); // { year: 2020, month: 5, day: 17 }
parseDate("2020-5-17");  // null (miesiąc musi mieć 2 cyfry)
parseDate("hello");      // null
```

## 2. `extractHashtags(text)`

Wyciągnij wszystkie hashtagi (`#słowo`) z tekstu, używając `matchAll` i grupy nazwanej.
Zwróć nazwy (bez `#`) **małymi literami**, **bez duplikatów**, w kolejności pierwszego
wystąpienia.

```js
extractHashtags("Kocham #JS i #js oraz #Node!"); // ["js", "node"]
extractHashtags("brak tagów");                    // []
extractHashtags("#a #b #a");                       // ["a", "b"]
```
