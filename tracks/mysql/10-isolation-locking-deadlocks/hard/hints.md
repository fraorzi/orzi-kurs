## Hint 1

Starter ma pętlę retry, ale `attempts < 1` — to zero realnych ponowień
(pierwsza i jedyna próba). Deadlock cofa całą transakcję ofiary, nie
tylko ostatni `UPDATE` — druga próba musi zacząć się od `START
TRANSACTION`, tak jak pierwsza.

## Hint 2

Podnieś limit prób (`attempts < 3`) i upewnij się, że `CONTINUE HANDLER
FOR 1213` łapie konkretnie kod deadlocku, ustawia flagę i pozwala pętli
`WHILE` przejść do kolejnej iteracji z pełnym `START TRANSACTION` od
nowa — nie tylko powtórzyć drugi `UPDATE`.

## Hint 3

Test z dwoma przeciwnymi przesunięciami różnej wielkości sprawdza, czy
wynik jest poprawny niezależnie od tego, która transakcja padnie ofiarą
deadlocku — suma zapasu w obu pojemnikach musi się zgadzać, a każdy
pojemnik ma odzwierciedlać oba przesunięcia naraz, nie tylko jedno z nich.
