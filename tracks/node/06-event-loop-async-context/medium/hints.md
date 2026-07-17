## Hint 1

Dwie zagnieżdżone pętle: zewnętrzna wyznacza koniec partii
(`Math.min(count, completed + budget)`), wewnętrzna robi jednostki pracy.

## Hint 2

Yield tylko wtedy, gdy `completed < count` po zamknięciu partii — inaczej
policzysz zbędny yield po ostatniej porcji.

## Hint 3

`yields` to licznik wywołań `await setImmediate()`, nie liczba partii —
dla `count === budget` wynosi 0.
