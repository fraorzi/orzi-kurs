## Hint 1

Starter kopiuje wygasłe sesje poprawnie, ale potem usuwa z `sessions`
**wszystko** — `DELETE` bez `WHERE` kasuje też sesje, które jeszcze nie
wygasły.

## Hint 2

`INSERT INTO session_archive SELECT ...` i `DELETE FROM sessions` muszą
mieć identyczny warunek `WHERE expires_at < '2026-01-01'` — to ten sam
predykat w obu statementach, nie tylko w pierwszym.

## Hint 3

Owiń oba statementy w `START TRANSACTION; ... COMMIT;`. Test z ponownym
uruchomieniem tego samego skryptu sprawdza, czy po pierwszym przebiegu
wygasłe sesje faktycznie zniknęły z `sessions` — jeśli drugi przebieg
dokłada kolejne wiersze do archiwum, predykaty wciąż się rozjeżdżają.
