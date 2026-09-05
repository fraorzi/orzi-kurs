# Hard - pieniądze jako liczby całkowite (grosze)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Kwoty pieniężne trzyma się w **groszach jako liczby całkowite**, żeby uniknąć dryfu
zmiennoprzecinkowego (`0.1 + 0.2 !== 0.3`). Zaimplementuj konwersję w obie strony -
całkowicie na liczbach całkowitych, **bez** `parseFloat(str) * 100` (to gubi grosze).
Zakładamy kwoty nieujemne, format `"złote.grosze"`.

## 1. `parseMoney(str)` - string → grosze (int)

```js
parseMoney("12.34"); // 1234
parseMoney("0.05");  // 5
parseMoney("100");   // 10000  (brak części ułamkowej = 00 groszy)
parseMoney("12.3");  // 1230   (jedna cyfra po kropce = 30 groszy)
```

## 2. `formatMoney(cents)` - grosze (int) → string

```js
formatMoney(1234);  // "12.34"
formatMoney(5);     // "0.05"
formatMoney(10000); // "100.00"
```

Konwersja w obie strony ma być odwracalna: `parseMoney(formatMoney(c)) === c`.
