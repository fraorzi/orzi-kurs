## Hint 1

`retry`: najczytelniej rekurencyjnie albo pętlą w async funkcji — `attempts` razy:
spróbuj `return await fn()`, w `catch` zapamiętaj błąd; po pętli `throw lastError`.

## Hint 2

`allSettledLite`: dla każdego wejścia zbuduj promise, który NIGDY nie odrzuca:
`Promise.resolve(p).then(value => ({status: "fulfilled", value}), reason => ({status: "rejected", reason}))`.

## Hint 3

Tak zmapowaną tablicę „bezpiecznych" promisów możesz oddać do `Promise.all` —
skoro żaden nie odrzuca, `Promise.all` zbierze wszystkie i zachowa kolejność.
