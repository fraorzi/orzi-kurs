## Hint 1

Starter ma dwa osobne problemy: `SELECT *` ujawnia kolumny (w tym
`password_hash`), a domyślny `SQL SECURITY DEFINER` sprawia, że widok
wykonuje się z uprawnieniami swojego twórcy. Naprawienie tylko listy
kolumn nie zamyka drugiego problemu.

## Hint 2

`SQL SECURITY INVOKER` zmienia, czyje uprawnienia sprawdza silnik przy
wykonaniu widoku — wywołującego, nie definiującego. Słowo kluczowe
wchodzi między `CREATE` a `VIEW`.

## Hint 3

Kształt: `CREATE SQL SECURITY INVOKER VIEW active_customer_contacts AS
SELECT id, email FROM customers WHERE deleted_at IS NULL;`. Jeżeli test
z kontem mającym `SELECT` tylko na widoku dalej odpytuje go bez błędu —
`SQL SECURITY INVOKER` nie zostało zadeklarowane.
