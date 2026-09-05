# Medium - deduplikuj i ponawiaj dostarczenie webhooka

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Strapi ponawia dostawę webhooka po błędzie sieci albo timeout - ten sam
`eventId` może przyjść dwa razy. Jednocześnie efekt, który wywołujesz
(np. zewnętrzne API rewalidacji), bywa przejściowo zawodny i zasługuje
na kilka prób z przerwą, zanim handler odda błąd. Zaimplementuj
`solve(eventId, seen, handle, options)`:

- gdy `eventId` jest już w `seen`, zwróć `"duplicate"` **bez** wywołania
  `handle`;
- nowy event: wywołaj `handle()`; gdy się powiedzie, dodaj `eventId` do
  `seen` i zwróć `"processed"` - dopiero **po** sukcesie, nie przed;
- gdy `handle()` rzuci, spróbuj ponownie aż do `options.maxAttempts` razy
  łącznie, wołając `options.backoff(attempt)` między próbami (nie po
  ostatniej nieudanej - nie ma po co czekać przed rezygnacją);
- jeśli wszystkie próby zawiodą, `solve` ma rzucić **oryginalny** błąd z
  ostatniej próby i **nie** dodawać `eventId` do `seen` - nieudane
  przetworzenie musi zostać powtarzalne przy kolejnej dostawie.
