# Easy - ustal pełny porządek strony offsetowej

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Lista postów sortowana malejąco po dacie utworzenia bywa niejednoznaczna:
wiele wpisów potrafi mieć identyczny znacznik czasu (import wsadowy,
publikacja zbiorcza). `ORDER BY created_at DESC` samo w sobie nie daje
pełnego porządku - przy remisach silnik może zwrócić wiersze w dowolnej
kolejności zależnej od planu wykonania, więc kolejne odświeżenie tej samej
strony bywa inne, mimo że dane się nie zmieniły. Zwróć drugą stronę (trzy
posty, `OFFSET 3 LIMIT 3`) z porządkiem w pełni deterministycznym.

## Wymagania

- Sortuj malejąco po `created_at`, a przy remisie - malejąco po `id`, żeby
  każdy wiersz miał jednoznaczne miejsce w porządku.
- `id` jako tie-breaker musi być w tym samym kierunku (`DESC`) co
  `created_at` - mieszanie kierunków w jednym `ORDER BY` psuje porządek
  przy remisach.
- Zapytanie ma zwracać poprawny (możliwie pusty) wynik również wtedy, gdy
  dostępnych wierszy jest mniej niż `OFFSET` - to nie jest błąd, tylko
  pusta strona.

`LIMIT`/`OFFSET` bez pełnego `ORDER BY` jest niedeterministyczne z
definicji - MySQL nie gwarantuje żadnej kolejności bez jawnego sortowania
po kolumnach jednoznacznie identyfikujących wiersz.
