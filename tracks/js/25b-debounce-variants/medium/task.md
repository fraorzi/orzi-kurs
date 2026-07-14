# Medium — debounce z `cancel` i `flush`

Zaimplementuj `debounce(fn, wait)` (wariant trailing — odpala `wait` ms po ostatnim
wywołaniu), a do zwróconej funkcji **dołącz dwie metody**:

- **`cancel()`** — porzuca oczekujące wywołanie (nic się nie odpali).
- **`flush()`** — jeśli jest oczekujące wywołanie, odpala je **natychmiast** (bez czekania na
  `wait`) i zwraca wynik `fn`. Jeśli nic nie oczekuje — nie odpala nic, zwraca ostatni wynik.

```js
const d = debounce((x) => x * 2, 40);

d(5);
d.flush(); // 10  — odpala od razu, zwraca wynik
// (po flush nie ma już podwójnego strzału po 40 ms)

d(7);
d.cancel(); // oczekujące wywołanie porzucone — fn się nie odpali
```

Wskazówka: przypisz zwracaną funkcję do zmiennej (`const debounced = (...args) => {...}`),
żeby dało się dopiąć do niej `debounced.cancel` i `debounced.flush`. Po odpaleniu /
`cancel()` wyzeruj zapamiętane argumenty, żeby `flush()` nie odpalił „starych".
