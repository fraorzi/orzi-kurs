## Hint 1

`const diagnostics = channel(name)` raz, w domknięciu — publikacje używają
tej samej instancji kanału.

## Hint 2

Bramka to `if (!diagnostics.hasSubscribers) return false;` — **przed**
wywołaniem `createMessage`.

## Hint 3

`diagnostics.publish(createMessage())` i `return true` — publish przyjmuje
gotową wiadomość; lenistwo zapewnia twoja bramka, nie API.
