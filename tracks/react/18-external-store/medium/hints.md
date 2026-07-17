## Hint 1

Interfejs `ExternalStore<T>` może być generyczny.

## Hint 2

Zwróć bezpośrednio wynik `useSyncExternalStore(...)` z custom hooka.

## Hint 3

Nie pisz ręcznego cleanupu w komponencie — React użyje funkcji zwróconej przez
`store.subscribe`.
