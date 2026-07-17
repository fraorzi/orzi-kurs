## Hint 1

Typ fallbacku to `NoInfer<Options[number]>`.

## Hint 2

`Options[number]` tworzy unię elementów readonly tuple.

## Hint 3

Runtime: `options.includes(requested)` sprawdza wartość, a typ wyniku funkcji jest już
ograniczony do elementów opcji.
