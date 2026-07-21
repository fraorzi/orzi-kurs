## Hint 1

Starter sortuje remisy po `id DESC` — przy równych kwotach do top 3
wchodzi nowsze zamówienie zamiast starszego. Problemem jest kierunek
tie-breakera, nie samo sortowanie po kwocie.

## Hint 2

`ORDER BY` przyjmuje kierunek osobno dla każdej kolumny: kwota ma
maleć, a tie-breaker rosnąć.

## Hint 3

Kształt: `ORDER BY total DESC, id ... LIMIT 3`. Test z remisem
o trzecie miejsce (dwie kwoty 80, id 3 i 4) pokaże, czy tie-breaker
idzie we właściwą stronę — wejść ma id 3.
