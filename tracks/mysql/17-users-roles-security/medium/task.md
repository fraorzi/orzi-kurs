# Medium - ogranicz konto usługi

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Worker synchronizujący zamówienia z zewnętrznym systemem łączy się dziś
przez `orzi_service'@'localhost'` z `GRANT ALL ... WITH GRANT OPTION` -
konto może nie tylko czytać i zapisywać cokolwiek w instancji, ale też
rozdawać własne uprawnienia dalej. To dokładnie odwrotność tego, czego
potrzebuje proces bez interakcji z człowiekiem.

Przepisz `starter.sql` tak, aby konto `orzi_service'@'localhost'`:

- wymagało szyfrowanego transportu (`REQUIRE SSL`) - worker łączy się przez
  sieć, nie przez lokalny socket,
- miało twardy limit `MAX_USER_CONNECTIONS 5` - awaria workera nie powinna
  móc wyczerpać pulę połączeń serwera,
- miało tylko `SELECT`, `INSERT`, `UPDATE` na `app_data.*` - bez `DELETE`
  (worker nigdy nie usuwa zamówień) i bez `GRANT OPTION` (nie deleguje
  dalej własnych uprawnień),
- nie zachowało żadnego globalnego uprawnienia (`*.*`) z poprzedniej wersji
  konta,
- wymuszało rotację hasła co 90 dni (`PASSWORD EXPIRE INTERVAL 90 DAY`) -
  konto usługowe bez wygasającego hasła to hasło, które nikt nigdy nie
  zmieni, dopóki nie będzie za późno.

`WITH GRANT OPTION` w starterze to nie literówka - to typowy skrót
"na razie dajmy wszystko", który w produkcji zamienia jeden wyciekły
sekret w kompromitację całej instancji.
