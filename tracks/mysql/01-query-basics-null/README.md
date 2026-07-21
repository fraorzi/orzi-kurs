# Zapytania, kolejność i NULL

`SELECT` czytasz od góry, ale silnik wykonuje go logicznie w innej
kolejności: `FROM` → `WHERE` → `SELECT` → `ORDER BY` → `LIMIT`. Ten model
tłumaczy większość zaskoczeń: `WHERE` nie widzi aliasów z listy `SELECT`,
a `LIMIT` tnie wynik dopiero po posortowaniu — nie "pierwsze trzy wiersze
z tabeli", tylko "pierwsze trzy wiersze posortowanego wyniku".

Druga oś tematu to **logika trójwartościowa**. Porównanie z NULL nie daje
TRUE ani FALSE, tylko UNKNOWN, a `WHERE` przepuszcza wyłącznie TRUE:

- `shipped_at = NULL` daje UNKNOWN dla każdego wiersza — zapytanie zawsze
  zwraca pusty wynik, bez błędu składni i bez ostrzeżenia;
- `col <> 'x'` również odfiltruje wiersze z NULL w `col`, bo UNKNOWN nie
  jest TRUE — "różne od" po cichu znaczy "różne od i nie-NULL";
- do brakujących wartości służą `IS NULL` / `IS NOT NULL`, a gdy NULL ma
  być równy NULL-owi — operator `<=>` (NULL-safe equal).

Trzecia oś: **determinizm kolejności**. Tabela relacyjna nie ma naturalnego
porządku. Bez `ORDER BY` MySQL może zwrócić wiersze w dowolnej kolejności —
dziś wygląda "po kluczu", po zmianie planu wykonania albo dodaniu indeksu
będzie inaczej. `LIMIT` z sortowaniem, które remisuje, to loteria: silnik
sam wybiera, które z remisujących wierszy wejdą do wyniku, więc dwa
identyczne zapytania mogą dać różne strony. Tie-breaker po kolumnie
unikalnej (zwykle klucz główny) zamyka temat: `ORDER BY total DESC, id ASC`.

## Kiedy używać

- `WHERE` do filtrowania wierszy, zanim powstanie wynik — im wcześniej
  odpadną, tym mniej pracy ma reszta zapytania.
- `IS NULL` / `IS NOT NULL` zawsze, gdy kolumna dopuszcza NULL i pytasz
  o brak wartości: nieodesłane paczki, niewypełnione pola, brak zgody.
- Jawny `ORDER BY` z tie-breakerem w każdym zapytaniu, którego wynik
  widzi użytkownik albo konsumuje paginacja czy eksport.

## Kiedy unikać

- Nie polegaj na "naturalnej" kolejności zwracanych wierszy — nawet gdy
  testy lokalnie przechodzą, to własność planu wykonania, nie kontraktu.
- Nie zastępuj NULL wartościami wartowniczymi (`0`, `''`, `1970-01-01`)
  tylko po to, by uniknąć `IS NULL` — tracisz rozróżnienie "brak danych"
  od "dane równe zeru".
- Nie porównuj przez `<=>` rutynowo — maskuje przypadki, w których NULL
  powinien być sygnałem błędu danych, a nie zwykłą wartością.

## Pułapki

- `WHERE col = NULL` i `WHERE col <> NULL` zwracają zero wierszy — zawsze.
  MySQL nie ostrzega; to najczęstszy "znikający wynik" w SQL budowanym
  ze stringów.
- `NOT (col = 'x')` przy NULL w `col` daje UNKNOWN, nie TRUE — negacja
  nie przywraca wierszy z NULL.
- `ORDER BY total DESC LIMIT 3` przy remisie kwot zwraca dowolny podzbiór
  remisujących wierszy; wynik może się zmienić między uruchomieniami.
- Przy `ASC` NULL-e sortują się przed wartościami, przy `DESC` po nich —
  jeżeli chcesz inaczej, sortuj najpierw po `col IS NULL`.
- Alias z `SELECT` nie działa w `WHERE` (logicznie jeszcze nie istnieje);
  działa w `ORDER BY` i `HAVING`.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [SELECT Statement](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [Working with NULL Values](https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html)
- [Comparison Functions and Operators](https://dev.mysql.com/doc/refman/8.4/en/comparison-operators.html)
- [ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)
- [LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)
