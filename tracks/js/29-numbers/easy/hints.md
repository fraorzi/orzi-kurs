## Hint 1

- `roundTo`: przeskaluj o `10 ** decimals`, zaokrąglij `Math.round`, podziel z powrotem.
  Wynik jest liczbą (`toFixed` dałby string).
- `isInteger`: to jednolinijkowiec — `Number.isInteger(value)`. Ta wersja nie konwertuje
  argumentu, więc `"5"` czy `NaN` dają `false`.

## Hint 2

```js
export function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function isInteger(value) {
  return Number.isInteger(value);
}
```
