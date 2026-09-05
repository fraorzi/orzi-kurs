# Medium - zachowaj klientów bez zamówień

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Raport sprzedaży pokazuje każdego klienta z liczbą jego opłaconych
zamówień - także zero, bo "zero" to informacja dla działu handlowego
("ten klient nic jeszcze nie kupił"), a zniknięcie wiersza z raportu
wygląda jak brakujące dane, nie jak legalna wartość.

Napisz zapytanie, które:

- łączy `customers` z `orders` przez `LEFT JOIN`, z warunkiem
  `status = 'paid'` w `ON`, nie w `WHERE`,
- zwraca `id` klienta i `paid_count` - liczbę jego zamówień o
  statusie `paid`,
- pokazuje `paid_count = 0` dla klienta bez żadnych zamówień,
- pokazuje `paid_count = 0` również dla klienta, którego zamówienia
  istnieją, ale żadne nie ma statusu `paid`,
- sortuje wynik rosnąco po `id` klienta.

Starter przenosi `status = 'paid'` do `WHERE` - po `LEFT JOIN` warunek
w `WHERE` odfiltrowuje niedopasowane wiersze (NULL po stronie
`orders`) tak samo jak wiersze z realnym, ale niepasującym statusem, co
po cichu zamienia `LEFT JOIN` w efektywny `INNER JOIN` i usuwa klientów
bez opłaconych zamówień z wyniku zamiast pokazać ich z zerem.
