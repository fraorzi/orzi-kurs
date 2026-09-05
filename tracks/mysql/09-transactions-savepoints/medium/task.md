# Medium - wycofaj opcjonalny krok do savepointu

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Zmiana stanu magazynu ma dwa towarzyszące zapisy: obowiązkowy wpis audytu
(wymóg zgodności - musi zostać, nawet jeśli coś dalej się nie uda) i
opcjonalny wpis telemetryczny do wewnętrznego dashboardu, który wolno
pominąć bez wpływu na resztę operacji. Pełny `ROLLBACK` cofnąłby też
zmianę zapasu i obowiązkowy audyt - potrzebny jest punkt pośredni, który
cofa tylko krok telemetryczny.

Napisz sekwencję statementów, która w jednej transakcji:

- zmniejsza `quantity` towaru `'A'` o `2`,
- ustawia `SAVEPOINT` zaraz przed opcjonalnym wpisem telemetrycznym,
- wstawia (a następnie wycofuje przez `ROLLBACK TO SAVEPOINT`) wpis
  `audit_log(kind='telemetry')` - telemetria nie ma trafić do tabeli,
- wstawia obowiązkowy wpis `audit_log(kind='inventory_changed')` **po**
  cofnięciu do savepointu,
- kończy się `COMMIT` - zarówno zmiana zapasu, jak i obowiązkowy audyt
  mają przetrwać, mimo że telemetria została cofnięta.

Wynik ma być poprawny niezależnie od tego, ile towaru było na stanie na
starcie - licz zmianę arytmetycznie, nie zakładaj konkretnej wartości
początkowej.
