# Kontrolowana wyszukiwarka produktów

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `ProductSearch`.

Formularz ma zawierać pole `Szukaj produktów`, przycisk `Szukaj` i przycisk
`Wyczyść`. Pole ma być kontrolowane:

- `Wyczyść` ustawia jego wartość na pusty string,
- submit wywołuje `onSearch` z wartością po `trim()`,
- pusty query po normalizacji nie wywołuje callbacku.
