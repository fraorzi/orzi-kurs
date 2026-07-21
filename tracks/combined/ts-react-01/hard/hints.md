## Hint 1

Starter zwraca `null`. Rozbij na dwa przypadki: pusta kolekcja → element
z `role="status"`; niepusta → semantyczna tabela.

## Hint 2

Nagłówki: `columns.map` na `<th scope="col" key={column.label}>`. Komórki:
dla każdego wiersza `columns.map` na `<td>{column.render(row)}</td>`.

## Hint 3

Klucz wiersza to `keyOf(row)`, nie indeks mapy — stabilny identyfikator
utrzymuje tożsamość wiersza przy zmianie kolejności. Generyczność wychodzi
sama, bo `render` i `keyOf` operują na `T`.
