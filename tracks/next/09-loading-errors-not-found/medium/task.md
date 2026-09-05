# Modeluj oczekiwany błąd jako wynik Action

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

`reserveStock` rzuca dla pustego SKU i konfliktu magazynowego. Zwróć zamiast tego
rozłączną unię `ReservationState`: `validation-error`, `conflict` albo `success`.
Nie wywołuj `reserve` dla pustego SKU. Nie przechwytuj nieoczekiwanych wyjątków
adaptera - mają nadal odrzucać Promise i trafić do diagnostyki.
