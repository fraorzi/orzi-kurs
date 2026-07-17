# Diagnostyka, NIO i backpressure

## Grupa

SKJ

## Kiedy

Gdy producer sieciowy nie może bez końca dokładać danych szybszych niż consumer.

## Pułapki

Nieograniczona kolejka ukrywa przeciążenie do OOM; selector bez poprawnego interestOps może kręcić CPU.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
