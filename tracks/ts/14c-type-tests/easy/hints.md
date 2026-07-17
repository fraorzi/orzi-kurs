## Hint 1

Zaimportuj `type User` i porównaj go z `ReturnType<typeof createUser>`.

## Hint 2

Typ pierwszego parametru to `Parameters<typeof createUser>[0]`.

## Hint 3

Komentarz `@ts-expect-error` musi być bezpośrednio nad wywołaniem z rolą `"owner"`.
