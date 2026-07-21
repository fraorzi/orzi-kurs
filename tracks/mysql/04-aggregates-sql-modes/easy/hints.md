## Hint 1

Starter miesza zagregowaną kolumnę (`COUNT(*)`) z surową `total` bez
żadnej funkcji agregującej — przy domyślnym `ONLY_FULL_GROUP_BY` MySQL
w ogóle nie wykona takiego zapytania, tylko odrzuci je błędem 1055.

## Hint 2

Każda kolumna w `SELECT`, która nie jest w `GROUP BY`, musi przejść
przez funkcję agregującą — tu przez `SUM(total)` z własnym aliasem.

## Hint 3

Kształt: `SELECT status, COUNT(*) AS order_count, SUM(total) AS total
FROM orders GROUP BY status ORDER BY status`. Na pustej tabeli wynik
to zero wierszy — grupowanie po prostu nie ma z czego zbudować grup.
