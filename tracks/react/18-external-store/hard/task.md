# Store z cache'owanym snapshotem i SSR

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `createCartStore` oraz `CartSummary`.

Store przechowuje produkty poza Reactem. Snapshot ma zawierać `itemCount` i
`total`. Wymagania:

- `getSnapshot()` zwraca tę samą referencję, dopóki dane się nie zmienią,
- `addItem` tworzy nowy niemutowalny snapshot i powiadamia listenerów,
- `getServerSnapshot` umożliwia renderowanie `CartSummary` na serwerze,
- komponent reaguje na zmiany przez `useSyncExternalStore`.

Nie zwracaj nowego obiektu z `getSnapshot` przy każdym odczycie i nie pozostawiaj
starego cache po mutacji danych.
