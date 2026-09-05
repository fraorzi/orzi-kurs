# Medium - filtruj półotwarty zakres doby

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Dashboard operacyjny liczy zdarzenia z konkretnego dnia. Kolumna
`occurred_at` ma precyzję mikrosekundową (`DATETIME(6)`), więc "koniec
dnia" nie ma jednej oczywistej wartości - a zgadnięcie złej granicy
po cichu gubi zdarzenia z ostatniej sekundy doby.

Napisz zapytanie, które:

- zwraca `id` zdarzeń z doby 1 maja 2026, niezależnie od części
  ułamkowej sekundy w `occurred_at`,
- używa półotwartego zakresu `[start, nextDay)` - dolna granica
  włącznie, górna wyłącznie - zamiast zgadywania maksymalnej precyzji
  końca dnia,
- nie pomija zdarzenia dokładnie o `23:59:59.999999`,
- nie obejmuje żadnego zdarzenia z kolejnej doby, także tego dokładnie
  o północy,
- sortuje wynik rosnąco po `id`.

Starter filtruje przez `BETWEEN '2026-05-01' AND '2026-05-01
23:59:59'` - domknięty zakres z górną granicą bez części ułamkowej po
cichu odcina ostatnią sekundę doby, jeżeli ma niezerowe mikrosekundy.
