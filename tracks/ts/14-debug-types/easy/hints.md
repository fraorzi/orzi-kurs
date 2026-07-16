## Hint 1

Pierwsza linia logiki: `const invoice: unknown = readSdkInvoice(payload)`.

## Hint 2

Sprawdź obiekt, pole `items`, `Array.isArray` i `every` z predykatem pozycji.

## Hint 3

Po `every(isItem)` elementy tablicy są zawężone i `reduce` nie potrzebuje `any`.
