## Hint 1

`sameValue`: zacznij od `a === b`. To załatwia wszystko poza dwoma wyjątkami
z task.md. Gdy `a === b` jest true, jedyny fałszywy alarm to para 0 i -0.
Gdy jest false — jedyny przypadek do uratowania to NaN po obu stronach.

## Hint 2

Kanoniczny polyfill Object.is (MDN):

```js
if (a === b) {
  return a !== 0 || 1 / a === 1 / b; // odróżnia 0 od -0
}
return a !== a && b !== b; // true tylko gdy oba to NaN
```

`defaultTo`: `value === null || value === undefined || Number.isNaN(value)`
→ fallback; inaczej value. `Number.isNaN` (nie globalne `isNaN`!) zwraca true
wyłącznie dla NaN, bez konwersji argumentu.
