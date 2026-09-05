# Easy - wymuś dodatnią ilość

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Import zamówień z zewnętrznego systemu magazynowego raz na jakiś czas
przysyła pozycję z ilością 0 albo ujemną - błąd mapowania po drugiej
stronie integracji. Walidacja w kodzie aplikacji nie pomaga, bo import
pisze bezpośrednio do bazy, z pominięciem aplikacji. Niezmiennik "ilość
pozycji zamówienia jest dodatnia" musi więc obowiązywać na poziomie
tabeli.

Utwórz tabelę `order_items` z kolumnami `id BIGINT PRIMARY KEY` i
`quantity INT`, tak żeby:

- `quantity` nie mogło być puste (`NOT NULL`),
- `quantity` musiało być ściśle większe od zera - wartości `0` i ujemne
  są odrzucane na poziomie bazy, bez udziału aplikacji,
- wartość `1` (najmniejsza poprawna ilość) była akceptowana,
- brak wartości (`NULL`) był odrzucany przez `NOT NULL`, a nie przez
  `CHECK` - to dwa osobne błędy: `CHECK (quantity > 0)` samo w sobie
  przepuszcza `NULL`, bo `NULL > 0` daje UNKNOWN, nie FALSE.

Nazwij constraint (`CONSTRAINT chk_... CHECK (...)`), żeby był widoczny
w komunikacie błędu i możliwy do odnalezienia w przyszłej migracji.
