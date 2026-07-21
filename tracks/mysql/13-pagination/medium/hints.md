## Hint 1

Cursor odwzorowuje cały `ORDER BY` — obie kolumny, ten sam kierunek co w
sortowaniu.

## Hint 2

Samo `created_at < kursor` gubi wiersze, które dzielą znacznik czasu z
kursorem, ale mają mniejsze `id` — to właśnie robi błędny starter.

## Hint 3

Użyj porównania krotki: `(created_at, id) < ('2026-01-02 10:00:00', 5)`.
