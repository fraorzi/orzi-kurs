## Hint 1

Waliduj w kolejności pól: najpierw wymagany `API_URL` (`new URL` sam rzuci dla
złego formatu), potem timeout, na końcu sekret.

## Hint 2

`Number(env.TIMEOUT_MS ?? "5000")` załatwia domyślną wartość; potem sprawdź
`Number.isInteger(x) && x >= 100`.

## Hint 3

Warunek produkcyjny czytaj wprost z `env.NODE_ENV`, a wynik opakuj w
`Object.freeze({ ... })` — test sprawdza `Object.isFrozen`.
