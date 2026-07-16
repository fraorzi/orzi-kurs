## Hint 1

Lokalny stan `QueueRow` jest poprawny. Problemem jest sposób, w jaki React dopasowuje
stare instancje wierszy do nowej kolejności.

## Hint 2

Indeks opisuje pozycję, a nie rekord. Po odwróceniu ten sam indeks wskazuje inne ID.

## Hint 3

Użyj `key={item.id}`. Nie generuj klucza podczas renderowania.
