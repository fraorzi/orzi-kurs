# Przywróć klientów bez płatnych zamówień

Raport ma zwrócić każdego klienta i paid_total=0 przy braku płatności. Napraw filtr statusu, który przypadkiem anuluje semantykę LEFT JOIN.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
