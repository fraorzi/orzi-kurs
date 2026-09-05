# Easy - parametryzuj lookup i typuj RowDataPacket

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Endpoint logowania szuka użytkownika po e-mailu wprost z `req.body` -
`starter.ts` buduje zapytanie przez interpolację stringa. Dwa realne
problemy naraz: e-mail z apostrofem (`o'brien@example.com`, zupełnie
legalny) psuje składnię zapytania, a spreparowany input zamienia dane
w kod SQL, którego nikt nie napisał.

Popraw `findUserByEmail(pool, email)` tak, aby:

- używała `pool.execute` z markerem `?` - dane nigdy nie trafiają do
  tekstu zapytania, niezależnie od zawartości `email`,
- zwracała dokładnie jeden wiersz jako `User` (`id`, `email`), gdy
  dopasowanie istnieje,
- zwracała `null`, gdy żaden wiersz nie pasuje - bez rzucania wyjątku,
- poprawnie obsługiwała e-mail zawierający apostrof jako zwykłą wartość
  danych, nie fragment składni SQL,
- typowała wynik przez interfejs rozszerzający `RowDataPacket` - sam typ
  `User[]` bez tego rozszerzenia nie odpowiada temu, co faktycznie zwraca
  `mysql2` w trybie strict.

Ciąg `"' OR 1=1 -- "` jako wartość `email` ma się zachować jak zwykły,
niepasujący tekst - zapytanie ma zwrócić `null`, nie wszystkie wiersze
tabeli.
