# Custom hook z poprawnym cleanupem subskrypcji

Zaimplementuj generyczny `useExternalValue(store)` i korzystający z niego
`MessageCounter`.

Store udostępnia `subscribe`, `getSnapshot` i `getServerSnapshot`. Komponent ma
pokazywać `{count} wiadomości`, aktualizować się po powiadomieniu i odpiąć listener
po unmount.

Użyj `useSyncExternalStore` zamiast ręcznego `useEffect` i `useState`.
