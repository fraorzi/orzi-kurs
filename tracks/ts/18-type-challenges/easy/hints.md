## Hint 1

Nie mapuj po `Event["type"]`, jeśli potem parametr callbacka nadal ma całą unię.
Przejdź bezpośrednio po elementach unii `Event`.

## Hint 2

Mapped type może zmienić klucz przez `as`: `[Current in Event as ...]`.

## Hint 3

W każdej iteracji `Current` jest jednym wariantem unii. Użyj `Current["type"]` jako
klucza, a samego `Current` jako typu parametru handlera.
