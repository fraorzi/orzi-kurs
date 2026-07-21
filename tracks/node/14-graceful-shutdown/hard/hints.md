## Hint 1

`Promise.race` między `cleanup.then(() => "clean")` a promisem timeoutu,
którego executor zapisuje uchwyt timera do zmiennej z zewnątrz.

## Hint 2

W callbacku timera: najpierw `force()`, potem `resolve("forced")` —
kolejność jest obserwowalna w testach.

## Hint 3

`timer.unref()` zaraz po utworzeniu; `clearTimeout(timer)` po rozstrzygnięciu
race'a — obie rzeczy sprawdza test źródłowy, bo skutków unref nie widać
w vitest wprost.
