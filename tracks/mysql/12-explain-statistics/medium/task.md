# Medium — dodaj histogram rozkładu statusów

Kolumna `status` w tabeli `events` nie ma indeksu — dwie wartości
(`ok`/`error`) mają zbyt niską selektywność, żeby indeks się opłacał. Ale
rozkład jest silnie nierówny: `error` to około 1% wierszy, reszta to `ok`.
Bez informacji o tym rozkładzie optimizer zakłada podział mniej więcej
równy i może źle oszacować liczbę wierszy dla `WHERE status = 'error'` w
większym zapytaniu z join. Histogram kolumnowy daje optimizerowi realny
rozkład wartości bez kosztu utrzymania indeksu przy każdym zapisie.

## Wymagania

- Wygeneruj histogram dla `status` z dokładnie 16 zadeklarowanymi bucketami
  (`WITH 16 BUCKETS`).
- Użyj `ANALYZE TABLE ... UPDATE HISTOGRAM`, nie samego `ANALYZE TABLE` —
  to drugie tylko odświeża statystyki indeksów/wierszy i nie tworzy ani nie
  usuwa histogramów kolumnowych.
- Histogram ma trafić do `information_schema.column_statistics` z
  poprawnym typem danych (`string`) i niepustą listą bucketów.

Liczba faktycznie użytych bucketów bywa mniejsza niż zadeklarowana — przy
niewielkiej liczbie odrębnych wartości (tu: `ok`/`error`) MySQL tworzy
histogram typu `singleton` z jednym bucketem na wartość, ale
`number-of-buckets-specified` nadal odzwierciedla to, co podano w `WITH ...
BUCKETS`.
