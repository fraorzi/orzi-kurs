## Hint 1

Dekorator zwraca nową funkcję, która trzyma `WeakMap` w domknięciu. Schemat cache:
sprawdź `cache.has(obj)`; jeśli tak — `return cache.get(obj)`; jeśli nie — policz,
zapisz `cache.set(obj, wynik)`, zwróć.

## Hint 2

```js
export function memoizeWeak(fn) {
  const cache = new WeakMap();
  return function (obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}
```

Prymitywu nie musisz sprawdzać ręcznie — `cache.set(5, ...)` sam rzuci `TypeError`.
Cache trzyma klucze po referencji, więc zmiana `obj.x` po zapisaniu wyniku nie unieważnia
wpisu (dlatego memoizacja po obiekcie zakłada, że obiekt jest niezmienny).
