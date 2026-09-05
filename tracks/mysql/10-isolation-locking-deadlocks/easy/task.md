# Easy - zablokuj stan przed rezerwacją

Tryb: naprawa. W `starter.sql` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Dwóch klientów klika "zarezerwuj" na ostatnie sztuki tego samego towaru
w tej samej sekundzie. Zwykłe "odczytaj stan, sprawdź, czy starczy,
zapisz nowy stan" pozwala obu żądaniom przeczytać ten sam stan **przed**
zapisaniem któregokolwiek z nich - oba widzą "starczy", oba rezerwują,
magazyn schodzi poniżej zera. Transakcja sama w sobie tego nie
powstrzyma: problem nie leży w atomowości zapisu, tylko w tym, że zwykły
odczyt nic nie blokuje.

Napisz procedurę `reserve_stock(p_request, p_sku, p_qty)`, która:

- w jednej transakcji blokuje wiersz `inventory` odczytywanego towaru
  przez `SELECT ... FOR UPDATE`, tak żeby drugie równoległe wywołanie na
  ten sam `sku` poczekało na zakończenie pierwszego, zamiast czytać stary
  stan,
- gdy dostępna ilość jest mniejsza niż żądana, sygnalizuje błąd
  (`SIGNAL SQLSTATE '45000'`) i nie zapisuje żadnej zmiany,
- w przeciwnym razie zmniejsza `quantity` o `p_qty` i wstawia wiersz do
  `reservations`,
- z dwóch równoległych żądań o tę samą, ograniczoną ilość zapasu - dokładnie
  jedno kończy się sukcesem, drugie widzi już zmniejszony stan i zostaje
  odrzucone przez `SIGNAL`, nie zatwierdzone z ujemnym zapasem.

Blokada z `FOR UPDATE` trzyma się do końca transakcji (`COMMIT`), nie do
końca samego `SELECT` - to ona, nie żaden `CHECK`, wymusza kolejkowanie
dwóch równoległych żądań o ten sam wiersz.
