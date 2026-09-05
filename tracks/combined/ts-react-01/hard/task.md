# ts+react - generyczny komponent tabeli danych

Tryb: od zera. Napisz rozwiązanie w `starter.tsx`, korzystając z podanych sygnatur i typów.

Zbuduj reużywalny `DataTable<T>`, który łączy generyki TypeScript (typowane
kolumny nad dowolnym wierszem) z dostępną, semantyczną tabelą React.

Zaimplementuj `DataTable<T>({ rows, columns, keyOf })`:

- `columns` to lista `{ label, render(row) }` - `render` dostaje typowany
  wiersz `T` i zwraca zawartość komórki;
- renderuj semantyczną `<table>`: nagłówki w `<th scope="col">`, komórki
  w `<td>`;
- klucz wiersza pochodzi z `keyOf(row)` (stabilny identyfikator), nie z indeksu;
- pusta kolekcja pokazuje tekst `Brak danych` zamiast pustej tabeli.

## Kryteria akceptacji

- typy kolumn wiążą się z typem wiersza (błąd kompilacji przy niezgodności),
- tabela pokazuje nagłówki i odpowiadające im komórki,
- pusty stan jest ogłaszany, klucz wiersza jest stabilny.
