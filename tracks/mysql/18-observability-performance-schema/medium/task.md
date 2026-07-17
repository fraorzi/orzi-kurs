# Połącz oczekującą blokadę z blokującą sesją

Zbuduj raport data_lock_waits: waiting_thread_id, blocking_thread_id, object_schema, object_name, lock_type i lock_mode oczekującej blokady.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
