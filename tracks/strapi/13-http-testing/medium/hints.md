# Hints

## Hint 1

Domyślna wartość dla brakującego nagłówka `x-role` musi być
`"anonymous"`, czyli rola o **najmniejszych** prawach — `?? "admin"`
albo jakikolwiek inny fail-open default otwiera endpoint dla każdego,
kto po prostu pominie nagłówek.

## Hint 2

401 i 403 to dwa różne pytania: 401 — „nie wiem, kim jesteś” (rola to
`anonymous`, a wymagana jest wyższa); 403 — „wiem, kim jesteś, ale to za
mało” (rola rozpoznana, ale niżej w hierarchii niż wymagana). Nie łącz
ich w jedną gałąź.

## Hint 3

Hierarchia `anonymous < editor < admin` jako `Record<Role, number>` —
porównuj liczby (`RANK[role] < RANK[requiredRole]`), nie stringi. Rola
równa lub wyższa niż wymagana zawsze przechodzi.
