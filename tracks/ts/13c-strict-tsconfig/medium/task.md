# Medium — dokładna semantyka patcha

Zadanie działa z `exactOptionalPropertyTypes`.

`ProfilePatch` rozróżnia:

- brak `displayName` — nie zmieniaj pola,
- `displayName: string` — ustaw nową nazwę,
- brak `avatarUrl` — nie zmieniaj pola,
- `avatarUrl: string | null` — ustaw URL albo jawnie usuń avatar.

`undefined` nie jest poprawną wartością żadnego pola. Zaimplementuj niemutujące
`applyProfilePatch` i `hasProfileChanges`.
