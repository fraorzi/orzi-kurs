## Hint 1

Stan w domknięciu: tablica `queue`, licznik `bytes`, flaga `closed`.

## Hint 2

Limit sprawdzaj **przed** dopisaniem: `bytes + size > maxQueuedBytes` —
wiadomość, która się nie mieści, nie może częściowo zająć miejsca.

## Hint 3

`flush` dekrementuje `bytes` przy zdejmowaniu każdego elementu
(`queue.shift()`), a `close` zeruje wszystko jednym ruchem.
