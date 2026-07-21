# Hard — zakoduj kontrakt migracji na danych legacy

Tabela `users` ma dziś kolumnę `email` bez normalizacji: wielkość liter
i białe znaki są, jakie ktoś kiedyś wpisał (`' Ada@Example.COM '` obok
`'grace@example.com'`). Migracja ma dodać znormalizowaną, unikalną
kolumnę — na tabeli, w której już są wiersze, nie na pustym schemacie.

Zaimplementuj `migrateUserEmails(connection)` jako migrację trójetapową:

- dodaj kolumnę `email_normalized VARCHAR(255) NULL` (musi być nullable
  na starcie — istniejące wiersze jeszcze nie mają wartości),
- backfilluj ją dla każdego istniejącego wiersza wartością
  `LOWER(TRIM(email))`,
- dopiero **po** backfillu zaostrz kolumnę do `NOT NULL` i dodaj
  `UNIQUE` — w tej kolejności; odwrócona kolejność złamie się na
  wierszach, które jeszcze nie mają wartości.

Test uruchamia migrację na tabeli z realnymi, "brudnymi" wierszami
sprzed migracji i sprawdza końcowy stan: znormalizowane wartości,
`NOT NULL` w `information_schema.columns` oraz że kolejny `INSERT`
z konfliktującym (po normalizacji) adresem faktycznie obleje z
`ER_DUP_ENTRY`. Pamiętaj też, że `ALTER TABLE` robi niejawny `COMMIT` —
`ROLLBACK` zewnętrznej transakcji testowej nie cofnie zmiany schematu.
