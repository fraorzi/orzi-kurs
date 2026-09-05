# Custom hook z poprawnym cleanupem subskrypcji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw generyczny `useExternalValue(store)` i korzystający z niego
`MessageCounter`.

Store udostępnia `subscribe`, `getSnapshot` i `getServerSnapshot`. Komponent ma
pokazywać `{count} wiadomości`, aktualizować się po powiadomieniu i odpiąć listener
po unmount.

Użyj `useSyncExternalStore` zamiast ręcznego `useEffect` i `useState`.
