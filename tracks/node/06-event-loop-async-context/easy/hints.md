## Hint 1

Pętla po `index += batchSize`, wewnątrz `items.slice(index, index + batchSize)`
mapowane synchronicznie do tablicy wyników.

## Hint 2

Po każdej partii: `await setImmediate()` z `node:timers/promises` — to wersja
promisowa, nie globalny `setImmediate(callback)`.

## Hint 3

Test przeplotu oblejesz i wtedy, gdy yieldujesz mikrotaskiem
(`await Promise.resolve()`) — mikrotask nie oddaje sterowania fazie check.
