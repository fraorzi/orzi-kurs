# Moduł TPO: idempotentny worker

## Grupa

TPO

## Kiedy

Gdy API zapisuje outbox, worker obsługuje wiadomość co najmniej raz i emituje metrykę bez duplikacji efektu.

## Pułapki

Exactly-once end-to-end jest zwykle iluzją; potrzebne są idempotency key, atomowy zapis stanu i kontrolowany retry.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
