# Moduł SKJ: cache i retry klienta HTTP

## Grupa

SKJ

## Kiedy

Gdy wiele żądań tego samego zasobu ma współdzielić cache i retry tylko bezpiecznych błędów przejściowych.

## Pułapki

Cache bez TTL jest wieczny; retry 4xx marnuje zasoby, a równoległe missy mogą wywołać stampede.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
