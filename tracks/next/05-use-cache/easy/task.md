# Dodaj jawny cache katalogu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

`getCatalog` wykonuje współdzielony odczyt katalogu, który może być odświeżany co
kilka godzin. Oznacz tę funkcję dyrektywą `"use cache"` i ustaw w tym samym scope
profil `cacheLife("hours")`.

Nie umieszczaj dyrektywy na poziomie całego pliku - pomocniczy odczyt ma pozostać
zwykłą funkcją.
