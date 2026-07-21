# Hints

## Hint 1

To dwa osobne warunki: czy wszystkie wymagane kroki są obecne, i dopiero
potem — czy zachowują właściwą kolejność. Sprawdź je po kolei, nie naraz.

## Hint 2

Do porównania kolejności użyj `steps.indexOf(krok)`. Zrób to dopiero po
sprawdzeniu kompletności — dla nieobecnego kroku `indexOf` zwróci `-1`,
co potrafi przypadkowo "wygrać" porównanie `<`.

## Hint 3

Złóż pięć porównań przez `&&`: test-build, backup-migrate-expand,
migrate-expand-deploy, deploy-healthcheck, healthcheck-rollback-ready.
Kroki spoza tej siódemki mogą leżeć gdziekolwiek — nie porównuj ich pozycji.
