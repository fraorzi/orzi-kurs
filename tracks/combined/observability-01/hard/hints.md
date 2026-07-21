## Hint 1

Starter oddaje surowe zdarzenie — wycieka `userId`, `error` i query string.
Zbuduj dwa nowe obiekty z wybranych, bezpiecznych pól (allow-lista).

## Hint 2

Ścieżkę bez query wyciągniesz przez `new URL(event.url, "https://service.local").pathname`
— baza jest potrzebna dla ścieżek względnych.

## Hint 3

`statusClass` to `` `${Math.floor(status / 100)}xx` `` — grupowanie zamiast
surowego kodu trzyma kardynalność metryki nisko. `outcome` liczy się z tego
samego progu (≥ 500 = error).
