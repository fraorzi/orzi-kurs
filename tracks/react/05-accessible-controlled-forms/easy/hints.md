## Hint 1

Przechowuj wartość inputa w `useState("")` i podłącz jednocześnie `value` oraz
`onChange`.

## Hint 2

Przycisk czyszczący powinien mieć `type="button"`, aby nie wysyłał formularza.

## Hint 3

W handlerze submitu wywołaj `preventDefault()`, policz `query.trim()` i dopiero
niepustą wartość przekaż do `onSearch`.
