# Medium - dokładna semantyka patcha

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zadanie działa z `exactOptionalPropertyTypes`.

`ProfilePatch` rozróżnia:

- brak `displayName` - nie zmieniaj pola,
- `displayName: string` - ustaw nową nazwę,
- brak `avatarUrl` - nie zmieniaj pola,
- `avatarUrl: string | null` - ustaw URL albo jawnie usuń avatar.

`undefined` nie jest poprawną wartością żadnego pola. Zaimplementuj niemutujące
`applyProfilePatch` i `hasProfileChanges`.
