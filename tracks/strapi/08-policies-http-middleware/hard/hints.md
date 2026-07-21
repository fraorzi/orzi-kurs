## Hint 1

`Array.prototype.reduceRight` buduje łańcuch od końca: każdy krok owija
poprzedni wynik nową funkcją `() => middleware(next)`.

## Hint 2

Startowym akumulatorem `reduceRight` jest `handler` — to on siedzi
w samym środku cebuli, jako „next" ostatniego middleware.

## Hint 3

Nie łap błędów wewnątrz `solve` — zwykłe `await next()` bez `try/catch`
już zapewnia, że wyjątek przerywa łańcuch i propaguje się do wywołującego,
a brak wywołania `next()` w ogóle zatrzymuje dalsze warstwy.
