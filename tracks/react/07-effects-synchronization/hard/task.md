# Dwa niezależne procesy synchronizacji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `WorkspacePresence`.

Komponent synchronizuje dwa niezależne systemy:

- `chat.connect(workspaceId)` łączy z czatem workspace i zwraca cleanup,
- `activity.start()` uruchamia globalne śledzenie aktywności i zwraca cleanup.

Zmiana `workspaceId` ma rozłączyć poprzedni chat i połączyć nowy, ale nie może
restartować globalnego śledzenia aktywności. Unmount ma zatrzymać oba procesy.

Podziel synchronizację według cyklu życia, nie umieszczaj obu procesów w jednym efekcie.
