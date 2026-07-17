## Hint 1

Po `const { slug } = await params` użyj `(slug ?? []).map(...)`.

## Hint 2

Owiń `decodeURIComponent` w `try/catch`, bo błędna sekwencja procentowa rzuca.

## Hint 3

Sprawdzaj separator już po dekodowaniu — `%2F` również nie może przejść.
