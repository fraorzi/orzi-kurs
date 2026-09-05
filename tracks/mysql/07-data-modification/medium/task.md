# Medium - zrób addytywny upsert

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Przycisk "dodaj do koszyka" w sklepie wysyła to samo żądanie za każdym
kliknięciem - klient klikający dwa razy "dodaj 3 sztuki" oczekuje 6 sztuk
w koszyku, nie 3. Insert z konfliktem klucza głównego musi więc **dodać**
przychodzącą ilość do istniejącej, a nie nadpisać jej wartością z żądania.

Napisz zapytanie, które:

- wstawia wiersz `(cart_id, product_id, qty)` do `cart_items`,
- przy konflikcie klucza głównego `(cart_id, product_id)` zwiększa `qty`
  istniejącego wiersza o przychodzącą wartość - `stare_qty + nowe_qty`,
  nigdy `nowe_qty` samo w sobie,
- przy braku konfliktu po prostu wstawia nowy wiersz z podaną ilością,
- nie zmienia wierszy innych par `(cart_id, product_id)` w tabeli,
- uruchomione dwukrotnie z tą samą wartością wejściową sumuje ją dwa razy
  - to zamierzone zachowanie "dodaj do koszyka", nie błąd idempotencji.

Odróżnij w klauzuli `UPDATE` wartość już zapisaną w tabeli
(`cart_items.qty`) od wartości przychodzącej z `VALUES (...) AS incoming`
- syntaktycznie poprawne jest też przypadkowe podstawienie jednej w
miejsce drugiej.
