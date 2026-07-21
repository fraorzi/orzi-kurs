## Hint 1

Starter rzutuje `unit_price` na DOUBLE przed mnożeniem. Dla pojedynczej
pozycji wynik wygląda dobrze, ale binarna reprezentacja ułamka
dziesiętnego (np. 0.10) nie jest dokładna — suma wielu takich kwot
odjeżdża od oczekiwanej wartości o kilkanaście miejsc po przecinku.

## Hint 2

Licz `quantity * unit_price` bez rzutowania na DOUBLE — DECIMAL
mnożony przez INT pozostaje DECIMAL. Dopiero cały wynik `SUM(...)`
otypuj jawnie przez `CAST(... AS DECIMAL(12,2))`.

## Hint 3

Kształt: `SELECT CAST(SUM(quantity * unit_price) AS DECIMAL(12,2)) AS
total FROM invoice_lines`. Sprawdź na pustej tabeli — `SUM` bez
wierszy zwraca `NULL`, i to jest poprawne zachowanie, nie błąd do
naprawienia przez `COALESCE`.
