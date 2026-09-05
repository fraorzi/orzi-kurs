# Medium - nazwij etapy raportu CTE

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Raport sprzedaży ma pokazać klientów zarabiających powyżej przeciętnej
- a "przeciętna" liczy się z przychodów klientów, nie z pojedynczych
zamówień, i zmienia się razem z danymi. Zaszyty na stałe próg to
liczba, która działa dziś i cichnie psuje raport, gdy zmieni się skala
sprzedaży.

Napisz zapytanie, które:

- w jednym nazwanym etapie CTE liczy `revenue` - sumę `total` per
  `customer_id`,
- w drugim etapie liczy średnią z tych przychodów klientów (nie ze
  wszystkich zamówień z osobna),
- zwraca `customer_id` i `revenue` klientów, których przychód jest
  ściśle powyżej tej średniej,
- przelicza próg na nowo dla każdego zestawu danych - żadnej stałej
  liczby wpisanej wprost w zapytanie,
- sortuje wynik rosnąco po `customer_id`.

Starter filtruje przez stały próg `SUM(total) > 70` - dla jednego
zestawu danych może przypadkiem dać wynik zbliżony do poprawnego, ale
nie liczy żadnej średniej i nie reaguje na zmianę danych.
