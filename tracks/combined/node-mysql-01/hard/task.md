# Transakcyjna warstwa danych

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

## Kontekst

Use case zapisuje zamówienie i jego pozycje w jednej transakcji MySQL.
InnoDB pod obciążeniem czasem wybiera transakcję jako "ofiarę" deadlocka
(`ER_LOCK_DEADLOCK`) i ją przerywa - jedyna poprawna reakcja to powtórzenie
CAŁEJ transakcji od `BEGIN`, nie pojedynczego zapytania.

## Wymagania

- `transact(tx)` wykonuje `begin → work → commit`; przy błędzie w `work`
  wykonuje `rollback` przed jakąkolwiek dalszą decyzją.
- Retry tylko dla błędu z `code === "ER_LOCK_DEADLOCK"`, maksymalnie
  3 próby łącznie.
- Każda próba to pełny cykl `begin → work → (commit | rollback)` - retry
  zaczyna nową transakcję, nie kontynuuje przerwanej.
- Błąd inny niż deadlock (albo wyczerpane próby) propaguje się po
  `rollback`, bez kolejnej próby.

## Kryteria akceptacji

- Deadlock na pierwszej próbie: druga próba wykonuje się i kończy
  sukcesem, z pełnym cyklem `begin/work/rollback/begin/work/commit`.
- Błąd inny niż `ER_LOCK_DEADLOCK` kończy się natychmiastowym `rollback`
  i propagacją błędu, bez drugiej próby.
- Powtarzający się deadlock zatrzymuje się po dokładnie 3 próbach.
