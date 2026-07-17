## Hint 1

Nie ufaj `projectId` tylko dlatego, że pochodzi z ukrytego inputa.

## Hint 2

Wywołaj `canEditProject(session.userId, projectId)` przed `persistProjectTitle`.

## Hint 3

Po zapisie użyj tagów `user:${userId}:projects` i `project:${projectId}`.
