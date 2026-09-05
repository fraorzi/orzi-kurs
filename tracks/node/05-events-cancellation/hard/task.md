# Hard - zbuduj bezpieczny kanał zdarzeń

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Współdzielony kanał zdarzeń w usłudze ma dwa twarde wymagania: emisja `error`
nie może ubić procesu, a raportowanie błędów nie może wyciekać danych.
Zaimplementuj fabrykę `solve(report)`:

- zwróć `EventEmitter`, który **od chwili powstania** ma listener `error`;
- listener przekazuje do `report` wyłącznie `error.message` - nie cały obiekt,
  bo pola błędów (nagłówki, konfiguracja) potrafią nieść sekrety;
- kanał pozostaje zwykłym emitterem: konsumenci mogą się subskrybować
  i odsubskrybować bez wpływu na handler błędów.
