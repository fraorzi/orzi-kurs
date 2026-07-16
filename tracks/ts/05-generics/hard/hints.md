## Hint 1

Parametr typu wchodzi tylko do wariantu sukcesu — wariant błędu jest zawsze taki sam:

```ts
export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string };
```

## Hint 2

`err` nie ma żadnej wartości sukcesu, więc jego `T` to `never`:

```ts
export function err(error: string): Result<never> {
  return { ok: false, error };
}
```

`never` to typ pusty, a typ pusty jest podtypem wszystkiego — dlatego `Result<never>`
wchodzi tam, gdzie oczekiwany jest `Result<number>` czy `Result<User>`.

## Hint 3

W `mapResult` sprawdzenie `result.ok` zawęża unię, więc `result.value` jest już dostępne.
W gałęzi błędu **zwróć ten sam obiekt** — TS wie, że wariant `{ ok: false }` pasuje do
`Result<U>` dla dowolnego `U`:

```ts
return result.ok ? ok(fn(result.value)) : result;
```

## Hint 4

Różnica `map` vs `flatMap` jest w jednym miejscu: `map` owija wynik `fn` w `ok(...)`,
a `flatMap` **zwraca go bez owijania** (bo `fn` już zwróciło `Result`):

```ts
return result.ok ? fn(result.value) : result;
```

## Hint 5

`collect` to pętla z wczesnym wyjściem: zbieraj wartości do `const values: T[] = []`, a na
pierwszym `!result.ok` po prostu `return result` — wtedy pierwszy błąd wygrywa i nie
sprawdzasz reszty. Na końcu `return ok(values)`.
