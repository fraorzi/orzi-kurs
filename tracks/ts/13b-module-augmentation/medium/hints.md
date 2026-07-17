## Hint 1

Po definicji `AuthUser` dodaj `declare module "./request" { ... }`.

## Hint 2

Wewnątrz augmentacji deklarujesz ponownie `interface RequestContext`.

## Hint 3

`attachUser` zwraca `{ ...context, user }`, a `requireUser` sprawdza
`context.user === undefined`.
