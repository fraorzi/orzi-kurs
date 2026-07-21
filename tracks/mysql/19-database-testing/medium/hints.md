## Hint 1

Testy zwykle nie chcą `COMMIT` nawet po udanym `work()` — inaczej dane
zielonego testu zostają w bazie i zanieczyszczają kolejny.

## Hint 2

`finally` wykona się zarówno po `return`, jak i po rzuconym wyjątku —
to naturalne miejsce na bezwarunkowy `rollback()`, bez rozróżniania
happy/error path osobnym kodem.

## Hint 3

Kształt: `await connection.beginTransaction(); try { return await work();
} finally { await connection.rollback(); }` — żadnego `commit()` na
żadnej ścieżce, `rollback()` przy sukcesie też jest poprawny (cofa tylko
dane testowe, nie wynik funkcji).
