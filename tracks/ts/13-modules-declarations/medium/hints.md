## Hint 1

Deklaracja funkcji nie ma ciała: `export function summarize(...): MetricSummary;`.

## Hint 2

Parametr powinien być `readonly MetricSample[]`, bo implementacja nie mutuje listy.

## Hint 3

W dashboardzie zapisz wynik `summarize` i sformatuj `average.toFixed(2)`.
