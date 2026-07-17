# Hard [O] — ograniczony cache LRU dla selektora

`createCachedSelector` tworzy funkcję o tej samej liście argumentów co kosztowny
`select`. `keyOf` wylicza kompletny, stabilny klucz dla wejścia, a `maxEntries`
ogranicza liczbę zapamiętanych wyników.

Starter zachowuje publiczną sygnaturę i zawsze zwraca poprawny wynik, ale wykonuje
`select` przy każdym wywołaniu. Dodaj cache LRU:

- trafienie ma zwrócić zapamiętany wynik bez ponownego `select`,
- trafiony wpis staje się najnowszy,
- po przekroczeniu limitu usuń najdawniej używany wpis,
- zachowaj wariadyczną tuple argumentów `Args` i typ `Result`,
- nie używaj `any` ani nieograniczonego cache,
- `maxEntries` musi być dodatnią liczbą całkowitą.

Zakładamy, że `select` i `keyOf` są czyste, a klucz w pełni opisuje wynik.
