## Hint 1

Trasa to statyczny opis, nie logika — cała funkcja to jeden literał obiektu
zwracany bez warunków.

## Hint 2

Zwracaj nowy literał obiektu przy każdym wywołaniu (nie stałą modułową
przypisaną raz na zewnątrz funkcji) — inaczej dwie rejestracje tej samej
trasy współdzielą tablicę `policies` i mutacja jednej wycieka do drugiej.

## Hint 3

`config.auth: true` w tym kontrakcie oznacza "wymaga uwierzytelnienia",
nie "auth włączone/wyłączone" ogólnie — dokładnie odwrotnie niż mogłoby się
wydawać przy pobieżnym czytaniu nazwy pola.
