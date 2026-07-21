## Hint 1

`COUNT_STAR` samo w sobie nie mówi, czy pojedyncze wywołanie jest drogie —
częste tanie zapytanie ma wysoki `COUNT_STAR`, ale niski koszt per
wywołanie; rzadkie drogie odwrotnie. Sortowanie po `COUNT_STAR` (jak
w starterze) miesza te dwa przypadki.

## Hint 2

`AVG_TIMER_WAIT` już jest średnią per wywołanie (silnik liczy ją sam) —
przelicz z pikosekund na milisekundy przez `1000000000` (10^9). Sortuj
mimo to po `SUM_TIMER_WAIT DESC`, żeby ranking odzwierciedlał łączny
koszt instancji, nie tylko koszt jednego wywołania.

## Hint 3

`rows_examined_per_call` to `SUM_ROWS_EXAMINED / NULLIF(COUNT_STAR, 0)` —
`NULLIF` to nawyk defensywny, nie ma potrzeby wcześniej sprawdzać, czy
digest istnieje. Nie zapomnij `LIMIT 5` i filtra `SCHEMA_NAME = DATABASE()
AND DIGEST_TEXT IS NOT NULL`, tak jak w zadaniu easy.
