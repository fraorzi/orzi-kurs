## Hint 1

Starter woła `fetchMany([id])` w pętli — to N zapytań. Cel: jedno wywołanie
dla całej listy.

## Hint 2

Zdeduplikuj id (`[...new Set(ids)]`) do jednego `fetchMany`, potem zbuduj
wynik mapując oryginalne `ids` na pobrane wartości.

## Hint 3

Kolejność i duplikaty biorą się z `ids.map((id) => rows[id])` — mapujesz po
wejściu, nie po wyniku batcha. Pustą listę obsłuż wcześniej (`return []`).
