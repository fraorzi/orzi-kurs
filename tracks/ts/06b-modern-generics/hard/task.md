# Hard — generyczny wrapper retry

Zaimplementuj `withRetry`, który opakowuje dowolną funkcję asynchroniczną i zachowuje
jej argumenty oraz wynik.

```ts
withRetry(operation, {
  maxAttempts: 3,
  shouldRetry(error, attempt) { ... }
});
```

Zasady:

- `maxAttempts` musi być dodatnią liczbą całkowitą,
- pierwsze wywołanie to próba 1,
- po sukcesie zwróć wynik,
- po błędzie pytaj `shouldRetry(error, attempt)`,
- zakończ natychmiast, gdy predicate zwróci false,
- po ostatniej próbie rzuć ostatni błąd,
- wrapper przekazuje wszystkie argumenty bez zmian.

Nie używaj `Function` ani `any`.
