# Izoluj test rollbackiem także po sukcesie

Zaimplementuj withRollbackFixture. Callback może zwracać wynik lub rzucać; w obu przypadkach dane testowe mają zostać wycofane.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
