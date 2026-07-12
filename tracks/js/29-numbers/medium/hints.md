## Hint 1

- `approxEqual`: różnica bezwzględna mniejsza od tolerancji — `Math.abs(a - b) < tolerance`.
- `toFixedNumber`: `value.toFixed(digits)` daje string; owiń go w `Number(...)`, by odzyskać
  liczbę.

## Hint 2

```js
export function approxEqual(a, b, tolerance = 1e-9) {
  return Math.abs(a - b) < tolerance;
}

export function toFixedNumber(value, digits) {
  return Number(value.toFixed(digits));
}
```
