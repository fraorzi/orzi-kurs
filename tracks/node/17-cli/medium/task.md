# Medium — parsuj NDJSON strumieniowo

Wejście to linie pliku NDJSON. Zaimplementuj async generator
`solve(lines)`:

- dla każdej niepustej linii yielduj `{ line, value }`, gdzie `line` to
  **numer linii licząc od 1 wszystkie wiersze** (także puste);
- wiersze puste i złożone z białych znaków pomijaj;
- niepoprawny JSON przerywa parsowanie `Error` z dokładnym numerem linii
  w komunikacie;
- generator jest leniwy — rekordy sprzed błędnej linii mają zostać wydane.
