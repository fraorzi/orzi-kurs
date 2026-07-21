# Hints

## Hint 1

`key` musi identyfikować dane, nie pozycję. `String(index)` wygląda
niewinnie na małej liście, ale po sortowaniu w UI ten sam `index` wskazuje
inny element — React remountuje węzeł i traci lokalny stan. Użyj `item.id`.

## Hint 2

"Edytuj" bez kontekstu jest bez znaczenia poza wzrokowym sąsiedztwem
przycisku — czytnik ekranu czyta etykietę w oderwaniu od tabeli. Dołóż do
etykiety coś, co jednoznacznie wskazuje wiersz, np. tytuł pozycji.

## Hint 3

`users.find(...)` wewnątrz `.map(items, ...)` to O(items × users). Zbuduj
`Map` z `users` raz przed pętlą po `items` i odpytuj ją przez `.get(id)` —
to O(items + users). Test `[quality]` liczy realne wywołania `find` na
`users`, nie mierzy czasu.
