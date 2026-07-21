## Hint 1

`import { once } from "node:events"` — `once(emitter, event, { signal })`
zwraca promise tablicy argumentów emisji.

## Hint 2

Zdarzenie może mieć wiele argumentów; kontrakt zadania to pierwszy z nich:
`const [value] = await once(...)`.

## Hint 3

Sprzątanie listenera po abortcie dostajesz od `events.once` za darmo — jeżeli
piszesz własne `removeListener`, robisz to zadanie na trudniejszej ścieżce.
