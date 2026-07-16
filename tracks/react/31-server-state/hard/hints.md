## Hint 1

Zachowaj klucz w zmiennej, bo używają go query i trzy callbacki mutacji.

## Hint 2

`onMutate` w Query 5 otrzymuje `(variables, context)`, a klient jest w
`context.client`.

## Hint 3

Snapshot pobierzesz przez `getQueryData<Stock>(queryKey)`.

## Hint 4

`setQueryData` może przyjąć updater zachowujący pozostałe pola obiektu.

## Hint 5

`onError` otrzymuje wynik `onMutate` przed końcowym `context`.
