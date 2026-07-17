# Widok wyniku z rozłącznym kontraktem

Zaimplementuj typ `UserViewState` i komponent `UserResult`.

Stany:

- `idle` → `Wybierz użytkownika.`,
- `pending` → status `Ładowanie…`,
- `empty` → `Brak użytkownika.`,
- `success` z wymaganym `user` → nagłówek z nazwą,
- `error` z wymaganym `message` → alert.

Użyj unii rozłącznej. `success` nie może przyjąć `message`, a `error` nie może istnieć
bez niego. Nie modeluj wariantów przez jeden interfejs z polami opcjonalnymi.
