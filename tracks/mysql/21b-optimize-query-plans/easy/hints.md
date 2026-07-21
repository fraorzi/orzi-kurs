## Hint 1

Poprawność i jakość planu to osobne bramki — nie musisz "naprawiać"
wyniku, on już jest poprawny. Problem jest wyłącznie w planie.

## Hint 2

`DATE(created_at)` wymaga wyliczenia funkcji dla każdego wpisu indeksu —
optymalizator nie potrafi przez to zawęzić zakresu przeszukiwania
`ix_events_created`, więc skanuje cały indeks (`type: index`) zamiast
jego fragmentu (`type: range`).

## Hint 3

Zapisz dzień jako półotwarty zakres na surowej kolumnie: `created_at >=
'2026-01-10' AND created_at < '2026-01-11'` — porównanie bezpośrednio na
`created_at`, bez żadnej funkcji wokół niej, pozwala optymalizatorowi
użyć `range` po `ix_events_created`.
