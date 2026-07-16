## Hint 1

`switch (action.type)` zawęża każdy wariant i udostępnia tylko jego pola.

## Hint 2

Przy usuwaniu użyj destrukturyzacji z computed key i rest. Najpierw sprawdź `in`,
aby dla braku produktu zwrócić ten sam obiekt.

## Hint 3

Po `switch`, który kończy każdą gałąź przez `return`, `action` ma typ `never`.
Zakończ funkcję przez `return assertNever(action)`.
