# Kontrolowana wyszukiwarka produktów

Zaimplementuj `ProductSearch`.

Formularz ma zawierać pole `Szukaj produktów`, przycisk `Szukaj` i przycisk
`Wyczyść`. Pole ma być kontrolowane:

- `Wyczyść` ustawia jego wartość na pusty string,
- submit wywołuje `onSearch` z wartością po `trim()`,
- pusty query po normalizacji nie wywołuje callbacku.
