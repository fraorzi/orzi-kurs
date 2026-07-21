# Hard — wycofaj całość po błędzie procedury

Procedura `transfer_funds` robi dwa `UPDATE` i jeden `INSERT` wewnątrz
jednej transakcji. Jeśli obciążenie nadawcy naruszy `CHECK
(balance >= 0)` (transfer większy niż dostępne środki), błąd tego jednego
statementu **nie** wycofuje automatycznie wcześniejszego uznania
odbiorcy — bez własnej obsługi błędu odbiorca zostaje z podwyższonym
saldem, transakcja zostaje otwarta, a najbliższy `START TRANSACTION`
(np. z kolejnego wywołania procedury) cicho zatwierdzi tę resztkę.

Napisz procedurę `transfer_funds(p_from, p_to, p_amount)`, która:

- w jednej transakcji zwiększa saldo `p_to`, zmniejsza saldo `p_from`
  i wstawia wiersz do `ledger`,
- przy dowolnym błędzie (np. naruszeniu `CHECK`) wykonuje pełny
  `ROLLBACK` całej transakcji — łącznie z już wykonanym uznaniem odbiorcy
  — i przekazuje oryginalny błąd wywołującemu przez `RESIGNAL`, a nie
  generyczny sukces ani inny kod błędu,
- po nieudanej próbie zostawia konta i `ledger` w stanie sprzed wywołania
  — kolejne, poprawne wywołanie procedury ma liczyć od czystego stanu, bez
  śladu po nieudanej próbie.

`DECLARE EXIT HANDLER FOR SQLEXCEPTION` musi kończyć procedurę od razu po
`ROLLBACK` — `CONTINUE HANDLER` wykonałby `ROLLBACK`, ale wróciłby do
dalszego kodu procedury, jakby nic się nie stało.
