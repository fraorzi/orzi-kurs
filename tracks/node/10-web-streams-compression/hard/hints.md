## Hint 1

Trzy ogniwa w `await pipeline(...)`: `Readable.from(input)`, `createGzip()`
i `new Writable({ write(chunk, _enc, cb) { chunks.push(...); cb(); } })`.

## Hint 2

Wynik to `Buffer.concat(chunks)` po zakończeniu pipeline'u.

## Hint 3

Propagację błędu dostajesz od `pipeline` za darmo — jeżeli łapiesz błąd
i zwracasz częściowy wynik, psujesz kontrakt zadania.
