# Hard — dobór jednostki dla czasu względnego

Zaimplementuj `relativeTime(date, now)` zwracające `{ value, unit }` — wartość i jednostkę,
jaką podałbyś do `Intl.RelativeTimeFormat` (`.format(value, unit)`), by dostać tekst typu
„2 dni temu" / „za 3 godziny".

Reguły:

- policz różnicę `date - now` (dodatnia = przyszłość, ujemna = przeszłość),
- wybierz **największą** pasującą jednostkę: `day` (≥ 86400 s), `hour` (≥ 3600 s),
  `minute` (≥ 60 s), w przeciwnym razie `second`,
- `value` to różnica w tej jednostce, **zaokrąglona w dół** co do wielkości, ze znakiem
  (ujemny dla przeszłości),
- dla różnicy < 1 s zwróć `{ value: 0, unit: "second" }`.

```js
const now = new Date(Date.UTC(2020, 0, 10, 12, 0, 0));
relativeTime(new Date(Date.UTC(2020, 0, 12, 12, 0, 0)), now); // { value: 2, unit: "day" }
relativeTime(new Date(Date.UTC(2020, 0, 10, 9, 0, 0)), now);  // { value: -3, unit: "hour" }
relativeTime(new Date(now.getTime() + 90_000), now);          // { value: 1, unit: "minute" }
relativeTime(new Date(now.getTime() - 30_000), now);          // { value: -30, unit: "second" }
```

Formatowanie zostawiasz `Intl.RelativeTimeFormat` — Twoim zadaniem jest sam dobór jednostki.
