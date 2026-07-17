## Hint 1

Zwykły SELECT tworzy wyścig read-modify-write.

## Hint 2

Lock musi zostać pobrany w tej samej transakcji co UPDATE.

## Hint 3

SELECT ... FOR UPDATE sprawi, że drugi klient odczyta już zmniejszony zapas.
