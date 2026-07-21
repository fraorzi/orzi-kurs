## Hint 1

Zwykłe `ANALYZE TABLE` aktualizuje statystyki indeksów/wierszy, nie
histogram kolumnowy — histogram wymaga osobnej klauzuli.

## Hint 2

`ANALYZE TABLE events UPDATE HISTOGRAM ON status WITH 16 BUCKETS` — liczbę
bucketów deklarujesz jawnie w `WITH`.

## Hint 3

Sprawdź `information_schema.column_statistics`: `number-of-buckets-specified`
ma być `16`, a pierwszy bucket (`error`, alfabetycznie przed `ok`) ma
cumulative frequency w okolicach `0.01`.
