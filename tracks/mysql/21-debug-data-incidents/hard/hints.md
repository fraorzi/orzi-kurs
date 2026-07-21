## Hint 1

DDL ujawnia problem dopiero przy budowie `UNIQUE INDEX` — dane były
zduplikowane od dawna, po prostu nic wcześniej tego nie sprawdzało.

## Hint 2

Najpierw wybierz deterministyczny rekord kanoniczny per grupa
(najmniejsze `id`), zanim dodasz jakikolwiek constraint — porządkowanie
danych i wymuszanie niezmiennika to dwa osobne kroki, w tej kolejności.

## Hint 3

`DELETE duplicate FROM users duplicate JOIN users canonical ON
LOWER(TRIM(duplicate.email)) = LOWER(TRIM(canonical.email)) AND
duplicate.id > canonical.id;` usuwa każdy wiersz, dla którego istnieje
inny o tym samym znormalizowanym adresie i mniejszym `id` — działa też
dla grup z więcej niż dwoma duplikatami. Dopiero potem dodaj generated
column i `UNIQUE INDEX`.
