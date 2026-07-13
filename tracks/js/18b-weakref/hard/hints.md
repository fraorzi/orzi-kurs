## Hint 1

Wewnątrz trzymaj zwykłą `Map` `klucz → WeakRef(value)` oraz jeden `FinalizationRegistry`,
którego callback dostaje `key` i usuwa wpis z mapy.

## Hint 2

W callbacku rejestru sprawdź, czy wpis nadal wskazuje na zebrany obiekt, zanim go usuniesz —
inaczej skasowałbyś świeży wpis dodany pod tym samym kluczem:

```js
const registry = new FinalizationRegistry((key) => {
  const ref = map.get(key);
  if (ref && ref.deref() === undefined) map.delete(key);
});
```

## Hint 3

```js
export function createWeakValueMap() {
  const map = new Map();
  const registry = new FinalizationRegistry((key) => {
    const ref = map.get(key);
    if (ref && ref.deref() === undefined) map.delete(key);
  });
  return {
    set(key, value) {
      map.set(key, new WeakRef(value));
      registry.register(value, key);
    },
    get(key) {
      return map.get(key)?.deref();
    },
    has(key) {
      return map.get(key)?.deref() !== undefined;
    },
  };
}
```
