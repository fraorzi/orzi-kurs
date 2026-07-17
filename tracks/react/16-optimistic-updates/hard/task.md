# Optimistic lista odporna na świeższe dane

Zaimplementuj `OptimisticComments`.

Komponent otrzymuje bazowe `comments`, async `saveComment(text)` oraz
`commitComment(savedComment)`. Po wysłaniu formularza nowy komentarz ma pojawić się
natychmiast z dopiskiem `(wysyłanie…)`.

Podczas oczekiwania props `comments` może dostać komentarz z innego źródła.
Pending komentarz nie może go nadpisać ani zgubić. Użyj reducera `useOptimistic`,
który dokłada draft do aktualnej wartości bazowej. Po sukcesie wywołaj
`commitComment` z wynikiem serwera.
