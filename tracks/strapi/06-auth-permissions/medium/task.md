# Medium - zastosuj permissions jako allow-list

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

`users-permissions` przechowuje uprawnienia roli jako listę dozwolonych
akcji w formacie `<content-type-uid>.<action>`. Zaimplementuj
`solve(permissions, role, action)`:

- zwróć `true` tylko, gdy `permissions[role]` istnieje **i** zawiera
  dokładnie `action`;
- rola nieobecna w `permissions` (literówka, usunięta rola, rola bez
  żadnych nadanych uprawnień) zwraca `false`, nie rzuca błędu;
- brak dopasowanej akcji dla istniejącej roli to `false` - brak wpisu
  oznacza odmowę, nie "sprawdź gdzie indziej";
- nie dopasowuj częściowo - `api::article.article.find` nie uprawnia do
  `api::article.article.find-one` ani odwrotnie.
