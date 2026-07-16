## Hint 1

Widok komentarza może rozszerzać bazowy `Comment` o opcjonalne `pending`.

## Hint 2

Reducer powinien mieć postać `(currentComments, draft) => [...currentComments, ...]`.

## Hint 3

Nie przekazuj setterowi wcześniej wyliczonej całej tablicy. Reducer zostanie
ponownie zastosowany, gdy `comments` zmieni się podczas pending.
