# Medium — respektuj drain

Producent jest szybszy niż odbiorca. Zaimplementuj `solve(chunks, writable)`
pompujące `AsyncIterable<Uint8Array>` do minimalnego Writable:

- pisz chunki przez `writable.write(chunk)`;
- gdy `write` zwróci `false`, **zatrzymaj się** i czekaj na zdarzenie `drain`
  (`once` z `node:events`), zanim napiszesz kolejny chunk — pisanie dalej
  mimo `false` to dokładnie ten wyciek pamięci, przed którym broni
  backpressure;
- po wyczerpaniu źródła wywołaj `writable.end()`.

Test rejestruje oś czasu zapisów i drainów — rozwiązanie ignorujące `false`
obleje kolejność, mimo że "wszystko zapisało".
