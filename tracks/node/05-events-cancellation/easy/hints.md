## Hint 1

`emitter.on(event, listener)`, a cleanup to `emitter.off(event, listener)` —
ta sama referencja listenera.

## Hint 2

Idempotencję daje flaga w domknięciu: `let active = true`, pierwszy cleanup
ustawia `false`, kolejne wywołania wychodzą wcześniej.

## Hint 3

Test "podwójny cleanup" łapie subtelny bug: bez flagi drugi `off()` zdjąłby
listener zarejestrowany ponownie po pierwszym sprzątaniu.
