# Easy — filtruj odczyt w Document Service middleware

Document Service middleware ma sygnaturę `(context, next) => next(context)`,
gdzie `context` niesie `{ uid, action, params }` i obejmuje **całe**
wywołanie API, niezależnie od tego, ile rekordów bazy pod spodem porusza.
Publiczny kanał czytania artykułów nie może nigdy zwrócić draftu ani
danych innego najemcy.

Zaimplementuj `solve(action, params, tenantId)`:

- działa wyłącznie dla `action === "findMany"` — inne akcje (`create`,
  `update`, `delete`, `findOne`...) zwracają `params` bez zmian;
- dla `findMany` wymuś `status: "published"` w zwracanym obiekcie;
- dołącz `tenantId` do `params.filters`, **zachowując** istniejące filtry
  (np. `category`) — nie nadpisuj całego obiektu `filters`;
- gdy `params.filters` nie istnieje, potraktuj je jak puste `{}`;
- zwróć nowy obiekt — nie modyfikuj wejściowego `params` (ten sam
  `context.params` bywa czytany dalej przez inne middleware w łańcuchu).
