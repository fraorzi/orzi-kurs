# Hard - zachowaj historyczny snapshot zamówienia

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Profil klienta się zmienia (nowy email po zmianie firmy, zmiana danych
kontaktowych), ale dokument sprzedaży - faktura, potwierdzenie zamówienia
- ma prawnie utrwalić dane takie, jakie były w momencie transakcji. Klucz
obcy do `customers` mówi *kim jest* klient dzisiaj; snapshot mówi, *jaki
był* w chwili zamówienia. To dwie różne semantyki czasu w jednym wierszu i
obie muszą współistnieć.

## Wymagania

- `customers(id, email UNIQUE)` - email klienta jest unikalny.
- `orders` wskazuje klienta przez `customer_id` (FK, `ON DELETE
  RESTRICT` - zamówienie nie może przetrwać bez właściciela, więc klient z
  zamówieniami jest chroniony przed usunięciem), ale dodatkowo przechowuje
  `customer_email_snapshot` - niezależną, niekaskadującą kopię emaila z
  momentu złożenia zamówienia.
- `public_id CHAR(26) UNIQUE` - publiczny identyfikator (ULID) zamówienia,
  osobny od wewnętrznego `id`; duplikat jest błędem, nie nadpisaniem.
- `total` to `DECIMAL(12,2)` (nie `FLOAT`/`DOUBLE` - kwoty pieniężne nie
  mogą tracić precyzji) z `CHECK (total >= 0)` - ujemna kwota zamówienia
  jest odrzucana na poziomie bazy.

Zmiana `customers.email` nie ma prawa poruszyć `customer_email_snapshot`
w istniejących zamówieniach - snapshot jest kopią wartości, nie odniesieniem
do niej.
