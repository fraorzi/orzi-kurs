## Hint 1

- `isWeekend`: `date.getUTCDay()` zwraca 0–6 (0 = niedziela, 6 = sobota). Weekend to `0` lub `6`.
- `formatISODate`: `date.toISOString()` daje `"2020-01-01T..."`; weź pierwsze 10 znaków.

## Hint 2

```js
export function isWeekend(date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

export function formatISODate(date) {
  return date.toISOString().slice(0, 10);
}
```

Wariant UTC (`getUTCDay`, `toISOString`) daje wynik niezależny od strefy czasowej maszyny.
