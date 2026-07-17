## Hint 1

Fingerprint zbuduj deterministycznie z `customerId`, `sku` i `quantity` w stałej
kolejności.

## Hint 2

Obsłuż wyniki `beginIdempotent` przed wywołaniem `createOrder`.

## Hint 3

Dla `acquired` użyj `try/catch`: w catch zaczekaj na release i ponownie rzuć błąd.
