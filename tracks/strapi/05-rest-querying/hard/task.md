# Hard - waliduj granicę paginacji REST

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

UI paginacji ufa `meta.pagination` z odpowiedzi REST, ale ta struktura
może być niespójna (dane zmieniły się między zapytaniami, klient
podstawił własne wartości). Zaimplementuj `solve(value)`:

- policz oczekiwany `pageCount` z `total` i `pageSize`, zaokrąglając liczbę stron w górę
  (dla pustego wyniku oczekuj `0`), i porównaj z
  podanym `pageCount` - rozjazd rzuca błąd wspominający "paginacja";
- `pageSize` musi być dodatnią liczbą całkowitą;
- `page` musi być ≥ 1 i nie może przekraczać `pageCount` (chyba że
  `pageCount` wynosi 0 - wtedy brak wyników jest poprawnym stanem, nie
  błędem);
- gdy wszystko się zgadza, zwróć kopię wartości bez modyfikacji.
