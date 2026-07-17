# TCP, wielu klientów i shutdown

## Grupa

SKJ

## Kiedy

Gdy serwer ma limit sesji, timeout i poprawnie zwalnia slot także po błędzie handlera.

## Pułapki

Jedno `read` nie gwarantuje całej wiadomości; wątek per klient nie skaluje, a brak timeoutu blokuje graceful shutdown.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
