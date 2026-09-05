# Medium - sprawdź kod pod type stripping

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zespół chce uruchamiać skrypty operacyjne bezpośrednio przez `node skrypt.ts`,
bez transpilacji. Napisz walidator, który dla danego źródła zwróci listę
powodów, dla których plik **nie** nadaje się do natywnego type strippingu.

`solve(source, filename)` zwraca tablicę powodów (pustą, gdy plik jest czysty):

- `"tsx"` - plik ma rozszerzenie `.tsx` (JSX wymaga transformacji);
- `"enum"` - źródło deklaruje `enum` (składnia nie-erasable);
- `"namespace"` - źródło deklaruje `namespace`;
- `"path-alias"` - import z aliasu `@/…`, który nie istnieje w runtime;
- `"type-import-must-be-explicit"` - źródło ma import w nawiasach klamrowych,
  a nigdzie nie używa `import type`, więc importy typów nie są odróżnialne od
  wartości i po wycięciu typów mogą zostać wiszące specyfikatory.

Kolejność powodów: jak wyżej. Każdy powód raportuj raz.
