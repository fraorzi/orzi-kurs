## Hint 1

Każdy handler utworzony w początkowym renderze pamięta tę samą wartość `count`.

## Hint 2

Po `await` nie obliczaj wyniku z przechwyconego `count`. Poproś React o aktualizację
na podstawie najnowszej wartości.

## Hint 3

Użyj `setCount(current => current + 1)` po zakończeniu `wait()`.
