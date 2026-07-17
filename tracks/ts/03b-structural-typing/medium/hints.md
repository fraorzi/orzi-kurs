## Hint 1

Dodatkowe klucze to `Exclude<keyof Candidate, keyof Shape>`.

## Hint 2

Połącz `Candidate` z `Record<dodatkoweKlucze, never>`. Dla poprawnego kształtu lista
kluczy jest `never`, więc nic nie zostaje dodane.

## Hint 3

`Object.freeze({ ...config })` tworzy kopię i zwraca `Readonly<Candidate>`.
