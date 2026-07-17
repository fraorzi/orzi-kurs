# Hard — ponawiaj tylko bezpieczne operacje

Klient GET ma przetrwać chwilowe przeciążenie API. Zaimplementuj
`solve(url, attempts, fetcher, sleep)`:

- wykonuj żądanie maksymalnie `attempts` razy;
- ponawiaj **wyłącznie** statusy 429 i 503; każdą inną odpowiedź (2xx, 404,
  500…) zwróć od razu;
- przed ponowieniem odczekaj `Retry-After` (sekundy → ms) przez wstrzyknięte
  `sleep`; brak lub niepoprawny nagłówek znaczy `sleep(0)`;
- po wyczerpaniu prób zwróć ostatnią odpowiedź 429/503 — decyzję podejmie
  warstwa wyżej.
