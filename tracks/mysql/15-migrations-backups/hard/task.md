# Hard — przygotuj kontrolowany online rollout

Dodanie kolumny do produkcyjnej tabeli `orders` bez planu to ryzyko
podwójne: DDL, który wykonuje pełny `COPY` tabeli, blokuje zapisy na czas
trwania operacji, a backup, którego nikt nigdy nie odtworzył, nie jest
dowodem niczego. Ten sam skrypt ma udokumentować proces backup/restore
przed zmianą, wymusić bezpieczny algorytm `ALTER` i zostawić ślad audytowy
zastosowanej wersji.

## Wymagania

- Skomentuj preflight: `mysqldump --single-transaction` źródłowej tabeli
  do pliku oraz próbny `mysql restore_check < plik` do OSOBNEJ bazy — to
  jedyny sposób, by backup faktycznie *udowodnił* odzyskiwalność, nie tylko
  istniał.
- `ALTER TABLE orders ADD COLUMN source ... ALGORITHM=INSTANT` — jawny
  algorytm wymusza operację metadata-only; brak jawnego `ALGORITHM`
  pozwoliłby silnikowi po cichu wybrać `COPY` i zablokować tabelę na czas
  przepisania.
- Kolumna ma `DEFAULT 'web'` — istniejące zamówienia i nowe wiersze
  dostają wartość bez oddzielnego backfillu.
- Zapisz zastosowaną wersję migracji w `schema_migrations` — jeden wiersz
  na jedną udaną migrację.

`schema_migrations.version` jako `PRIMARY KEY` to świadomy wybór: powtórne
uruchomienie tego samego skryptu ma zawieść głośno (kolumna już istnieje,
klucz wersji już zajęty), a nie zastosować zmianę po cichu drugi raz.
