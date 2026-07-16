# Dodaj idempotencję tworzenia zamówienia

`submitOrder` ignoruje repozytorium idempotencji. Użyj `beginIdempotent` z kluczem i
fingerprintem payloadu:

- `completed` → zwróć zapisany wynik z `replayed: true`, bez nowego zamówienia,
- `conflict` → zwróć stan `conflict`,
- `pending` → zwróć stan `pending`,
- `acquired` → utwórz zamówienie, zapisz wynik przez `completeIdempotent` i zwróć
  `replayed: false`.

Jeśli tworzenie rzuci, wywołaj `releaseIdempotent` i przepuść wyjątek. Repozytorium
gwarantuje atomowe zajęcie klucza.
