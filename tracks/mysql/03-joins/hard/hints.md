## Hint 1

Ta sama tabela `employees` gra dwie role naraz — pracownika i managera
— więc potrzebuje dwóch osobnych aliasów w jednym zapytaniu (`e` i
`m`), każdy z własnym `manager_id`/`email` w kontekście roli.

## Hint 2

`INNER JOIN` wymaga dopasowania po obu stronach. Pracownik z
`manager_id IS NULL` nigdy nie znajdzie wiersza po stronie `m` — trzeba
`LEFT JOIN`, żeby taki pracownik został w wyniku z `manager_email =
NULL` zamiast zniknąć.

## Hint 3

Kształt: `FROM employees e LEFT JOIN employees m ON m.id =
e.manager_id ORDER BY e.id`. Zapytanie zwraca tylko bezpośredniego
managera z każdego wiersza `e` — głębsza hierarchia (manager managera)
wymagałaby kolejnego samo-joina albo rekurencyjnego CTE, nie jest
częścią tego zadania.
