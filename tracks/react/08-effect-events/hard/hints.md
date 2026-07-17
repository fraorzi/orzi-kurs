## Hint 1

`intervalMs` konfiguruje proces zewnętrzny, więc jest reaktywną zależnością efektu.

## Hint 2

`query` i `onPoll` są potrzebne dopiero, gdy scheduler wywoła tick.

## Hint 3

Effect Event wywołuje `onPoll(query)`, a efekt przekazuje go do
`scheduler.start(intervalMs, onTick)`.
