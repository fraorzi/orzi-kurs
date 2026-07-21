## Hint 1

Starter nie ma żadnego handlera błędu — naruszenie `CHECK` na drugim
`UPDATE` przerywa procedurę, ale pierwszy `UPDATE` (uznanie odbiorcy)
zostaje w otwartej, niezatwierdzonej transakcji, widoczny w tej samej
sesji.

## Hint 2

`DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;`
na początku procedury — `EXIT` kończy procedurę od razu po `ROLLBACK`,
zamiast wracać do dalszych statementów jak zrobiłby `CONTINUE HANDLER`.

## Hint 3

Sprawdź trzy rzeczy naraz: (1) nieudane wywołanie zwraca oryginalny kod
błędu (`RESIGNAL` bez argumentów), (2) po nim salda i `ledger` wyglądają
tak, jakby wywołania w ogóle nie było, (3) kolejne, poprawne wywołanie
liczy się od tego czystego stanu, a nie od resztek nieudanej próby.
