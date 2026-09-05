# Hard - ponów całą transakcję mysql2 po deadlocku

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Dwa równoległe transfery między tymi samymi dwoma kontami (`A→B` i
`B→A`) mogą zablokować się nawzajem - InnoDB wykrywa cykl, wybiera jedną
transakcję jako "ofiarę" i sam robi jej pełny `ROLLBACK` (`errno 1213`).
`starter.ts` łapie błąd, wycofuje i od razu go rzuca dalej - ofiara
deadlocku po prostu przegrywa, mimo że operacja była całkowicie
poprawna i powtórzona od nowa by się udała.

Popraw `withTransactionRetry(pool, work, maxAttempts = 3)` tak,
aby:

- każda próba pobierała **nowe** połączenie, zaczynała transakcję od
  `BEGIN` i wołała `work` od nowa - nie kontynuowała przerwanej próby,
- rozpoznawała jako retryable wyłącznie `errno 1213` (deadlock) i `1205`
  (lock wait timeout) - każdy inny błąd (np. naruszenie `UNIQUE`) ma
  przerwać pętlę i polecieć dalej z pierwszej próby,
- ograniczała się do `maxAttempts` prób; po wyczerpaniu limitu rzucała
  ostatni napotkany błąd,
- w każdej próbie, udanej czy nie, zwalniała połączenie z powrotem do
  puli,
- zwracała wynik `work` z próby, która się powiodła.

Test odtwarza prawdziwy deadlock dwoma równoległymi transferami na tej
samej parze wierszy - jedna z transakcji dostanie `errno 1213` od
silnika, nie od symulacji.
