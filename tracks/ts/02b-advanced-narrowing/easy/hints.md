## Hint 1

Sygnatura pierwszej funkcji kończy się przez `value is NonNullable<T>`.

## Hint 2

Sprawdź `value !== null && value !== undefined`; truthiness usunęłoby też `0` i `""`.

## Hint 3

W `isString` usuń `: boolean`. Jednoznaczne `return typeof value === "string"` pozwala
TS 5.5+ wywnioskować predykat.
