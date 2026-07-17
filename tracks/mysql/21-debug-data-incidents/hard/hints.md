## Hint 1

DDL ujawnia problem dopiero przy budowie UNIQUE.

## Hint 2

Najpierw wybierz deterministyczny rekord kanoniczny.

## Hint 3

Usuń większe id w self join po LOWER(TRIM(email)), potem dodaj generated column i indeks.
