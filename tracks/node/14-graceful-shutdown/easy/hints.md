## Hint 1

Wspólny promise w domknięciu: `let pending: Promise<void> | undefined`
i `return () => (pending ??= start())`.

## Hint 2

`Promise.allSettled(cleanups.map((c) => c()))` uruchamia wszystkie i czeka
na komplet — w przeciwieństwie do `Promise.all` nie porzuca reszty po
pierwszej awarii.

## Hint 3

Po allSettled poszukaj pierwszego `status === "rejected"` i rzuć jego
`reason` — kontrakt: wszyscy posprzątali, ale wynik jest błędem.
