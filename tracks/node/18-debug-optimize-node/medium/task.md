# [O] Medium — ogranicz współbieżność

Starter wykonuje wszystkie joby przez `Promise.all` — poprawne wyniki,
ale nieograniczona liczba równoległych operacji (dla 10 000 jobów = 10 000
otwartych połączeń).

Kontrakt funkcjonalny (bez zmian):

- wyniki wracają w kolejności wejścia;
- `limit < 1` to `Error`.

Bramka `[quality]`: szczyt liczby jednocześnie trwających `run` nie może
przekroczyć `limit` — a przy `limit ≥ 2` praca ma być realnie równoległa
(szczyt > 1). Zbuduj pulę workerów zdejmujących ze wspólnego indeksu.
