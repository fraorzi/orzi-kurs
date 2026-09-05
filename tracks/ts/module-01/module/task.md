# Moduł 01 - typowany moduł użytkowników

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie **wieloplikowe**. Uzupełnij pliki w `src/`. Testy importują z `src/index`, więc
nazwy w publicznym API muszą się zgadzać. Zakaz: `any`, `as` (poza `as const`), `!`
(non-null assertion). Wszystko udowadniasz zawężaniem.

## `src/types.ts`

```ts
ROLES;                 // readonly ["admin", "editor", "viewer"]   (as const)
type Role;             // "admin" | "editor" | "viewer"            (wyprowadzony z ROLES)

interface User {       // wszystkie pola readonly
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;   // ISO
}

type NewUser;          // User bez id i createdAt      (użyj Omit)
type UserPatch;        // opcjonalne name/email/role    (użyj Partial + Omit)

type Result<T, E = string[]> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## `src/validate.ts`

```ts
isRecord(value: unknown): value is Record<string, unknown>
isRole(value: unknown): value is Role
parseNewUser(input: unknown): Result<NewUser>
parsePatch(input: unknown): Result<UserPatch>
```

`parseNewUser` zbiera **wszystkie** błędy w kolejności pól, komunikaty dokładnie takie:

| warunek | komunikat |
|---|---|
| dane nie są obiektem | `"dane nie są obiektem"` (jedyny błąd) |
| `name` nie jest niepustym tekstem | `"name musi być niepustym tekstem"` |
| `email` nie zawiera `@` (albo nie jest tekstem) | `"email musi zawierać @"` |
| `role` spoza `ROLES` | `"role musi być jedną z: admin, editor, viewer"` |

`parsePatch` waliduje tylko **obecne** pola (brak pola = brak błędu), te same komunikaty.
Pusty obiekt to poprawny (pusty) patch.

## `src/repository.ts` - `class UserRepository`

```ts
const repo = new UserRepository(() => "2024-01-01T00:00:00.000Z");   // wstrzyknięty zegar

repo.create(input: unknown): Result<User>
repo.get(id: number): User | null
repo.update(id: number, patch: unknown): Result<User>
repo.remove(id: number): boolean
repo.list(filter?: { role?: Role }): readonly User[]
repo.countByRole(): Record<Role, number>
repo.size: number                                    // getter
```

Zasady:

- stan trzymany w polu **prywatnym w runtime** (`#users: Map<number, User>`),
- `id` nadawane automatycznie od `1` w górę, rosnąco, **bez ponownego użycia** po usunięciu,
- `createdAt` bierze się z wstrzykniętego zegara,
- `create` waliduje wejście przez `parseNewUser`; błąd walidacji → `{ ok: false, error }`,
- `update` waliduje patch przez `parsePatch`; nieznane `id` → `{ ok: false, error: ["nie ma użytkownika o id 7"] }`,
- `update` **nie mutuje** istniejącego użytkownika - tworzy nowy obiekt (`id` i `createdAt` bez zmian),
- `list` zwraca użytkowników posortowanych rosnąco po `id`; z filtrem - tylko daną rolę,
- `countByRole` zwraca komplet ról (`Record<Role, number>`), zera włącznie.

## `src/index.ts`

Re-eksportuj publiczne API: `UserRepository`, `parseNewUser`, `parsePatch`, `isRole`,
`ROLES` oraz typy `Role`, `User`, `NewUser`, `UserPatch`, `Result`.

Typy eksportuj jako typy (`export type { … }`) - to konwencja modułów TS i wymóg
`verbatimModuleSyntax`.
