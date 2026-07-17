## Hint 1

Warianty `editing`, `submitting` i `error` przechowują e-mail potrzebny do formularza
i retry.

## Hint 2

Handler submitu może działać tylko dla `editing` albo `error`.

## Hint 3

Przed `await` ustaw `submitting`; w `try` ustaw `success`, a w `catch` jeden wariant
`error`, zamiast osobnych booleanów.
