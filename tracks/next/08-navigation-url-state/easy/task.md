# Aktualizuj query bez utraty filtrów

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `patchCatalogQuery`. Zachowaj parametry nieobjęte zmianą. Puste
`query`, domyślne `sort=relevance` i `page <= 1` usuń z URL. Zmiana `query` albo
`sort` ma usunąć `page`. Wynik zwróć jako query string bez początkowego `?`.
