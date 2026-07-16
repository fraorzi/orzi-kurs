# Hard — `unknown` z zewnątrz, strażnik typu i wynik jako unia

Dane przychodzą z sieci, więc mają typ `unknown` — nie `any`. Zadanie: zawęzić je do
konkretnego kształtu i zwrócić wynik jako **unię rozłączną**, która nie dopuszcza stanu
„sukces i błędy naraz”.

Zabronione: `as`, `any`, `!` (non-null assertion). Cały dowód poprawności robisz zawężaniem.

## 1. `isRecord(value: unknown): value is Record<string, unknown>`

Strażnik typu: prawda dla zwykłych obiektów, fałsz dla `null`, tablic i prymitywów.

```ts
isRecord({ a: 1 });  // true
isRecord(null);      // false   ← typeof null === "object", uwaga
isRecord([1, 2]);    // false
isRecord("abc");     // false
```

## 2. Typy `User` i `ParseResult`

```ts
type User = { id: number; name: string; email: string | null };

type ParseResult =
  | { ok: true; user: User }
  | { ok: false; errors: string[] };
```

## 3. `parseUser(input: unknown): ParseResult`

Waliduje i zwraca `{ ok: true, user }` albo `{ ok: false, errors }` z **wszystkimi**
błędami (nie tylko pierwszym), w tej kolejności:

| warunek | komunikat błędu |
|---|---|
| `input` nie jest obiektem | `"dane nie są obiektem"` (i to jedyny błąd) |
| `id` nie jest liczbą całkowitą | `"id musi być liczbą całkowitą"` |
| `name` nie jest niepustym stringiem | `"name musi być niepustym tekstem"` |
| `email` nie jest stringiem, `null` ani `undefined` | `"email musi być tekstem albo null"` |

Brakujący `email` (`undefined`) jest poprawny i daje `email: null`.

```ts
parseUser({ id: 1, name: "Ala", email: "ala@example.com" });
// { ok: true, user: { id: 1, name: "Ala", email: "ala@example.com" } }

parseUser({ id: 1, name: "Ala" });
// { ok: true, user: { id: 1, name: "Ala", email: null } }

parseUser({ id: 1.5, name: "" });
// { ok: false, errors: ["id musi być liczbą całkowitą", "name musi być niepustym tekstem"] }

parseUser("nope");
// { ok: false, errors: ["dane nie są obiektem"] }
```

## 4. `userLabel(result: ParseResult): string`

```ts
userLabel({ ok: true, user: { id: 1, name: "Ala", email: null } }); // "Ala (#1)"
userLabel({ ok: false, errors: ["a", "b"] });                       // "błędy: a, b"
```

Zawężaj po `result.ok` — bez tego pole `user` nie istnieje.
