# Zdiagnozuj graf renderowania trasy

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`auditRendering` błędnie uznaje każdą asynchroniczną pracę za dynamiczną. Zaimplementuj
audyt zgodny z Cache Components:

- `deterministic` i cache o profilu dłuższym niż `seconds` trafiają do `staticShell`,
- `runtime` oraz cache `seconds` są pracą dynamiczną,
- dynamiczna praca pod Suspense trafia do `dynamicHoles`,
- dynamiczna praca bez Suspense trafia do `blockers`.

Zachowaj kolejność węzłów wejściowych w każdej tablicy. Samo `async: true` nie może
zmieniać klasyfikacji.
