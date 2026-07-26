# Medium — replacer (funkcja) i reviver

## 1. `stringifyHidingSecrets(obj)`

Zwróć JSON obiektu, ale **pomiń** pola o kluczach `"password"` i `"token"` (na dowolnym
poziomie zagnieżdżenia). Rozwiązanie ma działać przez funkcję replacera.

```js
stringifyHidingSecrets({ user: "ala", password: "x", token: "y", age: 30 });
// '{"user":"ala","age":30}'
stringifyHidingSecrets({ a: { password: "x", ok: 1 } });
// '{"a":{"ok":1}}'
```

## 2. `parseWithDates(str)`

Sparsuj JSON, zamieniając stringi w formacie ISO daty (`YYYY-MM-DDThh:mm:ss...Z`) z powrotem
na obiekty `Date`. Użyj revivera. Zwykłe stringi zostaw bez zmian.

```js
const obj = parseWithDates('{"created":"2020-01-01T00:00:00.000Z","name":"raport"}');
obj.created instanceof Date; // true
obj.name;                    // "raport" (bez zmian)
```
