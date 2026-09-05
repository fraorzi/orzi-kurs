# Widok wyniku z rozłącznym kontraktem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw typ `UserViewState` i komponent `UserResult`.

Stany:

- `idle` → `Wybierz użytkownika.`,
- `pending` → status `Ładowanie…`,
- `empty` → `Brak użytkownika.`,
- `success` z wymaganym `user` → nagłówek z nazwą,
- `error` z wymaganym `message` → alert.

Użyj unii rozłącznej. `success` nie może przyjąć `message`, a `error` nie może istnieć
bez niego. Nie modeluj wariantów przez jeden interfejs z polami opcjonalnymi.
