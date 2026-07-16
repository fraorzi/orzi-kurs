## Hint 1

`isRecord` musi wykluczyć trzy rzeczy naraz: prymitywy (`typeof value === "object"`),
`null` (bo `typeof null === "object"`) i tablice (`Array.isArray`). Zwracany typ to
predykat, nie `boolean`:

```ts
export function isRecord(value: unknown): value is Record<string, unknown> {
```

Bez predykatu kompilator nie zawęzi `unknown` po `if (isRecord(x))` — i test to złapie.

## Hint 2

`ParseResult` jako `{ ok: boolean; user?: User; errors?: string[] }` dopuszcza stan
„sukces bez użytkownika”. Unia rozłączna go wyklucza:

```ts
export type ParseResult =
  | { ok: true; user: User }
  | { ok: false; errors: string[] };
```

## Hint 3

Po `if (isRecord(input))` pola `input.id`, `input.name`, `input.email` mają typ `unknown` —
i dobrze. Każde zawęź osobno małym strażnikiem:

```ts
function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}
```

## Hint 4

Kolejność ma znaczenie. Najpierw ścieżka sukcesu — jeden warunek ze wszystkimi strażnikami:

```ts
if (isInteger(id) && isNonEmptyString(name) && isEmailValue(email)) {
  return { ok: true, user: { id, name, email: email ?? null } };
}
```

Wewnątrz tego `if` kompilator zna już typy wszystkich trzech pól. Dopiero potem zbierasz
błędy — po jednym `if` na pole, w kolejności z tabeli w treści.

## Hint 5

Gdybyś próbował zawęzić po `if (errors.length === 0)`, kompilator nie pójdzie za Tobą —
liczba błędów nic mu nie mówi o typie `id`. Dlatego sukces sprawdzasz warunkiem na
wartościach, a nie na liczniku błędów.
