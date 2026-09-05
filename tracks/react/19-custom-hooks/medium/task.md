# Trwały draft z lazy initializerem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `usePersistentDraft(key, initialValue, storage)` oraz `DraftEditor`.

Przy pierwszym renderze hook ma odczytać `storage.getItem(key)` i użyć zapisanej
wartości albo `initialValue`. Każda późniejsza zmiana draftu ma zostać zapisana
przez `storage.setItem(key, value)`.

Odczyt storage wykonaj przez lazy initializer `useState`; nie nadpisuj istniejącego
draftu pustą wartością przy montowaniu.
