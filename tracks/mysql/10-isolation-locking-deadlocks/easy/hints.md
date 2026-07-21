## Hint 1

Starter czyta ilość zwykłym `SELECT ... INTO` bez `FOR UPDATE` — obie
równoległe sesje mogą przeczytać tę samą wartość, zanim którakolwiek z
nich zapisze. Lock musi zostać pobrany w tej samej transakcji co
następujący po nim `UPDATE`.

## Hint 2

`SELECT quantity INTO available FROM inventory WHERE sku = p_sku FOR
UPDATE` sprawia, że drugie równoległe wywołanie na ten sam `sku` czeka —
zamiast czytać stary stan, zobaczy już zmniejszony zapas dopiero po
`COMMIT` pierwszego wywołania.

## Hint 3

Test z ręcznie otwartą transakcją (bez `COMMIT`) trzymającą `FOR UPDATE`
na tym samym wierszu sprawdza to bezpośrednio: drugie połączenie z
obniżonym `innodb_lock_wait_timeout` musi się realnie zablokować i dostać
`ER_LOCK_WAIT_TIMEOUT`, a nie przejść od razu, jakby blokady nie było.
