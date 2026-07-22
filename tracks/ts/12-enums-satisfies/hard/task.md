# Hard — `satisfies` w konfiguracji: kolumny tabeli i maszyna stanów

Dwa realne zastosowania `satisfies`: konfiguracja walidowana kształtem, ale zachowująca
dokładne typy, z których dalej wyprowadzasz kolejne typy.

## Część 1 — kolumny tabeli

```ts
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface Column {
  readonly key: keyof User;
  readonly label: string;
  readonly align?: "left" | "right";
}
```

`COLUMNS` ma zachować literały i jednocześnie zostać sprawdzone jako readonly lista kolumn:

| key | label | align |
|---|---|---|
| `name` | `"Nazwa"` | — |
| `email` | `"E-mail"` | — |
| `createdAt` | `"Utworzono"` | `"right"` |

Dzięki `satisfies` literały `key` przetrwają, więc:

```ts
type ColumnKey = ...;  // "name" | "email" | "createdAt"   — wyprowadzone z COLUMNS
```

Klucz spoza `keyof User` (np. `"nick"`) ma być błędem kompilacji przy definicji `COLUMNS`.

### `headers(): string[]`

```ts
headers(); // ["Nazwa", "E-mail", "Utworzono"]
```

### `row(user: User): string[]`

Wartości w kolejności kolumn, każda jako string.

```ts
row({ id: 1, name: "Ala", email: "a@x.pl", createdAt: "2024-01-01" });
// ["Ala", "a@x.pl", "2024-01-01"]
```

### `isColumnKey(key: string): key is ColumnKey`

Strażnik typu — `"id"` nie jest kolumną, mimo że jest polem `User`.

## Część 2 — maszyna stanów

```ts
type State = "idle" | "loading" | "done" | "error";
```

`TRANSITIONS` ma zachować literały i zostać sprawdzone jako kompletna mapa stanów do readonly
list dozwolonych stanów:

- `idle` → `loading`
- `loading` → `done`, `error`
- `done` → `idle`
- `error` → `idle`, `loading`

`Record<State, …>` wymusza komplet stanów: pominięcie `error` to błąd kompilacji.

### `canTransition(from: State, to: State): boolean`

```ts
canTransition("idle", "loading");  // true
canTransition("idle", "done");     // false
```

### `nextStates(state: State): readonly State[]`

```ts
nextStates("loading"); // ["done", "error"]
nextStates("done");    // ["idle"]
```

### `transition(from: State, to: State): State`

Zwraca `to`, jeśli przejście jest dozwolone; w przeciwnym razie rzuca
`Error("niedozwolone przejście: idle → done")`.
