# Usuń correlated aggregate per row

Zachowaj total każdego klienta, ale zastąp skorelowane SUM jednym LEFT JOIN i GROUP BY.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
