# Easy - policz metryki per status

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Dashboard operacyjny grupuje zamówienia po statusie i pokazuje dwie
liczby: ile zamówień ma dany status i ile są warte razem. Kolumna
spoza `GROUP BY`, która nie jest zagregowana ani zależna funkcyjnie od
grupy, to nie kosmetyczny błąd stylu - przy domyślnym
`ONLY_FULL_GROUP_BY` MySQL 8.4 odrzuca takie zapytanie błędem, zanim
zwróci jakikolwiek wiersz.

Napisz zapytanie, które:

- grupuje zamówienia po `status`,
- zwraca `order_count` - liczbę zamówień w grupie (`COUNT(*)`),
- zwraca `total` - sumę `total` w grupie (`SUM(total)`), z własnym
  aliasem,
- dla pustej tabeli zamówień zwraca pusty wynik - brak grup, nie
  wiersz z zerami,
- sortuje wynik rosnąco po `status`.

Starter zwraca surową kolumnę `total` obok `COUNT(*)` bez żadnej
funkcji agregującej - MySQL odrzuci to zapytanie błędem 1055
(`Expression ... is not functionally dependent on columns in GROUP BY
clause`), nie zwróci błędnych danych po cichu.
