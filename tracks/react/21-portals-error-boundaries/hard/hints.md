## Hint 1

Mapując widgety, owiń każdy osobną instancją `WidgetErrorBoundary`.

## Hint 2

`componentDidCatch` może przekazać błąd razem z `widgetId` do callbacka.

## Hint 3

W `componentDidUpdate` porównaj poprzedni i aktualny `resetKey`; przy zmianie ustaw
`hasError: false`.
