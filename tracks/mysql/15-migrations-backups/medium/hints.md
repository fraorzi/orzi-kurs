## Hint 1

Contract (usunięcie `name`) nie może poprzedzać wdrożenia kodu, który
czyta nowe kolumny — na razie tylko je dodajesz i wypełniasz.

## Hint 2

Dodaj pola jako `NULL` i wykonaj backfill z `name` przed zaostrzeniem do
`NOT NULL`.

## Hint 3

`family_name` to wszystko po pierwszej spacji (`SUBSTRING` liczony od
`CHAR_LENGTH` pierwszego słowa), nie tylko ostatnie słowo — wieloczłonowe
nazwiska mają zostać w całości.
