# Easy — DTO wyprowadzone z modelu (`Pick`, `Omit`, `Partial`, `Record`)

Model `User` jest już w `starter.ts` i **nie wolno go zmieniać**. Wszystkie typy pochodne
masz z niego wyprowadzić — żadnego przepisywania pól ręcznie.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}
```

## 1. `UserPreview`

Tylko `id` i `name` (użyj `Pick`).

```ts
type UserPreview = ...; // { id: number; name: string }
```

## 2. `NewUser`

Dane do utworzenia użytkownika — wszystko poza `id` (użyj `Omit`).

## 3. `UserPatch`

Ciało żądania `PATCH` — każde pole `NewUser` opcjonalne (`Partial` + `Omit`).
`id` nie może się w nim pojawić.

## 4. `RoleCounts`

Mapa rola → liczba użytkowników, z **kompletem** ról (użyj `Record`).

```ts
type RoleCounts = ...; // { admin: number; editor: number; viewer: number }
```

## 5. Funkcje

```ts
toPreview(user: User): UserPreview
createUser(input: NewUser, id: number): User
applyPatch(user: User, patch: UserPatch): User   // nowy obiekt, bez mutacji
countRoles(users: readonly User[]): RoleCounts   // rola bez wystąpień ma mieć 0
```

Przykłady:

```ts
const user: User = { id: 1, name: "Ala", email: "ala@example.com", role: "admin" };

toPreview(user);
// { id: 1, name: "Ala" }   ← tylko te dwa pola, bez email i role

createUser({ name: "Bob", email: "bob@example.com", role: "viewer" }, 7);
// { id: 7, name: "Bob", email: "bob@example.com", role: "viewer" }

applyPatch(user, { name: "Ala K." });
// { id: 1, name: "Ala K.", email: "ala@example.com", role: "admin" }
// user zostaje nietknięty

countRoles([user]);
// { admin: 1, editor: 0, viewer: 0 }
```
