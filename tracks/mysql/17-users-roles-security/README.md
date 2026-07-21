# Users, roles i least privilege

Konto MySQL to para `'user'@'host'`, nie sama nazwa — `'app'@'10.0.%'`
i `'app'@'localhost'` to dwa różne konta, z osobnymi hasłami i grantami.
Least privilege oznacza: każdy proces (aplikacja, migrator, operator)
dostaje dokładnie te capability, których używa, nic ponad to — a **rola**
jest jednostką, którą się nadaje i odbiera, nie stosem pojedynczych GRANT-ów
rozrzuconych po historii migracji.

**Rola** to nazwany zestaw uprawnień. `CREATE ROLE 'app_reader'; GRANT
SELECT ON app_data.* TO 'app_reader'; GRANT 'app_reader' TO 'svc'@'localhost';`
przypisuje rolę kontu, ale **nie aktywuje jej automatycznie** przy
logowaniu — trzeba jawnie `SET DEFAULT ROLE 'app_reader' TO 'svc'@'localhost'`
(aktywna od następnego połączenia) albo `SET ROLE 'app_reader'` w danej
sesji. Konto z przypisaną, ale nieaktywną rolą efektywnie nie ma żadnych jej
uprawnień — częsty powód "GRANT jest, a zapytanie i tak dostaje Access
denied".

**Transport i limity zasobów** to własności konta (`CREATE USER`), nie
uprawnień: `REQUIRE SSL` wymusza szyfrowane połączenie, `WITH
MAX_USER_CONNECTIONS n` ogranicza liczbę równoległych sesji, `PASSWORD
EXPIRE INTERVAL n DAY` wymusza rotację. Żadna z tych klauzul nie pojawia się
w `GRANT` — łatwo o nich zapomnieć, bo `GRANT ... TO 'x' IDENTIFIED BY ...`
też potrafi utworzyć konto "przy okazji", ale bez żadnego z powyższych
ograniczeń.

**Odwoływanie uprawnień** działa punktowo: `REVOKE DELETE ON app_data.*
FROM 'role'` usuwa jedną capability, zachowując resztę. Efekt widzą jednak
tylko **nowe** aktywacje roli — sesja, która już ma rolę aktywną (`SET
ROLE`/domyślna rola przy logowaniu), trzyma jej uprawnienia w cache do końca
sesji; `REVOKE` nie przerywa istniejących połączeń.

## Kiedy używać

- Rola zamiast powtarzanych GRANT-ów, gdy kilka kont potrzebuje identycznego
  zestawu uprawnień (czytelnicy dashboardu, workery tej samej kolejki).
- `REQUIRE SSL`/`X509` dla każdego konta łączącego się przez sieć
  niezaufaną — lokalny socket (`localhost`) nie wymaga szyfrowania, tunel
  przez internet tak.
- Osobne konto per proces (migrator, aplikacja, operator ad-hoc) zamiast
  jednego konta "do wszystkiego" — wyciek jednego hasła nie kompromituje
  reszty.

## Kiedy unikać

- Nie nadawaj `GRANT ALL` "na razie, dopracujemy później" — least privilege
  dodane po fakcie wymaga audytu, czego kod faktycznie używa; łatwiej zacząć
  wąsko i rozszerzać na żądanie.
- Nie twórz roli dla jednego konta, które nigdy nie będzie dzielić
  uprawnień z innym — bezpośredni `GRANT` jest prostszy do śledzenia
  w code review migracji.
- Nie licz na `REVOKE` jako środek natychmiastowego odcięcia aktywnej sesji
  — do tego służy `KILL` połączenia albo wymuszona rotacja hasła.

## Pułapki

- Rola przypisana, ale nieustawiona jako `DEFAULT ROLE` ani aktywowana
  `SET ROLE`, nie daje żadnych uprawnień — `GRANT roleX TO user` to
  przypisanie, nie aktywacja.
- `GRANT ... IDENTIFIED BY ...` tworzy konto przy okazji nadawania
  uprawnień, pomijając `REQUIRE SSL`, limity połączeń i politykę hasła —
  jeżeli konto ma je mieć, `CREATE USER` musi być osobną, jawną instrukcją.
- `REVOKE` na już aktywnej roli nie cofa uprawnień w trwających sesjach —
  odpowiedź na incydent czasem wymaga obok `REVOKE` też rotacji hasła albo
  restartu procesu.
- Host jest częścią tożsamości konta: `GRANT` na `'svc'@'localhost'` nie
  dotyczy `'svc'@'10.0.0.5'` — literówka w hoście tworzy ciche, osobne konto
  zamiast modyfikować istniejące.
- Hasła i pełne instrukcje `GRANT`/`CREATE USER` trafiają do `general_log`,
  historii powłoki i czasem logów CI — sekrety treningowe nie są wyjątkiem
  od tej zasady w prawdziwych środowiskach.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Access Control and Account Management](https://dev.mysql.com/doc/refman/8.4/en/access-control.html)
- [CREATE ROLE Statement](https://dev.mysql.com/doc/refman/8.4/en/create-role.html)
- [GRANT Statement](https://dev.mysql.com/doc/refman/8.4/en/grant.html)
- [Roles](https://dev.mysql.com/doc/refman/8.4/en/roles.html)
- [CREATE USER Statement](https://dev.mysql.com/doc/refman/8.4/en/create-user.html)
