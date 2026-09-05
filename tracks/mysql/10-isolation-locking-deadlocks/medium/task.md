# Medium - utrzymaj spójny snapshot

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Raport pokazuje liczbę otwartych ticketów na kilku ekranach w trakcie
jednej dłuższej transakcji analitycznej. Jeśli w międzyczasie ktoś doda
nowy otwarty ticket, drugi odczyt w tej samej transakcji nie powinien
nagle pokazać innej liczby niż pierwszy - inaczej raport sam sobie
przeczy w obrębie jednego uruchomienia.

Napisz sekwencję statementów, która:

- ustawia poziom izolacji transakcji na `REPEATABLE READ` **przed**
  `START TRANSACTION` - poziom izolacji trzeba wybrać zanim transakcja
  się zacznie, nie w jej trakcie,
- rozpoczyna transakcję i wykonuje pierwszy odczyt
  `SELECT COUNT(*) FROM tickets WHERE status = 'open'` - ten odczyt
  ustanawia migawkę danych dla całej transakcji,
- pozostawia transakcję otwartą (bez `COMMIT`), żeby kolejne odczyty w
  tej samej transakcji nadal widziały tę migawkę, nawet gdy inna sesja
  w międzyczasie wstawi i zatwierdzi nowy otwarty ticket,
- po zakończeniu tej transakcji (`COMMIT`/`ROLLBACK`) nowa transakcja na
  tym samym połączeniu ma już widzieć zaktualizowane dane - migawka jest
  związana z czasem życia transakcji, nie z połączeniem na stałe.

`READ COMMITTED` ustanawia nową migawkę przy każdym statemencie z osobna
- różnica między poziomami ujawnia się dopiero przy **drugim** odczycie
w tej samej transakcji, nie przy pierwszym.
