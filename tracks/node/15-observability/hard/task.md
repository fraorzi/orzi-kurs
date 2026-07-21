# Hard — publikuj przez diagnostics_channel

Moduł ma emitować zdarzenia telemetryczne bez płacenia za nie, gdy nikt nie
słucha. Zaimplementuj `solve(name)`:

- utwórz kanał `diagnostics_channel.channel(name)`;
- zwróć funkcję `publish(createMessage)`:
  - gdy kanał **nie ma** subskrybentów → nie wywołuj `createMessage`
    (payload bywa kosztowny) i zwróć `false`;
  - gdy ma → opublikuj `createMessage()` i zwróć `true`;
- to wzorzec z oficjalnej dokumentacji: sprawdzaj `hasSubscribers` przed
  zbudowaniem wiadomości.
