## Hint 1

- `getAge`: sprawdź `if (user.age === undefined)` i wtedy `throw new Error("brak pola: age")`.
  Uwaga na `age === 0` — to poprawna wartość, nie brak (dlatego `=== undefined`, nie `!user.age`).
- `readAgeOrDefault`: opakuj `return getAge(user)` w `try`, a w `catch` zwróć `0`.
- `withCleanup`: `try { return fn(); } finally { cleanup(); }`.

## Hint 2

`finally` wykonuje się zawsze — także wtedy, gdy w `try` jest `return`, i wtedy, gdy `fn`
rzuca. W drugim przypadku NIE łap błędu (żadnego `catch`): sam `try/finally` wystarczy,
by `cleanup()` wykonał się przed przepuszczeniem wyjątku w górę.

```js
export function withCleanup(fn, cleanup) {
  try {
    return fn();
  } finally {
    cleanup();
  }
}
```
