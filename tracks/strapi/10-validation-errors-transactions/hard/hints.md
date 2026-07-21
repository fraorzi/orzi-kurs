## Hint 1

Szkielet to `try { await update(); await audit(); await commit(); } catch (error) { await rollback(); throw error; }`
— jeden `try` obejmujący obie operacje zapisu.

## Hint 2

Nie potrzebujesz osobnych `try` dla `update` i `audit` — pierwszy błąd
w którymkolwiek z nich trafia do tego samego `catch` i uruchamia ten
sam `rollback`.

## Hint 3

`throw error` w `catch` musi być ostatnią instrukcją — `rollback()` ma
się wykonać **przed** ponownym rzuceniem, nie po nim.
