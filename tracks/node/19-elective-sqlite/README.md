# Elective: node:sqlite

## Kiedy

Gdy aplikacja potrzebuje lokalnej, osadzonej bazy bez osobnego serwera i świadomie akceptuje status release candidate API w Node 24.

## Pułapki

Wartości muszą trafiać do prepared statement jako parametry, nazwy tabel wymagają allow-listy, a transakcja i migracja muszą mieć jawną ścieżkę rollbacku.

## Źródła

- [Node.js 24 API: sqlite](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
