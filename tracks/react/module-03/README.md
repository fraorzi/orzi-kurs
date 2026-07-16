# Module 03 — konsola operacyjna

Końcowy moduł React łączy materiał 22–31 w przepływie podobnym do zadania
produktowego dla mida:

- lokalny filtr sterowany dostępnymi tabami i klawiaturą,
- osobne wpisy cache'u dla filtrów i request cancellation,
- stabilne identity rekordów,
- typowane tokeny CSS dla danych wizualnych,
- dostępny dialog z zarządzaniem focusem i klawiszem Escape,
- optimistic assignment z anulowaniem refetchu, snapshotem, rollbackiem i invalidacją,
- test integracyjny zachowania oraz mała kontrola jakości kodu.

API jest wstrzykiwane, a `QueryClient` pozostaje na granicy aplikacji. Dzięki temu
moduł nie wymaga dev serwera ani sieci i daje się testować deterministycznie.
