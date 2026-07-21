## Hint 1

Nie odpowiadaj na incydent kolejnym szerokim `GRANT` ani przebudową roli
od zera — potrzebny jest jeden punktowy `REVOKE`.

## Hint 2

`REVOKE` działa na konkretnym poziomie (schemat) i konkretnym grantee
(rola) — `REVOKE DELETE ON app_data.* FROM 'orzi_writer'` nie rusza
`SELECT`/`UPDATE` tej samej roli ani uprawnień roli w innych schematach.

## Hint 3

Starter już ustawia default role — dopisz tylko brakujący `REVOKE` przed
nim (albo po, kolejność między tymi dwiema instrukcjami nie ma
znaczenia). Nie usuwaj roli ani `GRANT 'orzi_writer' TO ...` — incydent
dotyczy jednej capability, nie całego dostępu konta.
