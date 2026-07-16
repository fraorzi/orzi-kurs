## Hint 1

`EventPayload<K>` to po prostu `AppEventMap[K]`.

## Hint 2

Unię kopert zbuduj mapped type, a potem odczytaj ją przez `[EventName]`.

## Hint 3

W `formatEvent` pole `type` zawęża jednocześnie typ `payload`.
