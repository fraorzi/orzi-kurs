## Hint 1

Stan `useActionState` może być bezpośrednio liczbą.

## Hint 2

Action ma sygnaturę `(previousCount: number) => Promise<number>`.

## Hint 3

Zwróć `await saveCount(previousCount + 1)`. React przekaże ten wynik do następnej
oczekującej Action.
