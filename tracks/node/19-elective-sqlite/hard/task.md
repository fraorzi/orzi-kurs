# Hard — zaplanuj migracje

Schemat wersjonuje `PRAGMA user_version`. Zaimplementuj
`solve(current, migrations)` budujące plan do wykonania:

- wybierz wyłącznie migracje o wersji **większej** niż `current`;
- zwróć je w rosnącej kolejności wersji (wejście może być nieposortowane);
- wersje muszą być całkowite ≥ 1 i unikalne — duplikat to `Error`;
- plan musi być **ciągły**: kolejne wersje to `current+1, current+2, …` —
  luka oznacza brakującą migrację pośrednią i jest błędem wdrożenia,
  nie czymś do przeskoczenia.
