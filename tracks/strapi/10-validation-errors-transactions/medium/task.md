# Medium — mapuj błędy domenowe na bezpieczne API

Strapi definiuje rodzinę wbudowanych klas błędów (`ApplicationError`,
`ValidationError`, `NotFoundError`, `ForbiddenError`...), które API
automatycznie mapuje na odpowiedź `{ error: { status, name, message,
details } }`. Gdy budujesz własną warstwę błędów domenowych, musisz
zachować tę samą dyscyplinę: **znany** błąd dostaje stabilny status i
publiczny kod, **nieznany** błąd nigdy nie ujawnia swojej oryginalnej
treści.

Zaimplementuj `solve(error)`, gdzie `error` to `Error` z opcjonalnym
`kind`:

- `kind: "notFound"` → `{ status: 404, code: "NOT_FOUND", message: "Nie znaleziono zasobu" }`;
- `kind: "conflict"` → `{ status: 409, code: "CONFLICT", message: "Konflikt danych" }`;
- `kind: "validation"` → `{ status: 400, code: "VALIDATION_ERROR", message: "Nieprawidłowe dane" }`;
- brak `kind` albo `kind` spoza tej listy → zawsze
  `{ status: 500, code: "INTERNAL_ERROR", message: "Błąd serwera" }`,
  **niezależnie** od oryginalnej treści `error.message` — ta treść
  (hasła, zapytania SQL, ścieżki plików) nigdy nie może trafić do klienta.
