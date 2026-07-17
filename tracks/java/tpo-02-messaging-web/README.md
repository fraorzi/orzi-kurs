# Messaging, publish/subscribe i web request

## Grupa

TPO

## Kiedy

Gdy worker obsługuje at-least-once delivery, idempotency key i rozdziela ack od sukcesu domenowego.

## Pułapki

Ack przed commit traci wiadomość, ack po efekcie bez idempotencji może go powtórzyć, a sesja HTTP nie jest bazą danych.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
