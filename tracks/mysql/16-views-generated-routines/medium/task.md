# Medium - indeksuj kanoniczną wartość SKU, nie surowy wpis

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Katalog produktów pozwala kilku zespołom (import hurtowy, panel admina,
integracja z dostawcą) wpisywać SKU z różną wielkością liter i przypadkowymi
spacjami - `" AbC-1 "` i `"abc-1"` to ten sam produkt, ale jako tekst to
różne wartości. Bez kanonicznej, indeksowanej reprezentacji każdy zespół
może osobno "stworzyć" duplikat tego samego SKU, bo unikalność sprawdzana
jest na surowym, niezanormalizowanym tekście.

Napraw definicję tabeli tak, aby:

- kolumna `sku_normalized` liczyła się jako
  `GENERATED ALWAYS AS (LOWER(TRIM(sku))) STORED`,
- unikalny indeks stał na `sku_normalized`, nie na surowym `sku`,
- wstawienie SKU różniącego się tylko wielkością liter lub białymi znakami
  od istniejącego rekordu kończyło się błędem duplikatu,
- `UPDATE` kolumny źródłowej `sku` przeliczał `sku_normalized` - to właśnie
  różni `STORED` generated column od zwykłej kolumny, którą trzeba by
  synchronizować ręcznie w każdym miejscu, gdzie zmienia się `sku`.

Starter dodaje zwykłą kolumnę bez wyrażenia (nigdy się nie wypełnia) i
unikalny indeks na surowym `sku` - dwa niezależne błędy, które osobno
wyglądają nieszkodliwie, dopóki dwa zespoły nie wpiszą tego samego SKU
w innym stylu zapisu.
