## Hint 1

`OFFSET 500` musi policzyć i odrzucić 500 wcześniejszych wierszy przy
**każdym** wykonaniu — koszt rośnie z wartością offsetu, nawet gdy wynik
ma zawsze tylko 10 wierszy.

## Hint 2

Cursor to ostatnie `id` poprzedniej strony — wyznacza dolną granicę dla
`WHERE`, którą optymalizator może wykorzystać jako `range` po indeksie
`PRIMARY`, zamiast liczyć wiersze od początku.

## Hint 3

Zastąp `LIMIT 10 OFFSET 500` przez `WHERE id > 500 ORDER BY id LIMIT
10` — ten sam `ORDER BY`/`LIMIT`, `OFFSET` znika całkowicie z zapytania.
