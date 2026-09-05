# Zabezpiecz optional catch-all katalogu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

`readCatalogSegments` obsługuje `app/catalog/[[...slug]]`, ale zwraca surowe dane.
Zaczekaj na params i dla braku `slug` zwróć pustą tablicę. Każdy segment:

- zdekoduj przez `decodeURIComponent`,
- odrzuć, jeśli po trimie jest pusty, równy `.`/`..` albo zawiera `/` lub `\\`,
- zwróć po usunięciu białych znaków z brzegów.

Dla błędnego kodowania lub segmentu rzuć `Nieprawidłowy segment katalogu`.
