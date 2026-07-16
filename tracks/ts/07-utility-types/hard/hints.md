## Hint 1

`FieldErrors<T>` składa się z dwóch utility types: `Record<keyof T, string>` daje komplet
kluczy z komunikatem, a `Partial<...>` robi każdy z nich opcjonalnym.

## Hint 2

W `FormState`:

- `values: Readonly<T>` — pola tylko do odczytu,
- `touched: Readonly<Record<keyof T, boolean>>` — komplet flag, też tylko do odczytu.

`readonly` przed polem interfejsu chroni samo pole (`state.values = ...`), a `Readonly<T>`
— jego wnętrze (`state.values.age = ...`). Testy wymagają obu.

## Hint 3

Budując `touched` w `createForm`, przejdź po `Object.keys(initial)`. Zwraca `string[]`,
więc żeby indeksować `Record<keyof T, boolean>`, przyda się pomocnicza funkcja:

```ts
function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
```

To jedno z niewielu miejsc, gdzie `as` jest uzasadnione — TS nie wie, że obiekt nie ma
dodatkowych kluczy.

## Hint 4

`setField` robi trzy kopie: `values` (z podmienionym polem), `touched` (z `true` pod
kluczem) i `errors` (bez klucza). Klucz z mapy błędów kasujesz przez `delete errors[key]` —
działa, bo pola `FieldErrors` są opcjonalne. `delete` na wymaganym polu to błąd typu.

## Hint 5

`omit` też musi coś usunąć — zrób kopię jako `Partial<T>` (pola opcjonalne → `delete`
przechodzi), a na wyjściu zadeklaruj `Omit<T, K>`:

```ts
const out: Partial<T> = { ...obj };
for (const key of keys) delete out[key];
return out as Omit<T, K>;
```

W `pick` odwrotnie: zaczynasz od pustego `{} as Pick<T, K>` i dokładasz wskazane klucze.
