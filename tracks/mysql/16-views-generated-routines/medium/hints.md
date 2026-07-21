## Hint 1

Starter dodaje `sku_normalized` bez żadnego wyrażenia — kolumna zawsze
zostaje `NULL`, a unikalny indeks stoi na surowym `sku`, więc dwa zapisy
tego samego produktu w innym stylu ("ABC-1" i "abc-1") przejdą jako dwa
różne wiersze.

## Hint 2

Wyrażenie liczące wartość jest częścią definicji kolumny:
`GENERATED ALWAYS AS (wyrażenie) STORED`. `STORED` zapisuje wynik fizycznie
i przelicza go przy `INSERT`/`UPDATE` dotykającym `sku` — inaczej niż
zwykła kolumna, `sku_normalized` nigdy nie rozjedzie się z `sku`.

## Hint 3

Kształt: `ALTER TABLE products ADD COLUMN sku_normalized VARCHAR(64)
GENERATED ALWAYS AS (LOWER(TRIM(sku))) STORED;` — a unikalny indeks buduj
na `sku_normalized`, nie na `sku`.
