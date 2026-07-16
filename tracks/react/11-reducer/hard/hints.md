## Hint 1

Historia może mieć kształt `{ past: Status[], present: Status, future: Status[] }`.

## Hint 2

Undo odkłada dotychczasowy `present` na początek `future`; redo wykonuje operację
odwrotną.

## Hint 3

Każda nowa akcja `changed` po undo musi ustawić `future: []`.
