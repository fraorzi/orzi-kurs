# [O] Medium - usuń N+1 przez batching

Tryb: optymalizacja. Popraw istniejący kod w `starter.ts`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Widok dogrywa autorów artykułów, pobierając ich pojedynczo w pętli - jedno
zapytanie na id. Przy 50 artykułach to 50 zapytań (N+1 (osobne zapytanie dla każdego elementu listy)).

Starter jest funkcjonalnie poprawny. Zaimplementuj `solve(ids, fetchMany)`:

- pobierz wszystkich potrzebnych przez **jedno** wywołanie `fetchMany`
  z unikalnymi id;
- zwróć wartości w kolejności wejściowych `ids`, zachowując duplikaty;
- pusta lista `ids` nie wywołuje zależności w ogóle.

Bramka `[quality]`: najwyżej jedno wywołanie `fetchMany` niezależnie od
liczby i powtórzeń id.
