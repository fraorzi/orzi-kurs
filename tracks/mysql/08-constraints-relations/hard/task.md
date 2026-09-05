# Hard - wymuś tenantową unikalność

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Aplikacja B2B hostuje wielu klientów (tenantów) w jednej bazie. Każdy
tenant nazywa swoje projekty slugiem w URL-u (`/acme/app`,
`/globex/app`) - slug ma być unikalny **w obrębie jednego tenanta**, ale
dwóch różnych tenantów musi móc niezależnie użyć tego samego słowa
"app". Zadanie musi też wskazywać projekt z tego samego tenanta, do
którego samo należy - inaczej zadanie tenanta A mogłoby po cichu
wskazywać projekt tenanta B.

Zaprojektuj `projects` i `tasks`, tak żeby:

- ten sam `slug` mógł wystąpić w dwóch różnych tenantach, ale nie dwa razy
  w obrębie tego samego tenanta (`UNIQUE(tenant_id, slug)`, nie globalny
  `UNIQUE(slug)`),
- to samo `id` projektu mogło wystąpić w różnych tenantach (klucz główny
  `projects` obejmuje `tenant_id` razem z `id`),
- `tasks.project_id` wskazywał projekt **tego samego** `tenant_id` co
  samo zadanie - złożony klucz obcy na `(tenant_id, project_id)`, nie
  osobny klucz obcy tylko na `project_id`,
- zadanie próbujące wskazać projekt innego tenanta zostało odrzucone przez
  klucz obcy, a nie ciche zapisane z niespójnymi danymi.

Złożony klucz obcy wymaga, żeby tabela referencjonowana miała klucz
unikalny albo główny na dokładnie tych samych kolumnach w tej samej
kolejności - `(tenant_id, id)` w `projects`.
