## Hint 1

Bazowy i optimistic state mogą mieć kształt `{ isFollowing, followerCount }`.

## Hint 2

Reducer otrzymuje bieżący optimistic state i nową wartość `isFollowing`.

## Hint 3

Po `await saveFollow` ustaw bazę na cały obiekt zwrócony przez serwer, nie obliczaj
ponownie licznika po stronie klienta.
