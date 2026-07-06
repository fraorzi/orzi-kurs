## Hint 1

`delay`: sekcja „Tworzenie" w README zawiera niemal gotowy kod — `new Promise`,
w executorze `setTimeout(resolve, ms)`.

## Hint 2

`promisify`: zwróć funkcję `(...args)`, która tworzy `new Promise((resolve, reject))`
i wywołuje `f(...args, callback)`, gdzie callback tłumaczy `(err, result)` na
`reject(err)` / `resolve(result)`. Wzór jest w README w sekcji „Promisyfikacja".
