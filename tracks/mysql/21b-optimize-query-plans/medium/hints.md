## Hint 1

Najpierw zabezpiecz identyczny wynik testem correctness.

## Hint 2

Skorelowane podzapytanie jest logicznie wykonywane w kontekście każdego klienta.

## Hint 3

LEFT JOIN orders, GROUP BY c.id i COALESCE(SUM(...),0) realizują agregację zbiorowo.
