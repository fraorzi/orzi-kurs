## Hint 1

Wszystkie trzy to ta sama pętla: `let proto = Object.getPrototypeOf(value)`
(albo sam `obj`) i `while (proto !== null) { ...; proto =
Object.getPrototypeOf(proto); }`. `myInstanceOf`: najpierw odsiej prymitywy
(`value` nie jest obiektem ani funkcją). `listProps`: `for..in` daje własne +
odziedziczone, `Object.keys` tylko własne — różnica zbiorów to inherited.

## Hint 2

```js
export function myInstanceOf(value, Ctor) {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) {
    return false;
  }
  let proto = Object.getPrototypeOf(value);
  while (proto !== null) {
    if (proto === Ctor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

`getDefiningObject`: startuj od `obj` (nie od prototypu!) i sprawdzaj
`Object.hasOwn(current, key)`.

## Hint 3

`listProps`: `own` to `Object.keys(obj)`. `inherited`: przejdź `for (const key
in obj)` i weź klucze, które NIE są własne (`!Object.hasOwn(obj, key)`) —
for..in samo pilnuje deduplikacji i pomija Object.prototype (jego klucze są
nieenumerowalne). Posortuj obie tablice.
