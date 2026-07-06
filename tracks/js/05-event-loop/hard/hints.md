## Hint 1

Kolejka to po prostu **łańcuch promisów** trzymany w domknięciu: `let queue =
Promise.resolve()`. Każde wywołanie doczepia swoją pracę przez `then` i podmienia
`queue` — README, sekcja „Serializacja wywołań".

## Hint 2

Wrapper: `const result = queue.then(run, run)` — `run` jako handler sukcesu I błędu
sprawia, że praca wystartuje niezależnie od losu poprzednika. Zwróć `result`
wywołującemu (jego sukces/błąd), ale do `queue` przypisz wersję ze złapanym błędem:
`queue = result.catch(() => {})` — inaczej jedno odrzucenie zepsuje cały łańcuch.

## Hint 3

Pamiętaj o argumentach: `const run = () => fn.apply(this, args)` wewnątrz
`function (...args)`.
