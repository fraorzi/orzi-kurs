# Udostępnij bezpieczny widok kontaktów

Utwórz active_customer_contacts z SQL SECURITY INVOKER. Widok zwraca tylko id i email aktywnych klientów, bez password_hash.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
