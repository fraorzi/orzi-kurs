## Hint 1

Starter sortuje okno tylko po `paid_at` i zostawia domyślną ramę —
przy remisie w `paid_at` domyślna `RANGE` wciąga do sumy wszystkie
wiersze o tej samej dacie naraz, nie tylko dotychczasowe.

## Hint 2

Dodaj `id` jako drugi klucz w `ORDER BY` wewnątrz `OVER`, żeby remis miał
deterministyczną kolejność, i jawną ramę
`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, żeby suma liczyła się
fizycznie wiersz po wierszu, a nie po grupie remisujących wartości.

## Hint 3

Kształt: `SUM(amount) OVER (ORDER BY paid_at, id ROWS BETWEEN UNBOUNDED
PRECEDING AND CURRENT ROW)`. Test z trzema płatnościami o identycznym
`paid_at` musi dać rosnący ciąg `10.00, 30.00, 35.00` — jeśli wszystkie
trzy wiersze pokazują `35.00`, rama wciąż jest domyślną `RANGE`.
