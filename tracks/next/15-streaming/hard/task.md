# Streamuj duży eksport bez buforowania

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `streamReport`. Najpierw wykonaj `findReport(id)`. Dla braku zwróć
404 przed uruchomieniem generatora. Dla istniejącego raportu zwróć CSV jako
`ReadableStream`: nagłówek `id,total\n`, a potem po jednym wierszu z `openRows(id)`.

Odpowiedź ma powstać bez oczekiwania na pierwszy wiersz. Ustaw `Content-Type` CSV,
`Content-Disposition` z bezpieczną nazwą raportu, `X-Content-Type-Options: nosniff`
i `X-Accel-Buffering: no`. Anulowanie czytnika ma wywołać `return()` iteratora.
