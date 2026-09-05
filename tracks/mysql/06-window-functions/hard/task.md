# Hard - policz jawny running total

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Wyciąg finansowy pokazuje narastającą sumę wpłat - klient sprawdza, ile
łącznie wpłacił do danego momentu. Domyślna rama okna
(`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`) przy dwóch wpłatach
zarejestrowanych o tej samej sekundzie wciąga do sumy **obie naraz** -
running total "przeskakuje" zamiast rosnąć wpłata po wpłacie, co na
wyciągu wygląda jak podwójne zliczenie.

Napisz zapytanie, które:

- zwraca kolumny `id`, `running_total` - dokładnie te dwie,
- liczy `running_total` jako sumę `amount` narastająco w kolejności
  `paid_at, id`,
- używa **jawnej ramy** `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT
  ROW`, żeby suma rosła fizycznie wiersz po wierszu, niezależnie od
  remisów w `paid_at`,
- przy dwóch (lub więcej) wpłatach o identycznym `paid_at` rozstrzyga
  kolejność rosnąco po `id`,
- sortuje wynik po `paid_at, id`.

`amount` to `DECIMAL(10,2)` - sterownik zwraca sumę jako string
(np. `"30.00"`), nie jako liczbę zmiennoprzecinkową.
