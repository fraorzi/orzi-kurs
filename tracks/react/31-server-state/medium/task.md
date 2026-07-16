# Połącz request z lifecycle'em cache'u i odśwież po mutacji

Napraw `IssueBoard` w dwóch miejscach:

1. `fetchIssues` ma dostać `AbortSignal` przekazany przez TanStack Query, aby request
   został anulowany po utracie ostatniego obserwatora.
2. Po udanym `closeIssue` unieważnij dokładnie listę `issues` i zwróć Promise z
   `invalidateQueries`, aby mutacja pozostała pending do końca refetchu.

Nie aktualizuj ręcznie lokalnej kopii listy.
