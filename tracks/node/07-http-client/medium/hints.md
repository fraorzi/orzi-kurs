## Hint 1

`AbortSignal.timeout(timeoutMs)` tworzy sygnał, który przerwie się sam —
bez timera po twojej stronie.

## Hint 2

Łączenie: `parent ? AbortSignal.any([parent, timeout]) : timeout` — `any`
przerywa się z powodem pierwszego przerwanego sygnału.

## Hint 3

Całość to jedno wywołanie `fetcher(url, { signal })` — jeżeli masz
`setTimeout`/`clearTimeout`, rozwiązujesz zadanie pod prąd.
