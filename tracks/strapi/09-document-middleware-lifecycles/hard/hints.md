## Hint 1

Szkielet to zwykłe `try`: `const result = await next(); await emit(result); return result;`
— bez `finally`, bo `finally` uruchomiłby `emit` też przy błędzie.

## Hint 2

Nie owijaj `next()` w `try/catch`, który by łapał błąd — masz tylko
propagować go dalej, nie obsługiwać. Brak `catch` już to daje za darmo.

## Hint 3

To, ile razy `next()` wewnętrznie zapisało coś do bazy, jest niewidoczne
dla `solve` — Twoja funkcja liczy wywołania `emit`, nie rekordy, i ma ich
być dokładnie jedno na sukces.
