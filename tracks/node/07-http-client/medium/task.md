# Medium — dodaj timeout bez wycieku

Żądanie ma budżet czasowy, ale wywołujący może też anulować je własnym
sygnałem. Zaimplementuj `solve(url, timeoutMs, fetcher, parent?)`:

- zbuduj sygnał timeoutu przez `AbortSignal.timeout(timeoutMs)`;
- gdy podano `parent`, połącz oba przez `AbortSignal.any([...])` — przerwanie
  któregokolwiek anuluje żądanie;
- przekaż wynikowy sygnał do `fetcher(url, { signal })` i zwróć odpowiedź;
- żadnych własnych `setTimeout` — składanie sygnałów zostaw platformie,
  wtedy nie ma czego wyciekać.
