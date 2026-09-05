# Hard - przejdź drzewo rekurencyjnym CTE

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Katalog produktów jest drzewem kategorii dowolnej głębokości. Panel
administracyjny ma pokazać kategorię i całe jej poddrzewo razem z
głębokością zagnieżdżenia - bez pisania osobnego zapytania na każdy
poziom i bez logiki rekurencyjnej po stronie aplikacji.

Napisz zapytanie, które:

- zwraca kategorię o `id = 1` i wszystkich jej potomków, na dowolnej
  głębokości, nie tylko bezpośrednie dzieci,
- dla każdego wiersza zwraca `depth` - 0 dla kategorii `1`, 1 dla jej
  dzieci, 2 dla wnuków, i tak dalej,
- nie miesza wyniku z innym, niepowiązanym drzewem kategorii w tej
  samej tabeli,
- sortuje wynik rosnąco po `id`, niezależnie od głębokości węzła,
- działa też dla kategorii bez żadnych potomków - wtedy zwraca tylko
  ją samą z `depth = 0`.

Starter filtruje `WHERE parent_id = 1` - to zwraca wyłącznie
bezpośrednie dzieci kategorii 1, z `depth` na sztywno ustawionym na
`0`, i pomija zarówno samą kategorię 1, jak i głębsze pokolenia
(wnuki, prawnuki).
