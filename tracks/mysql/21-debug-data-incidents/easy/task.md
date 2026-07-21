# Easy — przywróć klientów bez płatnych zamówień

Dashboard finansowy zgłasza rozjazd: suma `paid_total` po wierszach nie
zgadza się z sumą przychodu w innym raporcie. Przyczyna: klienci bez
żadnego opłaconego zamówienia w ogóle **znikają** z wyniku, zamiast
pokazać `0` — `starter.sql` ma `LEFT JOIN`, ale `WHERE o.status = 'paid'`
po nim po cichu zamienia go w zwykły `INNER JOIN`.

Napraw `starter.sql` tak, aby zwracał dla **każdego** klienta:

- `id` klienta i `paid_total` — sumę `total` z zamówień o statusie
  `'paid'`,
- `paid_total = 0`, gdy klient nie ma żadnego opłaconego zamówienia —
  niezależnie od tego, czy nie ma żadnych zamówień w ogóle, czy ma tylko
  zamówienia w innych statusach,
- poprawną sumę, gdy klient ma **więcej niż jedno** opłacone zamówienie,
- wynik posortowany rosnąco po `id`.

`WHERE` działa logicznie po złączeniu — warunek dotyczący opcjonalnej
relacji (`status = 'paid'`) należy do klauzuli `ON`, nie do `WHERE`;
inaczej wiersze klientów z `NULL`-extended `orders` (brak dopasowania)
zostają odrzucone, zanim `COALESCE` zdąży zamienić `NULL` na `0`.
