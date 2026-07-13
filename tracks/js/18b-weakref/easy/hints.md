## Hint 1

Utwórz `new WeakRef(value)` i zwróć obiekt, którego `get` woła `deref()` na tej referencji.

## Hint 2

```js
export function weakBox(value) {
  const ref = new WeakRef(value);
  return { get: () => ref.deref() };
}
```
