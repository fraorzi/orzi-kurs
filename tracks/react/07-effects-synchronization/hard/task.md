# Dwa niezależne procesy synchronizacji

Zaimplementuj `WorkspacePresence`.

Komponent synchronizuje dwa niezależne systemy:

- `chat.connect(workspaceId)` łączy z czatem workspace i zwraca cleanup,
- `activity.start()` uruchamia globalne śledzenie aktywności i zwraca cleanup.

Zmiana `workspaceId` ma rozłączyć poprzedni chat i połączyć nowy, ale nie może
restartować globalnego śledzenia aktywności. Unmount ma zatrzymać oba procesy.

Podziel synchronizację według cyklu życia, nie umieszczaj obu procesów w jednym efekcie.
