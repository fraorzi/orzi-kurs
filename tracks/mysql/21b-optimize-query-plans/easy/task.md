# Zamień pełny index scan na range scan

Zachowaj rekordy z 10 stycznia 2026, ale usuń funkcję DATE z indeksowanej kolumny i udowodnij range access przez EXPLAIN.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
