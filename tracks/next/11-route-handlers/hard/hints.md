## Hint 1

Utwórz `AbortController` i timer wywołujący `controller.abort()`.

## Hint 2

W catch rozpoznaj `error instanceof DOMException && error.name === "AbortError"`.

## Hint 3

Payload potraktuj jako `unknown` i sprawdź sku oraz nieujemną całkowitą available.
