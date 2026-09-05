# Easy - policz kwotę faktury bez utraty precyzji

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Panel rozliczeniowy sumuje pozycje faktury do jednej kwoty widocznej na
wydruku i w raporcie księgowym. Grosz rozjazdu między dwoma
uruchomieniami tego samego zapytania to zgłoszenie z działu finansów,
nie kosmetyka - floaty w rachunkach psują zaufanie do całego systemu.

Napisz zapytanie, które:

- liczy `quantity * unit_price` i sumuje w rodzinie DECIMAL - bez
  pośredniego rzutowania na DOUBLE, które wprowadza błąd binarnej
  reprezentacji ułamków dziesiętnych,
- zwraca jedną kolumnę `total` jawnie otypowaną na `DECIMAL(12,2)`,
- dla faktury bez żadnej pozycji zwraca `NULL`, nie `0` - brak pozycji
  to brak danych, nie zerowa kwota.

Starter rzutuje `unit_price` na DOUBLE przed mnożeniem: dla pojedynczej
pozycji wygląda niewinnie, ale przy wielu drobnych kwotach binarna
reprezentacja ułamka (np. 0.10) nie sumuje się do okrągłej wartości -
silnik zwróci coś w rodzaju `0.30000000000000004` zamiast `0.30`.
