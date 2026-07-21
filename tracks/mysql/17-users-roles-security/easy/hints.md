## Hint 1

Rola i aktywacja roli to dwie różne rzeczy. `CREATE ROLE` + `GRANT` daje
roli uprawnienia; `GRANT roleX TO user` przypisuje ją kontu, ale konto
dalej nie działa z tymi uprawnieniami, dopóki rola nie jest aktywna.

## Hint 2

Do aktywacji przy logowaniu służy `SET DEFAULT ROLE 'orzi_app_reader' TO
'orzi_app_api'@'localhost'`. `SELECT` przyznaj roli na poziomie
`app_data.*`, nie `*.*` — reszta konta (poza rolą) ma mieć tylko `USAGE`.

## Hint 3

Kolejność w rozwiązaniu: `CREATE ROLE` → `GRANT SELECT ON app_data.* TO
role` → `CREATE USER` → `GRANT role TO user` → `SET DEFAULT ROLE role TO
user`. Jeżeli test o `mysql.default_roles` dalej widzi pusty wynik,
brakuje ostatniego kroku.
