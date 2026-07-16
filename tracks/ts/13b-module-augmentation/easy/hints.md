## Hint 1

Napisz drugi `export interface RequestMeta { ... }` pod pierwszym.

## Hint 2

Pola pluginu są opcjonalne: `userId?: number` i `roles?: readonly string[]`.

## Hint 3

Sprawdź `meta.userId === undefined`; identyfikator 0 nadal byłby poprawną wartością.
