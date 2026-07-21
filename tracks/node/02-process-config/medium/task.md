# Medium — waliduj env na granicy

Usługa czyta konfigurację ze zmiennych środowiskowych. Zaimplementuj
`solve(env)`, które waliduje wejście i zwraca **zamrożony** config:

- `API_URL` — wymagany, parsowany przez `new URL(...)`; brak → `Error`;
- `TIMEOUT_MS` — opcjonalny, domyślnie `5000`; liczba całkowita ≥ 100,
  inaczej `Error`;
- `APP_SECRET` — gdy `NODE_ENV === "production"`, musi mieć co najmniej
  32 znaki; poza produkcją może być pusty;
- wynik ma być niemutowalny (`Object.freeze`).

Reszta aplikacji dostaje ten obiekt i nigdy nie dotyka `process.env`.
