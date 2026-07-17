# Usuń lost update licznika

Dwa równoległe wykonania mają zwiększyć licznik o dwa. Zastąp read-modify-write pojedynczą atomową instrukcją UPDATE.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
