# Medium - deklaracja dla legacy modułu metryk

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Plik `legacy-metrics.js` jest zastanym JavaScriptem i nie wolno go zmieniać.
Uzupełnij `legacy-metrics.d.ts`, aby dokładnie opisać jego API:

- `MetricSample` ma `name: string` i `value: number`,
- `MetricSummary` ma `count`, `total`, `average`,
- `summarize` przyjmuje readonly listę próbek i zwraca podsumowanie.

Następnie uzupełnij `dashboard.ts`, który zwraca tekst
`"<name>: count=<n>, avg=<x.xx>"`. Dla pustej listy średnia ma wynosić 0.
