# Refaktor kolejki operacyjnej z budżetem pracy

Tryb: optymalizacja. Popraw istniejący kod w `starter.tsx`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`OperationsDashboard` jest poprawny, lecz prywatna notatka i render rodzica
powtarzają kosztowne `buildQueue` oraz commit listy.

Po pomiarze wykonaj trzy współpracujące zmiany:

- przenieś stan notatki do osobnego komponentu,
- zapamiętaj wynik `buildQueue(tickets, filter)` z kompletnymi zależnościami,
- memoizuj `QueueList`, ponieważ lista jest zmierzonym kosztownym poddrzewem.

Zmiana filtra nadal ma dokładnie raz przeliczyć kolejkę i pokazać właściwe dane.
