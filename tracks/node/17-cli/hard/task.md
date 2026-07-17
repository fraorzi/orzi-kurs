# Hard — formatuj pomoc i błędy

Ostatnia mila CLI: co widzi użytkownik. Zaimplementuj
`solve(command, error?, debug = false)`:

- bez błędu zwróć tekst pomocy zawierający sekcje `Usage:`, `Options:`
  (z `--json` i `--max-bytes`) oraz `Example:` z nazwą komendy;
- z błędem zwróć komunikat `Error: <message>` plus wskazówkę
  `Run '<command> --help' for usage.`;
- `error.cause` pokazuj **wyłącznie** gdy `debug === true`;
- wartości nie będące `Error` opisz jako `Unknown error` — nie serializuj
  cudzych struktur do terminala.
