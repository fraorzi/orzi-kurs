# CI, migracje i bezpieczny rollout

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

## Kontekst

Po incydencie, w którym migracja ruszyła przed backupem, zespół chce bramki
w CI: `validatePlan(steps)` ma odrzucić plan release'u zanim pipeline
w ogóle wystartuje.

## Wymagania

- Zwraca `true` tylko, gdy są wszystkie wymagane kroki: `test`, `build`,
  `backup`, `migrate-expand`, `deploy`, `healthcheck`, `rollback-ready`.
- Kolejność względna: `test`<`build`, `backup`<`migrate-expand`,
  `migrate-expand`<`deploy`, `deploy`<`healthcheck`,
  `healthcheck`<`rollback-ready`.
- Kroki spoza tej siódemki (np. `notify-slack`) mogą występować
  gdziekolwiek - nie wpływają na wynik.
- Funkcja czysta: bez I/O, bez czasu, deterministyczna.

## Kryteria akceptacji

- Kompletny plan we właściwej kolejności zwraca `true`.
- Brak dowolnego wymaganego kroku zwraca `false`.
- Naruszenie którejkolwiek z pięciu relacji kolejności zwraca `false`.
