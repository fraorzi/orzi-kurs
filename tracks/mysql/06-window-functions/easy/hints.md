## Hint 1

Starter numeruje zamówienia globalnie — brakuje `PARTITION BY`, więc
licznik nie resetuje się przy zmianie klienta.

## Hint 2

`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC)`
resetuje numerację per klient, ale wciąż nie rozstrzyga remisu dwóch
zamówień tego samego klienta o identycznym `created_at`.

## Hint 3

Dodaj `id DESC` jako drugi klucz w `ORDER BY` wewnątrz `OVER`. Sprawdź
na danych z remisem: dwa zamówienia o tym samym `created_at` muszą zawsze
wychodzić w tej samej kolejności między uruchomieniami.
