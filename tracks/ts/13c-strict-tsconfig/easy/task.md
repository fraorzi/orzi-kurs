# Easy — bezpieczne indeksowanie cache

Zadanie działa z `noUncheckedIndexedAccess`.

Zaimplementuj cache użytkowników:

- `findCached(cache, id)` zwraca `User | null`,
- `firstCached(cache, ids)` zwraca pierwszego znalezionego użytkownika albo `null`,
- brak klucza nie może prowadzić do odczytu pola z `undefined`.

Nie używaj non-null assertion ani rzutowania.
