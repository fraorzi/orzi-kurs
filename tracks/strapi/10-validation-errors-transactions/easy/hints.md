## Hint 1

Trzy strażniki po kolei, każdy z własnym `throw new Error("Nieprawidłowe: <pole>")`
— `typeof input !== "object" || input === null` łapie non-obiekty przed
jakimkolwiek dostępem do właściwości.

## Hint 2

Rzutuj dopiero po strażniku kształtu: `const value = input as Record<string, unknown>`,
inaczej TypeScript nie pozwoli czytać `value.title`.

## Hint 3

`value.title.trim().length < 3` sprawdza **po** trymowaniu — sam string
z samych spacji (`"   "`) ma po trymowaniu 0 znaków i musi zostać odrzucony.
