## Hint 1

Adnotacja `: readonly Column[]` rozszerza `key` do `keyof User` i gubi informację o tym,
które konkretnie kolumny istnieją. `as const satisfies readonly Column[]` sprawdza kształt
(zły klucz = błąd) i zostawia literały:

```ts
export const COLUMNS = [
  { key: "name", label: "Nazwa" },
  …
] as const satisfies readonly Column[];
```

## Hint 2

Unia kluczy z krotki obiektów: najpierw wszystkie elementy (`[number]`), potem ich pole
`key`:

```ts
export type ColumnKey = (typeof COLUMNS)[number]["key"];
```

## Hint 3

`row` indeksuje użytkownika kluczem kolumny: `String(user[column.key])`. `String(...)`
załatwia `id: number`, gdyby kiedyś doszedł do kolumn.

## Hint 4

`isColumnKey` to strażnik typu oparty o dane, nie o typ:

```ts
export function isColumnKey(key: string): key is ColumnKey {
  return COLUMNS.some((column) => column.key === key);
}
```

Dzięki temu `"id"` (pole `User`, ale nie kolumna) daje `false` — o to chodzi w teście.

## Hint 5

`Record<State, readonly State[]>` w `satisfies` wymusza komplet stanów: pominięcie `error`
albo literówka w nazwie stanu docelowego to błąd kompilacji. To najtańsza maszyna stanów,
jaką da się mieć — bez biblioteki.

## Hint 6

`canTransition` da się napisać w jednej linii przez `nextStates(from).includes(to)`.
Uwaga: `includes` na `readonly ["loading"]` przyjmie tylko `"loading"`, jeśli typ `to`
zawęzi się do literału — dlatego `nextStates` deklaruj jako `readonly State[]`
(szerszy typ zwracany), a nie jako dokładną krotkę.
