# Utwardź partnerski endpoint POST

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Endpoint przyjmuje JSON tylko z originu `https://partner.example` i poprawnym
`x-api-key` równym `PARTNER_API_KEY`. Dodaj również `OPTIONS`.

Wymagania: allow-list CORS (bez `*`), limit `content-length` 1024 B, content type
JSON, walidacja niepustego `name` do 80 znaków, statusy 401/403/413/415/400 oraz
201 z `Location: /api/items/{id}`. Nie wywołuj store po błędzie.
