# Medium - wybierz mechanizm pracy

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Dispatcher zadań musi wiedzieć, gdzie wykonać pracę. Zaimplementuj
`solve(job)` klasyfikujące `{ kind, estimatedMs }`:

- `kind: "external"` (zewnętrzny program) → `"child_process"` - niezależnie
  od szacowanego czasu;
- `kind: "cpu"` i `estimatedMs >= 20` → `"worker"` - obliczenia JS na tyle
  długie, że koszt serializacji się zwraca;
- wszystko pozostałe (sieciowe I/O, krótkie CPU) → `"async"` - event loop
  w wątku głównym.

Progi są częścią kontraktu: krótkie CPU zostaje w main threadzie, bo transfer
do workera kosztuje więcej, niż oszczędza.
