## Hint 1

Trzymaj zmienną `ref` (początkowo pustą). W `get()`: spróbuj `ref?.deref()`; jeśli coś jest —
zwróć; w przeciwnym razie policz `compute()`, zapisz `ref = new WeakRef(value)` i zwróć.

## Hint 2

```js
export function createWeakCache(compute) {
  let ref;
  return {
    get() {
      const cached = ref?.deref();
      if (cached !== undefined) return cached;
      const value = compute();
      ref = new WeakRef(value);
      return value;
    },
  };
}
```
