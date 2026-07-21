# Hard — audytuj tylko rzeczywistą zmianę statusu

Zespół finansowy traktuje `order_status_audit` jako źródło prawdy przy
sporach z klientem ("kiedy dokładnie zamówienie przeszło w `paid`?"). Jeżeli
trigger loguje **każdy** `UPDATE` wiersza zamówienia — również te, które
zmieniają tylko notatkę albo adres — audyt wypełnia się szumem i przestaje
odpowiadać na pytanie, po co powstał. Naprawa samego triggera na "loguj
zmianę statusu" nie wystarczy, jeśli porównanie nie jest bezpieczne dla
`NULL`: nowe zamówienie zaczyna bez statusu, a pierwsze nadanie statusu to
też realna zmiana, którą trzeba zapisać.

Utwórz `AFTER UPDATE FOR EACH ROW TRIGGER orders_status_audit` na `orders`,
który:

- wstawia wiersz do `order_status_audit(order_id, old_status, new_status)`
  wyłącznie, gdy `status` **rzeczywiście** się zmienił,
- porównuje `OLD.status` i `NEW.status` operatorem bezpiecznym dla `NULL`
  (`<=>`) — zwykłe `<>` zwraca `NULL` (czyli "nie wiadomo", nie "różne") przy
  porównaniu z `NULL` i po cichu gubi przejście z braku statusu na pierwszy
  nadany status,
- działa poprawnie przy masowym `UPDATE` dotykającym wielu wierszy naraz —
  każdy wiersz oceniany jest osobno, więc wiersze bez zmiany statusu w tym
  samym `UPDATE` nie trafiają do audytu,
- nie zapisuje niczego, gdy `UPDATE` zmienia wyłącznie kolumny niezwiązane
  ze statusem (np. `note`).

Starter wstawia do audytu bezwarunkowo przy każdym `UPDATE` — obleje nowe
testy właśnie na przypadku no-op i na masowej aktualizacji.
