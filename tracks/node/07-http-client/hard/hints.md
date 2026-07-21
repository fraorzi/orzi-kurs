## Hint 1

Pętla `for attempt in 1..attempts`; wychodzisz `return response`, gdy status
nie jest w `[429, 503]` **albo** to była ostatnia próba.

## Hint 2

`Number(response.headers.get("retry-after") ?? "0")` plus strażnik
`Number.isFinite` — nagłówek bywa śmieciem, a `sleep(NaN)` to bug.

## Hint 3

Sekundy → milisekundy przy wywołaniu `sleep`. Test sprawdza dokładne
argumenty kolejnych wywołań.
