## Hint 1

Kolejność sprawdzeń: najpierw `external`, potem próg CPU, na końcu domyślne
`"async"`.

## Hint 2

Próg to `>= 20` — test graniczny sprawdza dokładnie 19 i 20 ms.

## Hint 3

Nie ma tu żadnego wywołania workerów — klasyfikator koduje **decyzję
architektoniczną**, dlatego jest czystą funkcją, którą łatwo testować.
