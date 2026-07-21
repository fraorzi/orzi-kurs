# Hard — zmapuj błąd na bezpieczną odpowiedź

Centralny handler błędów usługi. Zaimplementuj `solve(error, requestId)`:

- `Error` o `name === "ValidationError"` → status 400, `body.error` z jego
  komunikatem (opisuje wejście klienta, może wrócić do klienta);
- każdy inny przypadek (obcy `Error`, rzucony string, `undefined`…) →
  status 500 i **generyczny** `body.error: "Internal Server Error"` —
  komunikat wewnętrznego wyjątku nie może wyciec;
- w obu przypadkach `body.requestId` — klient poda go supportowi, a ty
  skorelujesz z logami, gdzie leżą pełne szczegóły.
