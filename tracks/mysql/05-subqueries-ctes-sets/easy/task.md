# Easy - użyj EXISTS bez duplikatów

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Segment mailingowy ma trafić do każdego klienta z co najmniej jednym
opłaconym zamówieniem - dokładnie raz. Klient z dwoma opłaconymi
zamówieniami, który dostanie tę samą wiadomość dwa razy, to zgłoszenie
do supportu, nie drobiazg.

Napisz zapytanie, które:

- zwraca `id` klientów mających co najmniej jedno zamówienie o
  statusie `paid`,
- zwraca każdego pasującego klienta dokładnie raz, niezależnie od
  liczby jego opłaconych zamówień,
- pomija klientów bez żadnego zamówienia oraz klientów, których
  zamówienia mają wyłącznie inny status,
- sortuje wynik rosnąco po `id`.

Starter odpowiada na pytanie "czy istnieje" przez `JOIN` i filtr w
`WHERE` - to zwielokrotnia wiersz klienta tyle razy, ile ma pasujących
zamówień, zamiast dać dokładnie jeden wiersz na klienta.
