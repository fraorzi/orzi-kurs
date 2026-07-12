## Hint 1

`withTimeout`: `Promise.race([promise, timer])`, gdzie timer to promise odrzucający
po `ms` błędem z ustawionym `err.name = "TimeoutError"`.

## Hint 2

`firstSuccess`: `new Promise((resolve, reject))`. Dla każdego wejścia:
`p.then(resolve, onError)` — pierwszy sukces rozwiązuje całość (kolejne resolve
są ignorowane, bo stan promisa zmienia się raz).

## Hint 3

W `onError` zapisuj błąd pod właściwym indeksem (`errors[i] = err`) i licz odrzucenia.
Gdy liczba odrzuceń zrówna się z długością wejścia —
`reject(new AggregateError(errors, "All promises were rejected"))`.
Pustą tablicę obsłuż przed pętlą.
