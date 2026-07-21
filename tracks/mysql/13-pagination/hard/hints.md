## Hint 1

Tenant jest predykatem równości i twardą granicą danych — musi stać w tym
samym `WHERE` co warunek kursora, nie być doklejony gdzie indziej.

## Hint 2

Indeks powinien zaczynać się od `tenant_id`, dopiero potem kolumny kursora
w tej samej kolejności co `ORDER BY`.

## Hint 3

`WHERE tenant_id = 1 AND (created_at, id) < ('2026-01-04 10:00:00', 2)
ORDER BY created_at DESC, id DESC LIMIT 3`.
