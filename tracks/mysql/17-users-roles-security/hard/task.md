# Hard - odbierz niebezpieczną capability po incydencie

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Post-mortem: proces z rolą `orzi_writer` wykonał masowy `DELETE` na
`app_data`, którego nikt nie planował - rola miała `DELETE` "na wszelki
wypadek" od początku, mimo że żaden zatwierdzony przepływ go nie używa.
Zadanie reagowania na incydent: zdjąć dokładnie tę jedną capability, nie
przebudowywać roli od zera.

Napraw `orzi_writer` przez `starter.sql`:

- odbierz `DELETE ON app_data.*` z roli `orzi_writer` - `SELECT` i
  `UPDATE` mają zostać nietknięte,
- nie usuwaj samej roli ani nie odbieraj jej członkostwa istniejącemu
  kontu `orzi_app_api'@'localhost'`,
- upewnij się, że `orzi_writer` pozostaje domyślną rolą tego konta po
  naprawie - incydent dotyczy jednej capability, nie całego dostępu konta.

`REVOKE` działa na konkretnym poziomie i grantee: `REVOKE DELETE ON
app_data.* FROM 'orzi_writer'` usuwa tylko tę jedną capability z roli,
niezależnie od tego, ile kont ją dzieli - dokładnie tego wymaga odpowiedź
na incydent bez efektu ubocznego na inne przepływy korzystające z tej samej
roli.
