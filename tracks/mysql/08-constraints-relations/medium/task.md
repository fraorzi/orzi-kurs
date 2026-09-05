# Medium - dobierz politykę ON DELETE

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Dział księgowości wymaga, żeby historia zamówień klienta nigdy nie
zniknęła przypadkowym usunięciem konta - usunięcie klienta z choćby
jednym zamówieniem ma się nie udać. Pozycje zamówienia (`order_items`) nie
mają za to żadnego znaczenia bez samego zamówienia - usunięcie zamówienia
powinno od razu posprzątać jego pozycje, bez osobnego kroku.

Zaprojektuj `customers`, `orders` i `order_items`, tak żeby:

- `orders.customer_id` wskazywał `customers.id` z polityką, która
  **blokuje** usunięcie klienta, dopóki istnieje choć jedno jego
  zamówienie,
- `order_items.order_id` wskazywał `orders.id` z polityką, która przy
  usunięciu zamówienia **kaskadowo** usuwa jego pozycje,
- klient bez żadnych zamówień dał się usunąć bez przeszkód - restrykcja
  ma dotyczyć rzeczywistych odwołań, nie samej tabeli `customers`,
- wstawienie pozycji wskazującej nieistniejące zamówienie zostało
  odrzucone przez klucz obcy przy samym `INSERT`, nie dopiero przy
  późniejszym odczycie.

Domyślna polityka `FOREIGN KEY` w MySQL to `RESTRICT` - trzeba jawnie
wybrać `CASCADE` tam, gdzie propagacja usunięcia jest zamierzona.
