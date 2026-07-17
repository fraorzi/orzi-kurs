## Hint 1

Zacznij od `new URLSearchParams(current)`.

## Hint 2

Sprawdzaj obecność klucza przez `"query" in change`, aby odróżnić brak zmiany od
żądania usunięcia wartości.

## Hint 3

Po zmianie query lub sort usuń `page`; osobna zmiana page może ustawić go ponownie.
