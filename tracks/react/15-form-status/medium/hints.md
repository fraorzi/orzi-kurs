## Hint 1

Umieść select, przycisk i komunikat w komponencie `OrderControls`.

## Hint 2

`const { pending, data } = useFormStatus()` daje status nadrzędnego formularza.

## Hint 3

Podczas pending odczytaj `String(data?.get("product") ?? "")`.
