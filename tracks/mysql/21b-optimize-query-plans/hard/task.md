# Usuń koszt rosnącego OFFSET

Zachowaj stronę ids 501–510, ale użyj cursor id=500 zamiast skanowania i odrzucania pięciuset rekordów.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
