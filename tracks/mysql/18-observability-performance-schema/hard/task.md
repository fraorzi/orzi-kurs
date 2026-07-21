# Hard — wylicz koszt pojedynczego wywołania

Raport z zadania easy pokazał, że pewien digest ma najwyższy
`SUM_TIMER_WAIT` w schemacie — ale to może być jedno bardzo drogie
wywołanie wykonane raz, albo tania operacja wywoływana milion razy.
Bez znormalizowania kosztu przez liczbę wykonań decyzja "co optymalizować
najpierw" jest zgadywaniem.

Zbuduj raport pięciu najdroższych digestów bieżącego schematu
z kolumnami `digest`, `executions`, `avg_ms` i `rows_examined_per_call`:

- `avg_ms` to średni czas **pojedynczego** wykonania w milisekundach
  (`AVG_TIMER_WAIT`, przeliczone z pikosekund, nie `SUM_TIMER_WAIT`
  podzielone ręcznie przez cokolwiek),
- `rows_examined_per_call` to `SUM_ROWS_EXAMINED` podzielone przez liczbę
  wykonań — zabezpiecz dzielenie przed zerowym `COUNT_STAR`,
- ogranicz do bieżącego schematu i pomiń wiersz przepełnienia
  (`DIGEST_TEXT IS NULL`), tak jak w zadaniu easy,
- sortuj po **całkowitym** koszcie (`SUM_TIMER_WAIT DESC`) — kolejność
  rankingu "co optymalizować najpierw" ma uwzględniać też liczbę wykonań,
  nawet gdy raportowana wartość per wywołanie jest inna.

Starter sortuje po `COUNT_STAR DESC` (liczba wykonań) — częste, tanie
zapytanie wygrywa z rzadkim, ale drogim, co odwraca priorytety
optymalizacji.
