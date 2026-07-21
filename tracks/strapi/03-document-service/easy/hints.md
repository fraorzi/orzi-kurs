## Hint 1

Dwie niezależne walidacje wejścia, każda z własnym komunikatem błędu —
`documentId` i `locale` nie mają ze sobą nic wspólnego poza tym, że oba
muszą przejść, zanim zbudujesz wynik.

## Hint 2

`documentId`: dokładnie 24 znaki `[a-zA-Z0-9]`, nic mniej, nic więcej —
kotwicz regex `^...$`, inaczej dopuścisz dłuższy ciąg z poprawnym
prefiksem.

## Hint 3

`status` w wyniku nigdy nie zależy od parametrów wejściowych — to funkcja
dla odczytu publicznego, więc jest zawsze `"published"`, niezależnie od
tego, co ktoś próbowałby przekazać.
