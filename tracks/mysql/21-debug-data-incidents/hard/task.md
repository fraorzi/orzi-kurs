# Napraw migrację na zduplikowanych danych legacy

Dodaj email_normalized i UNIQUE. Przed indeksem usuń duplikaty po LOWER(TRIM(email)), zachowując rekord o najmniejszym id.

## Kryteria akceptacji

- Test regresji zachowuje kontrakt wyniku lub niezmiennik danych na MySQL 8.4.
- W zadaniu optymalizacyjnym poprawność startera pozostaje zielona, a zmienia się udowodniona jakość planu.
