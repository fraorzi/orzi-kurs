# Status połączenia z zewnętrznego źródła

Zaimplementuj `OnlineBadge`.

Komponent otrzymuje `source` z funkcjami `subscribe`, `getSnapshot` i
`getServerSnapshot`. Ma pokazywać `Online` dla `true` i `Offline` dla `false`
oraz reagować na powiadomienia źródła.

Użyj `useSyncExternalStore`. Sam jednorazowy odczyt `getSnapshot()` nie wystarcza.
