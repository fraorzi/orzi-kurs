# Wycofaj opcjonalny krok do savepointu

Zmniejsz zapas A o 2. Wycofaj wyłącznie opcjonalny wpis telemetryczny, a następnie zapisz obowiązkowy audyt i zatwierdź zmianę zapasu.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
