## Hint 1

Przechowuj bieżącą Promise w `useState(() => loadReport())`.

## Hint 2

Error Boundary może resetować `hasError`, gdy zmieni się prop `resetKey`.

## Hint 3

W retry utwórz nową Promise i ustaw ją wewnątrz `startTransition`.
