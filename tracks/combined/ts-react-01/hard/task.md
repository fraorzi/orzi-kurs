# ts+react — generyczny komponent tabeli danych

Zbuduj reużywalny `DataTable<T>`, który łączy generyki TypeScript (typowane
kolumny nad dowolnym wierszem) z dostępną, semantyczną tabelą React.

Zaimplementuj `DataTable<T>({ rows, columns, keyOf })`:

- `columns` to lista `{ label, render(row) }` — `render` dostaje typowany
  wiersz `T` i zwraca zawartość komórki;
- renderuj semantyczną `<table>`: nagłówki w `<th scope="col">`, komórki
  w `<td>`;
- klucz wiersza pochodzi z `keyOf(row)` (stabilny identyfikator), nie z indeksu;
- pusta kolekcja renderuje komunikat z `role="status"` ("Brak danych"),
  dostępny dla czytnika ekranu — nie pustą tabelę.

## Kryteria akceptacji

- typy kolumn wiążą się z typem wiersza (błąd kompilacji przy niezgodności),
- nagłówki i komórki mają poprawne role ARIA,
- pusty stan jest ogłaszany, klucz wiersza jest stabilny.
