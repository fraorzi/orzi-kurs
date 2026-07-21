## Hint 1

Sprawdź `requested === "*"` jako pierwszą, samodzielną gałąź — reszta
funkcji dotyczy wyłącznie przypadku, gdy `requested` jest tablicą.

## Hint 2

`new Set(existing)` daje szybkie sprawdzanie przynależności — filtruj
`requested` przez `allowed.has(locale)`, zamiast `existing.includes(...)`
w pętli.

## Hint 3

Dedup przez `new Set(requested)` i `.sort()` na samym końcu — kolejność w
`requested` i ewentualne powtórzenia nie powinny wpływać na wynik.
