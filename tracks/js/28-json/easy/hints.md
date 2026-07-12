## Hint 1

- `stringifyFields`: `JSON.stringify` przyjmuje trzy argumenty — wartość, replacer, wcięcie.
  Tablica jako replacer to whitelist kluczy: `JSON.stringify(obj, fields, 2)`.
- `safeParse`: opakuj `JSON.parse(str)` w `try`, a w `catch` zwróć `fallback`.

## Hint 2

```js
export function stringifyFields(obj, fields) {
  return JSON.stringify(obj, fields, 2);
}

export function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
```
