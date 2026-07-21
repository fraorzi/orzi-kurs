# Medium — wykonaj update i publish

Redaktor zapisuje zmianę i publikuje ją jednym kliknięciem — backend musi
najpierw zaktualizować draft, a dopiero po jego sukcesie opublikować ten
sam dokument i locale. Zaimplementuj
`solve(service, documentId, locale, data)`:

- wywołaj `service.update` z `{ documentId, locale, data }` — zaktualizowana
  treść, nie surowe dane wejściowe bez kontekstu;
- dopiero po zakończeniu `update` wywołaj `service.publish` z
  `{ documentId, locale }`;
- gdy `update` odrzuci obietnicę, `publish` **nie** może zostać wywołany, a
  błąd ma propagować się do wywołującego — publikacja nieudanej zmiany
  byłaby gorsza niż brak publikacji.
