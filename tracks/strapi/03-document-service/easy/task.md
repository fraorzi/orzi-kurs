# Easy — zbuduj bezpieczne parametry findOne

Publiczny endpoint odczytu woła Document Service, ale nie może polegać na
jego domyślnym `status`/`locale` — inaczej ujawni draft. Zaimplementuj
`solve(documentId, locale)`, który buduje parametry dla `findOne`:

- `documentId` musi mieć dokładnie 24 znaki alfanumeryczne — inna długość
  albo znak spoza `[a-zA-Z0-9]` rzuca błąd wspominający `documentId`;
- `locale` musi pasować do `xx` albo `xx-XX` (dwie małe litery, opcjonalnie
  myślnik i dwie wielkie) — inny format rzuca błąd wspominający `locale`;
- zwróć `{ documentId, locale, status: "published" }` — publiczny odczyt
  nigdy nie ustawia `status` na `draft`.
