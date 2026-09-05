# Moduł - rdzeń danych marketplace

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie jest **wieloplikowe**. Uzupełnij cztery pliki w `src/`; testy
wykonują je kolejno na świeżej bazie: `schema.sql` → `migration.sql` →
`feed_index.sql` → `place_order.sql`.

Marketplace sprzedaje sztuki z limitowanego zapasu. Pieniądze i zapas chroni
baza - nie kod aplikacji, który bywa równoległy i omylny.

## `src/schema.sql` - constraints chronią niezmienniki

Tabele `sellers`, `listings`, `orders`, `order_items`, `schema_migrations`:

- ceny i `unit_price` nieujemne, `stock >= 0`, `quantity > 0` (CHECK);
- `orders.request_id` UNIQUE i NOT NULL - idempotencja zakupów;
- `order_items`: klucz złożony `(order_id, listing_id)`, FK do `orders`
  z `ON DELETE CASCADE` i do `listings` z `ON DELETE RESTRICT`;
- `listings.seller_id` FK z `ON DELETE RESTRICT`;
- `schema_migrations(version PRIMARY KEY, applied_at)`.

Kolumny `public_id` **nie ma** w `schema.sql` - dodaje ją migracja.

## `src/migration.sql` - migracja online z ledgerem

- `ADD COLUMN public_id CHAR(26) NULL` z jawnym `ALGORITHM=INSTANT`;
- `UNIQUE` na `public_id` przez `ALGORITHM=INPLACE, LOCK=NONE`;
- wpis `20260717_add_listing_public_id` do `schema_migrations`.

## `src/feed_index.sql` - indeks pod keyset

Feed sprzedawcy stronicuje keysetem `(created_at, id)` w obrębie tenanta.
Indeks `ix_listings_feed` musi zaczynać się od `seller_id`.

## `src/place_order.sql` - atomowy zakup

Procedura `place_order(order_id, request_id, listing_id, quantity)`:

- transakcja + `SELECT ... FOR UPDATE` na wierszu listingu - dwa równoległe
  zakupy ostatniej sztuki mają zatwierdzić dokładnie jeden;
- brak zapasu / zły `quantity` → `SIGNAL SQLSTATE '45000'`;
- `EXIT HANDLER FOR SQLEXCEPTION` z `ROLLBACK; RESIGNAL;` - po błędzie
  w środku nie zostają osierocone wiersze;
- cena pozycji kopiowana z listingu w momencie zakupu.

`DO SLEEP(0.12)` między odczytem a zapisem jest częścią zadania - powiększa
okno wyścigu, żeby test współbieżności był deterministyczny.

## Kryteria akceptacji

- constraints odrzucają ujemne pieniądze/zapas i duplikat `request_id`,
- wyścig o ostatnią sztukę: dokładnie 1 zamówienie, stock 0,
- nieudany zakup nie zostawia żadnych wierszy,
- migracja zapisana w ledgerze, plan feedu używa `ix_listings_feed`.
