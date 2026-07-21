## Hint 1

Pytanie brzmi "czy dla tego klienta istnieje choć jedno pasujące
zamówienie", nie "ile takich zamówień ma". Starter liczy przez `JOIN`,
więc każde pasujące zamówienie daje osobny wiersz klienta w wyniku.

## Hint 2

`EXISTS (podzapytanie)` sprawdza samą obecność wiersza i nigdy nie
zwielokrotnia wiersza zewnętrznego — skoreluj podzapytanie kluczem
klienta (`o.customer_id = c.id`) i dodaj warunek statusu w środku.

## Hint 3

Kształt: `SELECT c.id FROM customers c WHERE EXISTS (SELECT 1 FROM
orders o WHERE o.customer_id = c.id AND o.status = 'paid') ORDER BY
c.id`. Klient z dwoma opłaconymi zamówieniami powinien pojawić się w
wyniku dokładnie raz.
