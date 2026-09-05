# Medium - śledź aktywne żądania

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Shutdown musi wiedzieć, kiedy bieżąca praca się skończyła. Zaimplementuj
tracker `solve()`:

- `enter()` inkrementuje licznik i zwraca funkcję `leave` - **idempotentną**
  (drugie wywołanie nie dekrementuje ponownie);
- `active()` zwraca bieżącą liczbę;
- `drain(signal)` zwraca promise, który rozwiązuje się gdy licznik spadnie
  do zera (od razu, jeśli już jest zero); przerwanie sygnału odrzuca
  czekanie z `signal.reason`.
