# Easy - branded `UserId`

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zdefiniuj `UserId` jako branded string. `parseUserId(value)` akceptuje wyłącznie
format `usr_<dodatnia liczba całkowita>`.

Wynik:

```ts
type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };
```

Zaimplementuj też `userPath(id: UserId)`. Zwykłego stringa nie wolno przekazać bez
parsowania.
