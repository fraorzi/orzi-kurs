## Hint 1

Spread kopiuje istniejące pola/elementy do nowej struktury, a Ty dopisujesz zmianę:
- obiekt: `{ ...obj, [key]: value }` (klucz w nawiasach `[]` = klucz dynamiczny),
- tablica: `[...arr, item]`.

## Hint 2

```js
export function updateField(obj, key, value) {
  return { ...obj, [key]: value };
}

export function addItem(arr, item) {
  return [...arr, item];
}
```

Kolejność w spreadzie obiektu ma znaczenie: `[key]: value` PO `...obj` nadpisze istniejące
pole; przed — zostałoby nadpisane przez `...obj`.
