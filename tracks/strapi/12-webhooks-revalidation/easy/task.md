# Easy - uwierzytelnij sekret webhooka

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Strapi nie podpisuje żądań webhook domyślnie - to Twój endpoint musi
zweryfikować, że przychodzące żądanie faktycznie pochodzi z Twojej
instancji, zanim ruszy rewalidację cache. Zwykłe `===` na sekretach jest
podatne na atak czasowy: różnica w czasie porównania ujawnia, ile
początkowych znaków się zgadza.

Zaimplementuj `solve(received, expected)`:

- `received` może być `undefined` (brak nagłówka) - zawsze `false`;
- gdy długości `received` i `expected` się różnią, zwróć `false`
  **bez** wywoływania porównania stałoczasowego (różne długości i tak
  nie mogą być równe, a niektóre implementacje rzucają błąd przy
  niezgodnych długościach buforów);
- gdy długości są równe, porównaj bajty **stałoczasowo** (np.
  `node:crypto`'s `timingSafeEqual`) - nie `===` na stringu;
- pusty `received` razem z pustym `expected` to wciąż `false` - pusty
  sekret oznacza brak konfiguracji, nie poprawną tożsamość.
