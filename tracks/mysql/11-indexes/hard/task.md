# Hard — zbuduj covering index dla feedu

Feed zamówień z zadania medium już nie robi pełnego skanu, ale wciąż dla
każdego dopasowanego wiersza wraca do klastrowanego indeksu po `total` —
kolumnę spoza `ix_orders_feed`. Przy szerokim wierszu (`note` bywa długim
tekstem) ten dodatkowy odczyt jest kosztowny, a zapytanie zwraca tylko
`id` i `total`.

Dodaj indeks `ix_orders_cover`, który:

- zachowuje dokładnie prefiks filtrów i sortowania z zadania medium:
  `tenant_id, status, created_at, id`,
- dokłada na końcu kolumnę `total`, żeby `SELECT id, total ... WHERE
  tenant_id = ? AND status = ? ORDER BY created_at DESC, id DESC`
  odpowiadał wyłącznie z indeksu — bez zaglądania do klastrowanego
  indeksu (`Extra` ma pokazać `Using index`),
- nie zmienia kolejności ani nie usuwa żadnej z pierwszych czterech
  kolumn — `total` dokłada się na końcu, nie zamiast.

`total` na końcu indeksu nic nie kosztuje przy wyszukiwaniu (nie jest
częścią filtra ani sortowania), ale zamienia zapytanie z "seek + lookup"
w czysty odczyt indeksu.
