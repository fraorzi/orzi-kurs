# Medium — dokładna równość

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `sameValue(a, b)`

Semantyka `Object.is` — **bez używania `Object.is`**. Różni się od `===`
w dokładnie dwóch miejscach:

- `sameValue(NaN, NaN)` → `true` (`===` daje false),
- `sameValue(0, -0)` → `false` (`===` daje true).

```js
sameValue(1, 1);     // true
sameValue(NaN, NaN); // true
sameValue(0, -0);    // false
sameValue(-0, -0);   // true
sameValue("a", "a"); // true
```

Podpowiedź do rozróżnienia zer: `1 / 0` to `Infinity`, a `1 / -0` to `-Infinity`.

## 2. `defaultTo(value, fallback)`

Zwraca `fallback`, gdy `value` to `null`, `undefined` **lub** `NaN`; w przeciwnym
razie zwraca `value` (semantyka `_.defaultTo` z lodasha). **Bez użycia `||`** —
`0`, `""` i `false` są pełnoprawnymi wartościami.

```js
defaultTo(5, 10);         // 5
defaultTo(0, 10);         // 0  — || by to zepsuł!
defaultTo("", "x");       // ""
defaultTo(null, 10);      // 10
defaultTo(undefined, 10); // 10
defaultTo(NaN, 10);       // 10 — tego ?? nie załatwi
```
