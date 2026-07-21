## Hint 1

Tabela łącząca może mieć własne atrybuty domenowe — status i data zapisu
nie muszą trzymać się w osobnej tabeli.

## Hint 2

Para obu kluczy obcych identyfikuje zapis jednoznacznie — nie potrzebujesz
dodatkowego sztucznego `id`.

## Hint 3

Zapisz `PRIMARY KEY (student_id, course_id)`, `CHECK` na statusie oraz
różne akcje `ON DELETE`: `CASCADE` od strony studenta, `RESTRICT` od strony
kursu.
