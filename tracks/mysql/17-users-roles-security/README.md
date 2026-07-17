# Users, roles i least privilege

## Kiedy

Gdy aplikacja, migrator i operator potrzebują różnych, jawnie ograniczonych możliwości oraz kontrolowanego lifecycle poświadczeń.

## Pułapki

GRANT ALL maskuje granice; rola nie jest domyślnie aktywna; host jest częścią konta; hasła i GRANT mogą trafić do logów lub historii klienta.

## Źródła

- [MySQL 8.4: Access control](https://dev.mysql.com/doc/refman/8.4/en/access-control.html)
- [MySQL 8.4: CREATE ROLE](https://dev.mysql.com/doc/refman/8.4/en/create-role.html)
- [MySQL 8.4: GRANT](https://dev.mysql.com/doc/refman/8.4/en/grant.html)
