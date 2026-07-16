## Hint 1

Różnica jest składniowa: `handle(value: T): void` kontra
`handle: (value: T) => void`.

## Hint 2

Właściwość funkcyjna podlega `strictFunctionTypes`.

## Hint 3

`notifyAll` iteruje po readonly tablicy i przekazuje każdy element do `handler.handle`.
