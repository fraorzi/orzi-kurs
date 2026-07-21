## Hint 1

`ALTER TABLE` (i większość DDL) robi niejawny `COMMIT` w MySQL — nie
próbuj owijać całej migracji w jedną transakcję z myślą o "rollback jeśli
coś pójdzie nie tak"; DDL i tak commituje się natychmiast.

## Hint 2

Najpierw dodaj kolumnę jako `NULL` i wykonaj `UPDATE ... SET
email_normalized = LOWER(TRIM(email))` na istniejących wierszach — dopiero
gdy każdy wiersz ma wartość, można bezpiecznie zaostrzyć constraint.

## Hint 3

Trzy osobne instrukcje w tej kolejności: `ALTER TABLE ... ADD COLUMN
email_normalized VARCHAR(255) NULL`, potem `UPDATE users SET
email_normalized = LOWER(TRIM(email))`, na końcu `ALTER TABLE ... MODIFY
email_normalized VARCHAR(255) NOT NULL, ADD CONSTRAINT ... UNIQUE(...)`.
