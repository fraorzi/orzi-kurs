## Hint 1

Element wyniku ma typ `Pick<T, K>`, gdzie `K extends keyof T`.

## Hint 2

Dla każdego wiersza utwórz pusty lokalny obiekt i przypisz `projected[key] = row[key]`.

## Hint 3

Jedno kontrolowane `as Pick<T, K>` jest potrzebne, bo pusty obiekt jest budowany
etapami. Nie rzutuj danych wejściowych ani odczytywanych wartości.
