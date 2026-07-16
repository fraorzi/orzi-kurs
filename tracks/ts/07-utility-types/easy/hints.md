## Hint 1

`Pick<T, K>` bierze klucze jako **unię literałów**, nie tablicę:

```ts
export type UserPreview = Pick<User, "id" | "name">;
```

`Omit<T, K>` działa odwrotnie — `Omit<User, "id">` to wszystko poza `id`.

## Hint 2

Utility types składają się jak klocki. Patch to „nowy użytkownik, ale każde pole
opcjonalne":

```ts
export type UserPatch = Partial<NewUser>;
```

Nie pisz `Partial<User>` — wpuściłbyś do patcha `id`.

## Hint 3

`Record<K, V>` z unią literałów w `K` wymusza komplet kluczy:

```ts
export type RoleCounts = Record<Role, number>;
// { admin: number; editor: number; viewer: number }
```

Dlatego `countRoles` musi zacząć od mapy wyzerowanej — inaczej rola bez wystąpień
zostałaby `undefined`, a to nie jest `number`.

## Hint 4

`applyPatch` i `createUser` to zwykły spread — pola z prawej strony nadpisują lewą:

```ts
return { ...user, ...patch };
return { id, ...input };
```

Spread tworzy **nowy** obiekt, więc test „nie mutuje wejścia" przechodzi za darmo.
`Object.assign(user, patch)` już by go oblał.

## Hint 5

`countRoles`: iteruj po użytkownikach i inkrementuj licznik pod kluczem `user.role`.
Typ `Role` to `User["role"]` (indeksowany dostęp), więc `counts[user.role]` jest bezpieczne
— kompilator wie, że taki klucz istnieje w `Record<Role, number>`.
