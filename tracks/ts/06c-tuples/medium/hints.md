## Hint 1

`AnyCommand` zbuduj jako mapped type po `CommandName`, a potem odczytaj
`[CommandName]`, aby dostać unię.

## Hint 2

Rest parameter może mieć typ `...args: CommandArguments[K]`.

## Hint 3

Po `switch (command.name)` tuple `command.args` ma już właściwe pozycje.
