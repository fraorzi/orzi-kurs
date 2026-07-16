# Aktualizuj query bez utraty filtrów

Zaimplementuj `patchCatalogQuery`. Zachowaj parametry nieobjęte zmianą. Puste
`query`, domyślne `sort=relevance` i `page <= 1` usuń z URL. Zmiana `query` albo
`sort` ma usunąć `page`. Wynik zwróć jako query string bez początkowego `?`.
