# Medium - filtruj grupy przez HAVING

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Raport windykacyjny ma pokazać klientów, których opłacone zamówienia
warte są łącznie co najmniej 100 - próg liczony po zsumowaniu
zamówień w grupie, nie po pojedynczym wierszu. Filtr na wyniku
agregatu i filtr na surowych wierszach to dwa różne etapy zapytania.

Napisz zapytanie, które:

- filtruje wiersze do statusu `paid` w `WHERE`, zanim powstaną grupy,
- grupuje pozostałe zamówienia po `customer_id`,
- zwraca `paid_total` - sumę `total` w grupie,
- zostawia w wyniku tylko grupy, których `paid_total >= 100`, filtrując
  po wyniku `SUM`, czyli w `HAVING`,
- dolicza klienta dokładnie na granicy progu (`paid_total = 100`),
- sortuje wynik rosnąco po `customer_id`.

Starter próbuje filtrować po `SUM(total) >= 100` w `WHERE` - `WHERE`
działa na pojedynczych wierszach, zanim jakakolwiek grupa czy agregat
w ogóle powstanie, więc MySQL odrzuca takie użycie funkcji grupującej
błędem 1111 (`Invalid use of group function`).
