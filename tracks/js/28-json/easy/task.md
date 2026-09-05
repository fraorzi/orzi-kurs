# Easy - stringify z whitelistą i bezpieczny parse

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `stringifyFields(obj, fields)`

Zwróć **sformatowany** JSON (wcięcie 2 spacje) zawierający **tylko** klucze z tablicy
`fields`. Wykorzystaj tablicową postać replacera.

```js
stringifyFields({ a: 1, b: 2, c: 3 }, ["a", "c"]);
// '{\n  "a": 1,\n  "c": 3\n}'
```

## 2. `safeParse(str, fallback = null)`

Sparsuj `str`. Gdy JSON jest niepoprawny - zamiast rzucać zwróć `fallback` (domyślnie `null`).

```js
safeParse('{"x":1}');        // { x: 1 }
safeParse("nie-json");       // null
safeParse("nie-json", {});   // {}
```
