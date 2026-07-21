## Hint 1

Trzy różne obrony dla trzech wejść: wartość → parametr `$status`,
identyfikator → allow-lista, liczba → walidacja zakresu.

## Hint 2

WHERE doklejaj warunkowo: `filter.status ? " WHERE status = $status" : ""` —
i analogicznie warunkowy wpis w `params`.

## Hint 3

Kolumna sortowania może być interpolowana w SQL **dopiero po** przejściu
allow-listy — to jedyne miejsce, gdzie interpolacja jest legalna.
