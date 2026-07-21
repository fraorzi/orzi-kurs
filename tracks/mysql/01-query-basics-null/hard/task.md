# Hard — zbuduj stabilne top zamówień

Dashboard sprzedaży pokazuje trzy największe zamówienia i odświeża się
co minutę. Jeżeli dwa kolejne uruchomienia na tych samych danych zwrócą
różne wyniki, zestawienie "miga" — a przy remisie kwot bez pełnego
tie-breakera dokładnie tak się dzieje.

Napisz zapytanie, które:

- zwraca `id` i `total` trzech zamówień o najwyższym `total`,
- przy remisie kwot rozstrzyga mniejszym `id` — starsze zamówienie
  wygrywa miejsce w zestawieniu,
- rozstrzyga remis także na granicy LIMIT: gdy o trzecie miejsce
  konkurują dwa zamówienia z tą samą kwotą, wchodzi to z mniejszym `id`,
- zwraca mniej niż trzy wiersze, gdy zamówień jest mniej.

`LIMIT` tnie wynik dopiero po sortowaniu — dopóki porządek nie jest
totalny, o składzie top 3 decyduje plan wykonania, nie Ty.
