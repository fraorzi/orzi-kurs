## Hint 1

Typ wyniku (`User[]`) nie zabezpiecza tekstu SQL — interpolacja stringa
łamie się identycznie, czy TypeScript widzi typ, czy nie.

## Hint 2

`pool.execute("... WHERE email = ?", [email])` wysyła `email` jako
osobny parametr, nie jako fragment tekstu zapytania — działa tak samo dla
apostrofu w legalnym adresie, jak i dla spreparowanego payloadu.

## Hint 3

Zdefiniuj `interface UserRow extends RowDataPacket, User {}` i użyj
`pool.execute<UserRow[]>(...)`; zwróć `rows[0] ?? null`.
