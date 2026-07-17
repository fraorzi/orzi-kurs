## Hint 1

Nasłuch jako promise: `server.once("error", reject)` +
`server.listen(0, "127.0.0.1", resolve)`.

## Hint 2

`server.address()` zwraca `AddressInfo | string | null` — zawęź: odrzuć
`null` i string (unix socket), dopiero potem czytaj `.port`.

## Hint 3

Zamknięcie też jest asynchroniczne: `server.close(cb)` opakuj w promise
i wykonaj w `finally`.
