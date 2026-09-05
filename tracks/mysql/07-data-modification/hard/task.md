# Hard - archiwizuj przed usunięciem

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Zadanie porządkowe czyści wygasłe sesje logowania co noc, ale prawnicy
wymagają zachowania historii logowań przez rok - usunięcie musi być
poprzedzone kopią do archiwum. Jeżeli kopiowanie i usuwanie operują na
różnych zbiorach wierszy (albo `DELETE` w ogóle nie ma warunku), część
sesji znika bez śladu w archiwum, a część zostaje na stałe w tabeli
produkcyjnej.

Napisz zapytania, które w jednej transakcji:

- kopiują do `session_archive` wszystkie wiersze `sessions`, w których
  `expires_at` jest **ściśle wcześniejsze** niż `'2026-01-01'` - sesja
  wygasająca dokładnie o północy tego dnia zostaje aktywna, nie
  archiwalna,
- usuwają z `sessions` **dokładnie ten sam zbiór** wierszy - identyczny
  predykat `WHERE` w obu statementach,
- pozostawiają w `sessions` nietknięte sesje, które jeszcze nie wygasły,
- są bezpieczne do ponownego uruchomienia: powtórne wykonanie tego samego
  skryptu (retry po timeout) nie duplikuje wierszy w archiwum, bo wygasłe
  sesje już zniknęły z `sessions` po pierwszym przebiegu.

Dwa statementy z rozjeżdżającym się `WHERE` (albo `DELETE` bez `WHERE` w
ogóle) to najczęstsza przyczyna archiwum niezgodnego ze stanem
produkcyjnym.
