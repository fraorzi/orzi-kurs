# Hard — napraw migrację na zduplikowanych danych legacy

Migracja miała dodać znormalizowany, unikalny e-mail — i oblała
w produkcji w połowie wykonania, bo tabela `users` ma legacy wiersze,
które po normalizacji (`LOWER(TRIM(email))`) kolidują ze sobą
(`'Ada@Example.com'` obok `' ada@example.COM '`). `starter.sql` próbuje
dodać `UNIQUE` wprost, bez wcześniejszego uporządkowania danych.

Napraw `starter.sql` jako migrację dwuetapową:

- **przed** dodaniem kolumny i indeksu usuń duplikaty po
  `LOWER(TRIM(email))`, zachowując w każdej grupie rekord o
  **najmniejszym `id`** (najstarszy wpis) — usuń pozostałe,
- dopiero potem dodaj `email_normalized VARCHAR(255) GENERATED ALWAYS AS
  (LOWER(TRIM(email))) STORED` i `UNIQUE INDEX` na tej kolumnie,
- obsłuż grupy z więcej niż dwoma duplikatami tego samego znormalizowanego
  adresu — ma przetrwać dokładnie jeden rekord na grupę, nie "co
  najmniej jeden",
- nie ruszaj wierszy, które nie mają duplikatu — ich pozostałe kolumny
  mają zostać nietknięte.

Kolejny `INSERT` z adresem kolidującym (po normalizacji) z już istniejącym
ma oblewać `ER_DUP_ENTRY` — dokładnie to, co miał zagwarantować oryginalny
cel migracji, zanim brudne dane go złamały.
