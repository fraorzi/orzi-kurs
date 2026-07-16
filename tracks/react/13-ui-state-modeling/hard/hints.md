## Hint 1

Każdy wariant stanu powinien zawierać wyłącznie dane dostępne w tym etapie procesu.

## Hint 2

W reducerze najpierw sprawdzaj bieżący `state.status`. Jeśli akcja nie jest legalna,
zwróć `state`.

## Hint 3

Wspólny handler submitu może obsłużyć `review` i `error`: zapamiętaj `itemCount`,
dispatchuj `submit_requested`, a po promise dispatchuj sukces lub błąd.
