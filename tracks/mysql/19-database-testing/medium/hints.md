## Hint 1

Testy zwykle nie chcą COMMIT nawet po udanym callbacku.

## Hint 2

finally wykona cleanup dla resolve i reject.

## Hint 3

Rozpocznij transakcję, zwróć wynik work, a w finally zawsze rollback.
