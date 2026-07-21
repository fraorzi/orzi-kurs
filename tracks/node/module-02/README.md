# Moduł 02 — rdzeń usługi HTTP

Drugi moduł wieloplikowy: komponowalny rdzeń usługi HTTP na standardowych
obiektach `Request`/`Response` — testowalny bez otwierania socketa. Łączy
routing z 405/Allow (08), limit body (08), envelope błędów z requestId (08),
korelację żądań (06/15) oraz idempotencję mutacji — kontrakt, dzięki któremu
retry klienta nie duplikuje operacji.
