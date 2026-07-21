# Medium — czekaj na zdarzenie z AbortSignal

Kod czeka na jedno zdarzenie emittera, ale nie w nieskończoność — wywołujący
przekazuje `AbortSignal`. Zaimplementuj `solve(emitter, event, signal)`:

- zwróć promise pierwszego **argumentu** pierwszej emisji zdarzenia;
- anulowanie sygnału ma odrzucić promise i **zdjąć listener** — po abortcie
  emitter nie może trzymać wiszących handlerów;
- sygnał przerwany przed wywołaniem odrzuca od razu.

Nie składaj tego ręcznie z `on`/`off` — `events.once` z opcją `{ signal }`
implementuje dokładnie ten kontrakt.
