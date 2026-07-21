# Easy — połącz zamówienie z klientem przez INNER JOIN

Lista zamówień w panelu obsługi pokazuje email klienta obok każdej
pozycji. Zamówienie bez realnego, istniejącego klienta — porzucony
koszyk, uszkodzone odwołanie po migracji — nie ma czyjego emaila
pokazać, więc nie powinno w ogóle trafić na listę.

Napisz zapytanie, które:

- łączy `orders` z `customers` przez `INNER JOIN` po `customer_id =
  customers.id`, z warunkiem relacji w `ON`, nie w `WHERE`,
- zwraca `id` zamówienia i `email` klienta,
- pomija zamówienia z `customer_id IS NULL` — koszyk bez przypisanego
  klienta,
- pomija zamówienia wskazujące na `customer_id`, którego nie ma w
  `customers` — uszkodzone odwołanie, nie błąd zapytania,
- sortuje wynik rosnąco po `id` zamówienia.

Starter łączy tabele przecinkiem w `FROM` bez żadnego warunku relacji —
to iloczyn kartezjański: każde zamówienie sparowane z każdym klientem,
niezależnie od `customer_id`.
