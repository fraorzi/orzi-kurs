## Hint 1

Wywołania `getSummary()` i `getAlerts()` nie potrzebują swoich wyników nawzajem.

## Hint 2

Przekaż oba promise'y do `Promise.all` i użyj destrukturyzacji wyniku.

## Hint 3

Nie zapisuj najpierw `const summary = await getSummary()`, bo następna linia
zacznie się dopiero po zakończeniu pierwszego zapytania.
