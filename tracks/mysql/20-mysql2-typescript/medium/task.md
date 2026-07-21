# Medium — utrzymaj zamówienie na jednym PoolConnection

`starter.ts` wywołuje `pool.execute` osobno dla `orders` i dla każdego
`order_items` — na `Pool` każde wywołanie może wypożyczyć **inne**
połączenie z puli, więc nie ma tu żadnej wspólnej transakcji: błąd na
trzecim item zostawia zamówienie i dwa pierwsze item-y już zapisane na
stałe.

Zaimplementuj `createOrder(pool, input)` tak, aby:

- pobierała jeden dedykowany `PoolConnection` przez
  `pool.getConnection()` i wykonywała **wszystkie** operacje (insert
  zamówienia i wszystkich pozycji) na tym jednym obiekcie,
- commitowała dopiero po insercie zamówienia i wszystkich pozycji —
  nigdy częściowo,
- przy błędzie na którejkolwiek pozycji wycofywała **całe** zamówienie,
  łącznie z już wstawionymi wcześniejszymi pozycjami i samym rekordem
  zamówienia,
- **zawsze** zwalniała połączenie (`connection.release()`) z powrotem do
  puli — niezależnie od tego, czy transakcja się powiodła, czy nie;
  pominięty `release()` w ścieżce błędu wycieka połączenia i po kilku
  nieudanych wywołaniach pula przestaje mieć wolne sesje,
- propagowała oryginalny błąd bazy (kod, komunikat) do wywołującego.

Duplikat `id` zamówienia ma oblewać na samym insercie do `orders`, zanim
jakikolwiek `order_items` zostanie zapisany — częściowy stan nie ma prawa
istnieć na żadnym etapie.
