# Hard - usunięcie assertion chain z konfiguracji

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`loadServiceConfig` dostaje wartości środowiskowe. Starter rzutuje cały obiekt na
`ServiceConfig`, przez co akceptuje brakujące i błędne dane.

Popraw bez `as`, `any` i `!`:

- `API_URL` - niepusty string,
- `PORT` - tekst reprezentujący liczbę całkowitą 1-65535,
- `LOG_LEVEL` - `"debug" | "info" | "error"`, domyślnie `"info"`,
- zwróć wszystkie błędy w kolejności pól albo gotową konfigurację.
