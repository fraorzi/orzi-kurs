# Medium - izoluj test rollbackiem także po sukcesie

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Suite testów integracyjnych ma dzielić jedno połączenie i jedną bazę
między dziesiątkami testów - tworzenie nowej bazy na każdy test jest zbyt
wolne. `starter.ts` próbuje temu zaradzić transakcją, ale robi `COMMIT`
po udanym `work()` - więc dane testowe z każdego "zielonego" testu zostają
w bazie na stałe i zanieczyszczają kolejne testy w tym samym pliku.

Popraw `withRollbackFixture(connection, work)` tak, aby:

- otwierała transakcję przed wywołaniem `work`,
- **zawsze** wycofywała ją po zakończeniu `work` - niezależnie od tego,
  czy `work` zwróciło wynik, czy rzuciło wyjątek,
- zwracała wynik `work` do wywołującego, gdy się powiedzie,
- propagowała oryginalny wyjątek (z zachowanym komunikatem), gdy `work`
  rzuci - wywołujący ma zobaczyć błąd testu, nie błąd fixture,
- pozwalała na kolejne wywołanie na tym samym połączeniu zaraz po
  poprzednim - bez błędu "transakcja już otwarta".

`work` może odczytać własne, jeszcze niezatwierdzone zmiany wewnątrz
transakcji (widoczność w ramach tej samej sesji) - dopiero `rollback` je
usuwa, nie sam fakt, że test się zakończył.
