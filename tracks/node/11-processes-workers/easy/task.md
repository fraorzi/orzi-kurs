# Easy - buduj argv bez shella

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Usługa konwertuje obrazy zewnętrznym narzędziem. Zaimplementuj
`solve(input, output, format)` budujące **spec** wywołania:

- zwróć `{ file: "img-tool", args: [...], shell: false }` - program plus
  tablica argumentów, nigdy sklejony string;
- ścieżki waliduj allow-listą znaków `[a-zA-Z0-9._/-]` - spacja, `;`, `$`
  i inne znaki interpretowalne przez shell mają być odrzucone błędem;
- `format` waliduj allow-listą `webp`/`png`;
- kolejność argumentów: `--input`, ścieżka, `--output`, ścieżka, `--format`,
  format.
