# Easy - zbuduj idempotentny shutdown

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Sygnał zamknięcia może przyjść wiele razy i z wielu miejsc naraz.
Zaimplementuj `solve(cleanups)`:

- zwróć funkcję `shutdown()`, która uruchamia wszystkie cleanupy
  **dokładnie raz** - również gdy zostanie wywołana równolegle
  lub po zakończeniu;
- każde wywołanie `shutdown()` zwraca **ten sam** promise;
- wszystkie cleanupy mają się wykonać nawet gdy któryś padnie
  (`Promise.allSettled`), a pierwsza awaria ma odrzucić wynik.
