# Easy - indeksuj filtr statusu zamówień

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Lista zamówień w panelu operacyjnym filtruje wyłącznie po `status`
(`open`, `paid`, `cancelled`...) i rośnie z każdym dniem. Bez indeksu na
tej kolumnie każde odświeżenie listy to pełny skan tabeli `orders` -
koszt rośnie liniowo z liczbą zamówień w historii.

Dodaj indeks, który:

- nazywa się dokładnie `ix_orders_status`,
- obejmuje wyłącznie kolumnę `status` - bez dodatkowych kolumn, żeby nie
  podnosić kosztu każdego zapisu do `orders` bez potrzeby,
- pozwala silnikowi wykonać filtr `WHERE status = ?` przez dostęp `ref`
  zamiast pełnego skanu (`type = ALL`),
- pozostaje domyślnie widoczny (`VISIBLE`) - to zwyczajny indeks
  produkcyjny, nie eksperyment do ukrycia przed optimizerem.

Nazwa indeksu i lista kolumn to część kontraktu operacyjnego: inne zespoły
odwołują się do niej w migracjach i `FORCE INDEX`, więc literówka albo
zaindeksowanie niewłaściwej kolumny nie jest błędem kosmetycznym.
