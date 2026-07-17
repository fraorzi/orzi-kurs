## Hint 1

Stan jest potrzebny tylko dla ilości wpisanej przez użytkownika.

## Hint 2

`totalCents` to zwykłe `quantity * unitPriceCents` policzone w renderze.

## Hint 3

W `onSubmit` wywołaj `preventDefault()` i od razu przekaż bieżący payload do
`onConfirm`. Nie twórz `shouldConfirm`.
