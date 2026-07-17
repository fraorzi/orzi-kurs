# Audyt tracka MySQL

Data: 2026-07-17. Cel: MySQL 8.4.10 LTS i `mysql2` 3.23.0.

## Wynik

Track ma 22 tematy, dwa moduły i 68 zadań wykonywanych na prawdziwym serwerze
MySQL. Nie ocenia SQL przez porównanie tekstu: każdy test tworzy izolowany schemat
`utf8mb4`, wykonuje migrację lub zapytanie, sprawdza stan danych i usuwa fixture.

| Etap | Zakres |
|---|---|
| Fundamenty | SELECT/NULL, typy, czas, tekst, JSON, JOIN, agregacje, CTE, windows i DML |
| Integralność | constraints, relacje, transakcje, savepointy, MVCC, locking reads i deadlock retry |
| Wydajność | indeksy, covering, EXPLAIN ANALYZE, statystyki, histogramy, invisible indexes i keyset |
| Operacje | modelowanie, migracje online, backup/restore, views, generated columns i routines |
| Bezpieczeństwo | users, roles, least privilege, Performance Schema i lock waits |
| Integracja | testy bazy, typowane mysql2, incydenty danych i quality gates planów |
| Moduły | marketplace pod konkurencją i produkcyjne repozytorium Node/TypeScript |

Zadania współbieżności używają oddzielnych sesji i sprawdzają rzeczywiste zachowanie
izolacji, blokady ostatniej sztuki oraz deadlock. Moduły wymagają prepared statements,
pełnego retry transakcji, lifecycle puli, stabilnej paginacji i bezpiecznych metryk.

## Weryfikacja

- 68/68 rozwiązań na MySQL 8.4.10,
- 68/68 pierwotnych starterów ma poprawną bramkę,
- każdy test bezwarunkowo sprząta własny schemat.

## Źródła pierwotne

- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [MySQL LTS i Innovation](https://dev.mysql.com/doc/refman/8.4/en/mysql-releases.html)
- [MySQL 8.4 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/8.4/en/)
- [InnoDB transaction model](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)
- [EXPLAIN ANALYZE](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
