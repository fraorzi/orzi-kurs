## Hint 1

Obie funkcje operują na `getTime()` (ms od epoki). `DAY` to liczba ms w dobie.
- `addDays`: `new Date(date.getTime() + days * DAY)` — nowy obiekt, wejście nietknięte.
- `daysBetween`: `(b.getTime() - a.getTime()) / DAY`, zaokrąglone `Math.round`.

## Hint 2

```js
const DAY = 24 * 60 * 60 * 1000;

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY);
}

export function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / DAY);
}
```

Praca na timestampach jest odporna na strefy — `getTime()` zawsze zwraca UTC.
