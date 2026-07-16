## Hint 1

Modeluj stan jako unię `idle | pending | success | error`, zamiast niezależnych
booleanów.

## Hint 2

W handlerze ustaw pending, awaituj `save`, a potem ustaw success lub error w
`catch`. Nie wywołuj `.focus()` na komunikacie.

## Hint 3

`role="status"` jest odpowiedni dla potwierdzenia, a `role="alert"` dla ważnego
błędu wymagającego szybszego ogłoszenia.
