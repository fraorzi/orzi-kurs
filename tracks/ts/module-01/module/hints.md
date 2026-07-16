## Hint 1

Zacznij od `src/types.ts` — reszta modułu z niego wynika:

```ts
export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];
export type NewUser = Omit<User, "id" | "createdAt">;
export type UserPatch = Partial<Omit<User, "id" | "createdAt">>;
export type Result<T, E = string[]> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

`Result` musi być **unią dwóch kształtów**, nie jednym obiektem z opcjonalnymi polami —
inaczej kompilator nie zmusi do sprawdzenia `ok` przed sięgnięciem po `value`.

## Hint 2

Strażnik typu to funkcja zwracająca `value is T`:

```ts
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
```

Pamiętaj o `!== null` (`typeof null === "object"`) i o tablicy — `[]` też jest obiektem.

## Hint 3

`ROLES.includes(value)` nie skompiluje się dla `value: string`, bo `ROLES` to krotka
literałów (`includes` chce elementu tej krotki). Rozszerz typ w jednym miejscu:

```ts
const roles: readonly string[] = ROLES;
return typeof value === "string" && roles.includes(value);
```

## Hint 4

Żeby po zebraniu błędów kompilator wiedział, że pola są już poprawne, wyciągnij warunki do
strażników (`isName`, `isEmail`, `isRole`) i użyj ich dwa razy: raz do zebrania błędów, raz
w warunku wyjścia. Po `if (!isName(name) || !isEmail(email) || !isRole(role)) return …`
TS zawęzi `name`/`email`/`role` w dalszej części funkcji.

## Hint 5

W `parsePatch` sprawdzaj obecność pola przez `"name" in input` — `input.name === undefined`
nie odróżni „brak pola” od „pole ustawione na undefined”.

## Hint 6

Repozytorium: `#users = new Map<number, User>()` i `#nextId = 1`. Licznik zwiększaj przy
każdym `create` i **nigdy** nie zmniejszaj po `remove` — id ma być unikalne w czasie życia
repozytorium.

`update` buduje nowego użytkownika: `{ ...current, ...patch }`. Kolejność ma znaczenie —
patch nadpisuje, ale `id` i `createdAt` w patchu nie istnieją, więc przeżywają.

## Hint 7

`countByRole` startuje od kompletu zer:

```ts
const counts = {} as Record<Role, number>;
for (const role of ROLES) counts[role] = 0;
```

Bez tego role bez użytkowników nie pojawią się w wyniku, a `Record<Role, number>` obiecuje
każdą.
