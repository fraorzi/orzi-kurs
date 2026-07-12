## Hint 1

- `extractNumbers`: `str.match(/\d+/g)` zwraca tablicę stringów cyfr albo `null` (gdy brak).
  Zabezpiecz `?? []` i zamień na liczby przez `.map(Number)`.
- `isHexColor`: wzorzec z kotwicami `^...$`, znak `#`, klasa `[0-9a-f]`, dokładnie `{6}`,
  flaga `i`. Użyj `.test(str)`.

## Hint 2

```js
export function extractNumbers(str) {
  return (str.match(/\d+/g) ?? []).map(Number);
}

export function isHexColor(str) {
  return /^#[0-9a-f]{6}$/i.test(str);
}
```

Kotwice `^` i `$` sprawiają, że sprawdzasz **cały** string, nie tylko jego fragment.
