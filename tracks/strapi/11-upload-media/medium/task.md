# Medium - nadaj bezpieczną nazwę pliku

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Nazwa pliku z uploadu to niezaufany string: może nieść ścieżkę
(`../../etc/passwd`), znaki sterujące albo rozszerzenie, którego serwer
nie powinien nigdy wykonać. Zanim plik trafi do Media Library, jego
nazwa musi przejść przez normalizację i allow-list rozszerzeń.

Zaimplementuj `solve(name)`:

- odetnij wszystko przed ostatnim separatorem ścieżki (`/` albo `\`) -
  interesuje Cię tylko sama nazwa pliku, bez katalogów;
- rozszerzenie zaakceptuj wyłącznie z listy `jpg`, `jpeg`, `png`, `webp`
  (bez rozróżniania wielkości liter); wszystko inne (np. `.html`, `.svg`,
  brak rozszerzenia) rzuca `Error` zawierający słowo `Niedozwolony`;
- `jpeg` znormalizuj do `jpg` w wyniku;
- z bazowej nazwy usuń diakrytyki (np. polskie znaki), zamień wszystko,
  co nie jest `[a-zA-Z0-9_-]`, na `-`, zredukuj powtórzone `-` i przytnij
  do 80 znaków;
- gdy po tym czyszczeniu z nazwy nic nie zostaje, rzuć `Error` zawierający
  słowo `Pusta`.
