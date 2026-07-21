# Easy — wykonaj expand i backfill telefonu

`users.phone` przechowuje numer w dowolnym formacie wprowadzonym przez
support (spacje, myślniki). Aplikacja ma zacząć wymagać znormalizowanego
E.164 (`+48501002003`) i unikalności numeru, ale w bazie są już tysiące
istniejących rekordów w starym formacie — nie można po prostu dodać `NOT
NULL UNIQUE` do nowej kolumny i czekać, aż ktoś ją wypełni.

## Wymagania

- Krok 1 (expand): dodaj `phone_e164 VARCHAR(16)` jako `NULL` —
  kompatybilne rozszerzenie, które nie wymaga wartości dla istniejących
  wierszy.
- Krok 2 (backfill): wylicz `phone_e164` ze starego `phone`, usuwając
  wszystko poza cyframi i doklejając prefiks `+48`.
- Krok 3 (contract): dopiero po backfillu zaostrz kolumnę — `NOT NULL` i
  `UNIQUE`.
- Kolejność ma znaczenie: `NOT NULL`/`UNIQUE` przed backfillem
  zablokowałoby migrację na starych wierszach, które jeszcze nie mają
  wartości.

Jeśli dwa istniejące numery znormalizują się do tej samej wartości E.164
(duplikat ukryty w starych, "brudnych" danych), krok `UNIQUE` ma to
wykryć i odrzucić migrację — cichy sukces na skonfliktowanych danych byłby
gorszy niż jawny błąd w trakcie wdrożenia.
