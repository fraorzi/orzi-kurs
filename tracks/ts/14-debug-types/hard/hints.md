## Hint 1

Odczytaj trzy wartości do lokalnych `const` i zbuduj tablicę błędów.

## Hint 2

Napisz predykat `isLogLevel(value): value is ServiceConfig["logLevel"]`.

## Hint 3

Po zwróceniu błędów kompilator może nadal nie połączyć długości tablicy z typami pól.
Powtórz mały warunek osiągalności i rzuć błąd wewnętrzny zamiast używać assertion.
