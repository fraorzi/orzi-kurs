# Hard — koreluj odpowiedzi workera

Protokół do workera przeplata odpowiedzi, a proces bywa śmiertelny.
Zaimplementuj `solve(limit)` — manager korelacji:

- `request(send)`: nadaje kolejne unikalne `id`, rejestruje oczekiwanie,
  woła `send({ id })` i zwraca promise; przy `limit` żądań in-flight
  odrzuca od razu (pula nie rośnie bez końca);
- `resolve(id, value)`: rozstrzyga właściwe oczekiwanie i zwalnia slot;
  nieznane `id` ignoruje (spóźniona odpowiedź po fail nie może wybuchnąć);
- `fail(error)`: odrzuca **wszystkie** oczekujące i czyści mapę — po śmierci
  workera żaden request nie może wisieć wiecznie; manager działa dalej dla
  nowych żądań.
